<template>
    <tr v-if="bet != 0">
        <td>{{car.id}}</td>
        <td>
            <v-lazy
                v-model="isActive"
                :options="{
                threshold: .5
                }"
                transition="fade-transition"
            >
                <v-img 
                :aspect-ratio="130/68"
                :src="imagePath"
                :key="componentKey"
                @error="errorHandler()"
                ></v-img>
            </v-lazy>
        </td>
        <td>
            <v-rating
            v-model="bonus"
            background-color="pink lighten-3"
            color="red"
            small
            ></v-rating>
        </td>
        <td>
            <span v-if="total > 0" :class="winRateColor()" >{{(wins*100/total).toFixed(0)}}%</span>
            <span v-else :class="winRateColor()" >First Race</span>
        </td>
        <td>{{bet}} CLO</td>
        <td
            v-if="$store.state.wallet.address != owner"        
        >
            <v-row
            class="mt-2"
            >
                <v-col
                cols="12"
                sm="6"
                >
                    <v-text-field
                        label="Car ID"
                        
                        v-model="carTwoID"
                        type="number"
                        step="1"
                        min="1"
                        solo
                        dense
                    ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                sm="6"
                >
                    <v-btn
                        @click="acceptRace"
                        color="success"
                    >
                        Accept
                    </v-btn>
                </v-col>
            </v-row>

        </td>
        <td
            v-else
        >
            <v-btn
                @click="cancelRace"
                color="red"
            >
                Cancel
            </v-btn> 
        </td>
    </tr>
</template>

<script>
import Car from '@/store/car'
import Race from '@/store/raceForClo'
export default {
    props: ['car'],
    data() {
      return {
        imagePath: '',
        raceState: 0,
        owner: '',
        bet: 0,
        bonus: 0,
        carTwoID: "",
        isActive: false,
        componentKey: 0,
        wins: 0,
        total: 0
      }
    },
    beforeMount() {
        //See if contract is loaded
        if(Car && Race){
        this.$store.state.web3 = true
        }else{
        this.$store.state.web3 = false
        }
        Car.methods.tokenURI(this.car.id).call((err, res) => {
          this.imagePath = res
        })
        Car.methods.carBonus(this.car.id).call((err, res) => {
          this.bonus = parseInt(res)
        })
        Race.methods.dragRaces(this.car.id).call((err, res) => {
          this.bet = res.raceBalance.slice(0, -18)
        })
        Car.methods.ownerOf(this.car.id).call((err, res) => {
          this.owner = res
        })
        Race.methods.carWinRate(this.car.id).call((err, res) => {
            this.wins = res.wins
            this.total = res.total 
          
          
        })
    },
    methods: {
        errorHandler () {
            this.componentKey += 1;
        },
        winRateColor(){
         let winRate = this.wins*100/this.total
         if(winRate <= 100 && winRate > 66){
            return "green--text"
         }
         if(winRate <= 65 && winRate > 33){
            return "yellow--text"
         }
         if(winRate <= 33 && winRate >= 0){
            return "red--text"
         }
        },
        acceptRace () {
            let amountToSend = web3.utils.toWei((parseInt(this.bet)+50)+'');
            Race.methods.acceptDragRace(this.car.id, this.carTwoID).send({from: this.$store.state.wallet.address, value: amountToSend})         
        .then(() => {
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          });
        },
        cancelRace () {
            Race.methods.cancelDragRace(this.car.id).send({from: this.$store.state.wallet.address})         
            .then(() => {
            location.reload()
            })
            .catch(err => {
            this.$store.commit('showSnackbar', err.message);
            });
        }
    }
};
</script>
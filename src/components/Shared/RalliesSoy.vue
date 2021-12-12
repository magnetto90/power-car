<template>
    <tr v-if="carState == 1">
        <td><h1>{{car.id}}</h1></td>
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
            <h1 class="ma-0 pa-0">+{{bonusM}}</h1>            
        </td>
        <td><h1>{{bet}} CLO</h1></td>
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
                        dense
                        outlined
                        append-icon="mdi-language-go"
                        @click:append="acceptRace"
                    ></v-text-field>
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
import RallySoy from '@/store/rallysoy'
export default {
    props: ['car'],
    data() {
      return {
        imagePath: '',
        owner: '',
        bet: 0,
        bonus: 0,
        bonusM: 0,
        carTwoID: "",
        isActive: false,
        componentKey: 0,
        wins: 0,
        total: 0,
        carState: 0,
      }
    },
    beforeMount() {
        //See if contract is loaded
        if(Car && RallySoy){
        this.$store.state.web3 = true
        }else{
        this.$store.state.web3 = false
        }
        RallySoy.methods.ticketPrice().call((err, res) => {
          this.ticketPrice = res.slice(0, -18)
        })
        Car.methods.tokenURI(this.car.id).call((err, res) => {
          this.imagePath = res
        })
        Car.methods.carBonus(this.car.id).call((err, res) => {
          this.bonus = parseInt(res)
        })
        RallySoy.methods._getCarBonus(this.car.id).call((err, res) => {
          this.bonusM = parseInt(res)
        })
        RallySoy.methods.carState(this.car.id).call((err, res) => {
          this.carState = parseInt(res)
        })
        RallySoy.methods.rallies(this.car.id).call((err, res) => {
            if(res.raceBalance == 0){
                this.bet = res.raceBalance
            }else{
                this.bet = res.raceBalance.slice(0, -18)
            }
        })
        Car.methods.ownerOf(this.car.id).call((err, res) => {
          this.owner = res
        })
    },
    methods: {
        errorHandler () {
            this.componentKey += 1;
        },
        acceptRace () {
            let amountToSend = web3.utils.toWei((parseInt(this.bet)+parseInt(this.ticketPrice))+'');
            RallySoy.methods.acceptRally(this.car.id, this.carTwoID).send({from: this.$store.state.wallet.address, value: amountToSend})         
        .then(() => {
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          });
        },
        cancelRace () {
            RallySoy.methods.cancelRally(this.car.id).send({from: this.$store.state.wallet.address})         
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

<style scoped>
    td{
        border: none !important;
    }
    h1{
        font-family: 'Press Start 2P', cursive;
        color: rgb(0, 255, 55) !important;
        text-align: center;
    }
</style>
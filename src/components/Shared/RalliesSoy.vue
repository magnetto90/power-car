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
                        class="go"
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
import Web3 from 'web3'
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
        this.$store.state.rallyContract.methods.ticketPrice().call((err, res) => {
          this.ticketPrice = res.slice(0, -18)
        })
        this.$store.state.contract.methods.tokenURI(this.car.id).call((err, res) => {
          this.imagePath = res
        })
        this.$store.state.contract.methods.carBonus(this.car.id).call((err, res) => {
          this.bonus = parseInt(res)
        })
        this.$store.state.rallyContract.methods._getCarBonus(this.car.id).call((err, res) => {
          this.bonusM = parseInt(res)
        })
        this.$store.state.rallyContract.methods.carState(this.car.id).call((err, res) => {
          this.carState = parseInt(res)
        })
        this.$store.state.rallyContract.methods.rallies(this.car.id).call((err, res) => {
            if(res.raceBalance == 0){
                this.bet = res.raceBalance
            }else{
                this.bet = res.raceBalance.slice(0, -18)
            }
        })
        this.$store.state.contract.methods.ownerOf(this.car.id).call((err, res) => {
          this.owner = res
        })
    },
    methods: {
        errorHandler () {
            this.componentKey += 1;
        },
        acceptRace () {
            var web3 = new Web3(window.ethereum || Web3.givenProvider);
            let amountToSend = web3.utils.toWei((parseInt(this.bet)+parseInt(this.ticketPrice))+'');
            this.$store.state.rallyContract.methods.acceptRally(this.car.id, this.carTwoID).send({from: this.$store.state.wallet.address, value: amountToSend})         
        .then(() => {
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          });
        },
        cancelRace () {
            this.$store.state.rallyContract.methods.cancelRally(this.car.id).send({from: this.$store.state.wallet.address})         
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
    .go{
        min-width: 100px !important;
    }
</style>
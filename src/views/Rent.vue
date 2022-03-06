<template>
    <div>
        <v-card
            class="ma-0 pa-2"
        >
        <v-row
            class="ma-0 pa-0"
        >
            <v-col
            cols="12"
            sm="2"
            class="ma-1 pa-0"
            >            
                <v-text-field
                    label="Bet"
                    class="ma-0"
                    v-model="newBet"
                    type="number"
                    step="1"
                    min="1"
                    solo
                    dense
                    outlined
                >
                Bet
                </v-text-field>
            </v-col>
            <v-col
            cols="12"
            sm="2"
            class="ma-1 pa-0"
            >
                <v-text-field
                    label="Car ID"
                    class="ma-0"
                    v-model="carID"
                    type="number"
                    step="1"
                    min="1"
                    solo
                    dense
                    outlined
                >
                Car
                </v-text-field>
            </v-col>
            <v-col
            cols="12"
            sm="4"
            class="ma-1 pa-0"
            >
                <v-btn
                    color="#cc0000"
                    class="mx-1 pa-5"
                    @click="createRace"
                >
                    Create Race
                </v-btn>        
                <v-btn
                    color="#cc0000"
                    class="mx-1 pa-5"
                    @click="claim"
                >
                    Claim: {{balance}} CLO
                </v-btn>        
            </v-col>
        </v-row>
        </v-card>

        <v-simple-table
            fixed-header
        >
            <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">
                        ID
                    </th>
                    <th class="text-left">
                        Image
                    </th>
                    <th class="text-left">
                        Bonus
                    </th>
                    <th class="text-left">
                        Win rate
                    </th>
                    <th class="text-left">
                        Bet
                    </th>
                    <th class="text-left">
                        
                    </th>
                </tr>
            </thead>
            <tbody>
                <car-tr 
                v-for="car in $store.state.raceCars"
                :key="car.id"
                :car="car"
                />
            </tbody>
            </template>
        </v-simple-table>
    <error-overlay
        v-if="$store.state.network.id != 820"
    />
    </div>
</template>

<script>
import Web3 from 'web3'
export default {
    data() {
      return {
        carID: "",
        newBet: "",
        balance: "",
        dialog: true,
        checkbox: false
      }
    },
    beforeMount(){
        this.$store.state.raceButton = false;
        var web3 = new Web3(window.ethereum || Web3.givenProvider);
        web3.eth.requestAccounts().then(addresses => {
            this.$store.state.rentContract.methods.racerBalance(addresses[0]).call((err, res) => {
                this.balance = res.slice(0, -18)
            })
        })
    },
    methods: {
        createRace () {
            var web3 = new Web3(window.ethereum || Web3.givenProvider);
            let amountToSend = web3.utils.toWei(this.newBet);
            this.$store.state.rentContract.methods.createDragRace(this.carID).send({from: this.$store.state.wallet.address, value: amountToSend})         
            .then(() => {
                location.reload()
            })
            .catch(err => {
                this.$store.commit('showSnackbar', err.message);
            });
        },
        claim () {
            this.$store.state.rentContract.methods.claimRacerBalance().send({from: this.$store.state.wallet.address})         
            .then(() => {
                location.reload()
            })
            .catch(err => {
                this.$store.commit('showSnackbar', err.message);
            });
        }
    },
    components: {
    'car-tr': require('@/components/Shared/RentRaces.vue').default,
    'error-overlay': require('@/components/Shared/ErrorOverlay.vue').default
  }
}
</script>



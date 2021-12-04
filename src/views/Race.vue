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
                <v-dialog
                    v-model="dialog"
                    width="500"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="red lighten-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        icon
                        >
                        <v-icon>mdi-help-circle</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="text-h5">
                        Rules
                        </v-card-title>

                        <v-card-text>
                        1. 50 CLO fee for each race. <br>
                        2. You can not accept a Race against a lower Rank Car<br>
                            &nbsp; Rank 1: Car without bonus and with +1<br>
                            &nbsp; Rank 2: Car with +2 bonus and with +3<br>
                            &nbsp; Rank 3: Car with +4 bonus and with +5<br>
                        3. Bonus: Increase the chances of wining a race.<br>
                        4. You can cancel the race any time.<br>
                        5. The earnings are not trasnferred automatically. Use claim button.<br>
                        6. The winner is selected by random numbers. See the code of the contract to see how it does it.           
                        <v-btn class="ma-0 pa-0" icon href="https://explorer.callisto.network/address/0xEF852c8cA576148b81ed54F0C6e8882feCb7db68/contracts" target="_blank">
                                <v-icon> mdi-code-tags</v-icon> 
                            </v-btn>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                        >
                            Let's ride
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>       
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
        v-if="$store.state.network.id != 820 || !$store.state.web3"
    />
    </div>
</template>

<script>
import Race from '@/store/race'
export default {
    data() {
      return {
        carID: "",
        newBet: "",
        balance: "",
        dialog: true,
      }
    },
    beforeMount(){
        this.$store.state.raceButton = false;
        web3.eth.requestAccounts().then(addresses => {
            Race.methods.racerBalance(addresses[0]).call((err, res) => {
                this.balance = res.slice(0, -18)
                console.log(res)
            })
        })
    },
    methods: {
        createRace () {
            let amountToSend = web3.utils.toWei((parseInt(this.newBet)+50)+'');
            Race.methods.createDragRace(this.carID).send({from: this.$store.state.wallet.address, value: amountToSend})         
            .then(() => {
                location.reload()
            })
            .catch(err => {
                this.$store.commit('showSnackbar', err.message);
            });
        },
        claim () {
            Race.methods.claimRaceBalance().send({from: this.$store.state.wallet.address})         
            .then(() => {
                location.reload()
            })
            .catch(err => {
                this.$store.commit('showSnackbar', err.message);
            });
        }
    },
    components: {
    'car-tr': require('@/components/Shared/Races.vue').default,
    'error-overlay': require('@/components/Shared/ErrorOverlay.vue').default
  }
}
</script>



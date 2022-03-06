<template>
    <div>
        <v-card
            class="ma-0 pa-2 stars"
            
        >
        <v-row
            class="ma-0 pa-0"
        >
            <v-col
            cols="12"
            sm="3"
            class="ma-1 pa-0"
            >   
                <v-lazy
                    v-model="isActive"
                    :options="{
                    threshold: .5
                    }"
                    transition="fade-transition"
                >
                    <v-img 
                        width="100%"
                        :src="imagePath"
                        :key="carKey"
                        @error="errorHandler()"
                    ></v-img>
                </v-lazy>         
            </v-col>
            <v-col
            cols="12"
            sm="2"
            class="ma-1 pa-0"
            >
            <div class="rock pa-2 mb-5">
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
                <v-btn
                    width="100%"
                    color="#4d4d4d"
                    class="mx-0 pa-0 light-green--text"
                    @click="createRace"
                >
                    Create Race
                </v-btn>  
                <v-btn
                    width="100%"
                    color="#4d4d4d"
                    class="mt-1 pa-0 light-green--text"
                    @click="claim"
                >
                    Claim: {{balance}} CLO
                </v-btn>  
            </div>
  
                <v-btn
                    width="100%"
                    color="white"
                    class="mt-1 pa-0"
                    outlined
                    @click="() => {rules = true; leaderBoard = false, admin = false, about = false}"
                >
                    RULES
                </v-btn>     
                <v-btn
                    width="100%"
                    color="white"
                    class="mt-1 pa-0"
                    outlined
                    @click="() => {rules = false; leaderBoard = true, admin = false, about = false}"
                >
                    LEADER BOARD
                </v-btn>
                <v-btn
                    width="100%"
                    color="white"
                    class="mt-1 pa-0"
                    outlined
                    @click="() => {rules = false; leaderBoard = false, admin = false, about = true}"
                >
                    ABOUT NFT
                </v-btn>
                <v-btn
                    width="100%"
                    color="white"
                    class="mt-1 pa-0"
                    outlined
                    @click="() => {rules = false; leaderBoard = false, admin = true, about = false}"
                    v-if="nftOwner == $store.state.wallet.address"
                >
                    ADMIN
                </v-btn>
            </v-col>
            <v-col
            cols="12"
            sm="6"
            class="ma-1 pa-0"
            >
                <div v-if="rules" class="light-green--text">
                    <h1 class="text-center">Rules</h1>
                    <p>                    
                    1. Ticket price: {{ticketPrice}} CLO for each race. <br>
                    2. Bonus: Increase the chances of wining a race.<br>
                    3. Rally Soy has a bonus multiplier for baja trucks and other special cars.<br>
                    4. You can cancel the race any time.<br>
                    5. The earnings are not trasnferred automatically. Use claim button.<br>
                    6. Seasons: The Rally Soy owner can start a Season where the car with more point acumulated during the season will win an extra amount of CLO<br>
                    7. The winner is selected by random numbers from 0 to 50, the car with lower number wins. Example: If CAR 071 gets a 20 and CAR 061 gets a 0, CAR 061 should win but after apllying the bonuses CAR 071 still gets a 20 and CAR 061 gets a 40.
                    </p>
                </div>

                <div v-if="leaderBoard" class="light-green--text">
                    <div v-if="seasonStarted">
                        <h1 class="text-center">Season: {{season}}</h1>
                        <v-row class="text-center">
                            <v-col>CAR</v-col>
                            <v-col>Points</v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-lazy
                                    v-model="isActive"
                                    :options="{
                                    threshold: .5
                                    }"
                                    transition="fade-transition"
                                >
                                    <v-img 
                                    height="96px"
                                    width="196px"
                                    :src="imagePathFirst"
                                    :key="carKey"
                                    @error="errorHandler()"
                                    ></v-img>
                                </v-lazy>
                            </v-col>
                            <v-col>
                                <h1 class="text-center">{{firstPoints}}</h1>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-lazy
                                    v-model="isActive"
                                    :options="{
                                    threshold: .5
                                    }"
                                    transition="fade-transition"
                                >
                                    <v-img 
                                    height="64px"
                                    width="130px"                                    
                                    :src="imagePathSecond"
                                    :key="carKey"
                                    @error="errorHandler()"
                                    ></v-img>
                                </v-lazy>
                            </v-col>
                            <v-col>
                                <h1 class="text-center">{{secondPoints}}</h1>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-lazy
                                    v-model="isActive"
                                    :options="{
                                    threshold: .5
                                    }"
                                    transition="fade-transition"
                                >
                                    <v-img 
                                    height="64px"
                                    width="130px"                                      
                                    :src="imagePathThird"
                                    :key="carKey"
                                    @error="errorHandler()"
                                    ></v-img>
                                </v-lazy>
                            </v-col>
                            <v-col>
                                <h1 class="text-center">{{thirdPoints}}</h1>
                            </v-col>
                        </v-row>
                        <p class="text-center">Jackpot: {{seasonBalance}} CLO</p>
                        <p class="text-center">Season ends: {{end}}</p>
                        <v-btn 
                            v-if="endTimestamp < Date.now()"
                            outlined
                            @click="endSeason"
                        >
                            END SEASON
                        </v-btn>
                    </div>
                    <div v-else>
                        <h1 class="text-center">Season has not yet started</h1>
                    </div>

                </div>

                <div v-if="about" class="light-green--text">
                    <h1 class="text-center">ABOUT</h1>
                    <p>This is Power-C.ar's first soy.finance-inspired NFT race track based on CallistoNFT protocol. The owner of this NFT will be able to create seasonal events where part of the proceeds from ticket sales will go to the owner and part to the winner of the season. If you want to buy it you can leave your offer here below.</p>
                    <v-btn class="ma-0 pa-0" icon href="https://explorer.callisto.network/address/0xf3D8eD487Bbbba0683F26d62A909b3DcE6f478E4/contracts" target="_blank">
                        <v-icon> mdi-code-tags</v-icon> 
                    </v-btn>
                    <h2 class="text-center" v-if="nftPrice > 0">Price: {{nftPrice}} CLO</h2>
                    <h2 class="text-center" v-if="nftHighestbid > 0">Highest Bid:{{nftHighestbid}} CLO</h2>
                    <v-row class="ma-10 pa-0">
                        
                        <v-col class="ma-0 pa-0">
                            <v-text-field
                                label="Amount in CLO"
                                class="ma-0"
                                v-model="nftBid"
                                type="number"
                                step="1"
                                min="1"
                                solo
                                dense
                                outlined
                            >
                                <template v-slot:append>
                                    <v-btn
                                            width="100px"
                                            height="30px"
                                            color="#4d4d4d"
                                            class="mx-0 pa-0 light-green--text"
                                            @click="placeBid"
                                        >
                                            Bid
                                        </v-btn> 
                                </template>
                            </v-text-field> 
                        </v-col>
                        
                    </v-row>
                    <p class="text-center">Rally-Soy total earnings: {{earnings}} CLO</p>
                </div>
                <div  v-if="admin" class="light-green--text">
                    <h1 class="text-center">ADMIN PANEL</h1>
                    <v-textfield>

                    </v-textfield>
                    <v-textfield>
                        
                    </v-textfield>
                </div>
            </v-col>
        </v-row>
        </v-card>

        <v-simple-table
            fixed-header
            class="rock"
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
        nftBid: "",
        nftHighestbid: "",
        nftPriced: "",
        balance: 0,
        dialog: true,
        checkbox: false,
        ticketPrice: 0,
        imagePath: "",
        season: 0,
        carKey: 0,
        isActive: false,
        seasonBalance: 0,
        seasonStarted: false,
        rules: true,
        about: false,
        admin: false,
        leaderBoard: false,
        season: 0,
        imagePathFirst:  "",
        imagePathSecond: "",
        imagePathThird:  "",
        firstPoints: "",
        secondPoints: "",
        thirdPoints: "",
        nftOwner: "",
        earnings: "",
        end: "",
        endTimestamp: ""
      }
    },
    beforeMount(){
        if(sessionStorage.getItem("dialog") == "true"){
            this.dialog = false
            this.checkbox = true
        }else{
            this.dialog = true
            this.checkbox = false
        }

        this.$store.state.raceButton = false;
        var web3 = new Web3(window.ethereum || Web3.givenProvider);
        web3.eth.requestAccounts().then(addresses => {
            this.$store.state.rallyContract.methods.racerBalance(addresses[0]).call((err, res) => {
                if(res != '0'){this.balance = res.slice(0, -18)}
            })
        })
        this.$store.state.rallyContract.methods.ticketPrice().call((err, res) => {
          this.ticketPrice = res.slice(0, -18)
        })
        this.$store.state.rallyContract.methods.bidOf(0).call((err, res) => {
          this.nftHighestbid = res.price.slice(0, -18)
        })
        this.$store.state.rallyContract.methods.priceOf(0).call((err, res) => {
          this.nftPrice = res.slice(0, -18)
        })
        this.$store.state.rallyContract.methods.ownerOf(0).call((err, res) => {
          this.nftOwner = res;
        })
        this.$store.state.rallyContract.methods.tokenImage().call((err, res) => {
          this.imagePath = res
        })
        this.$store.state.rallyContract.methods.rallyTotalEarnings().call((err, res) => {
          this.earnings = res.slice(0, -18)
        })
        this.$store.state.rallyContract.methods.end().call((err, res) => {

          this.endTimestamp = res;
            
          this.end = new Date(res * 1e3).toISOString().slice(0, -5).replace("T"," ")
        })
        this.$store.state.rallyContract.methods.season().call((err, res) => {
            this.season = res;
            this.$store.state.rallyContract.methods.seasonHistory(res).call((err, res) => {
                if(res.seasonStarted){
                    this.$store.state.contract.methods.tokenURI(res.first).call((err, res) => {
                        this.imagePathFirst = res
                    })
                    this.$store.state.contract.methods.tokenURI(res.second).call((err, res) => {
                        this.imagePathSecond = res
                    })
                    this.$store.state.contract.methods.tokenURI(res.third).call((err, res) => {
                        this.imagePathThird = res
                    })
                    this.$store.state.rallyContract.methods._getSeasonPoints(this.season,res.first).call((err, res) => {
                        this.firstPoints = res
                    })
                    this.$store.state.rallyContract.methods._getSeasonPoints(this.season,res.second).call((err, res) => {
                        this.secondPoints = res
                    })
                    this.$store.state.rallyContract.methods._getSeasonPoints(this.season,res.third).call((err, res) => {
                        this.thirdPoints = res
                    })
                    this.seasonStarted = res.seasonStarted
                    this.seasonBalance = res.seasonBalance.slice(0, -18)
                }
            })
        })
    },
    methods: {
        errorHandler () {
            this.carKey += 1;
        },
        createRace () {
            var web3 = new Web3(window.ethereum || Web3.givenProvider);
            let amountToSend = web3.utils.toWei((parseInt(this.newBet)+parseInt(this.ticketPrice))+'');+
            this.$store.state.rallyContract.methods.createRally(this.carID).send({from: this.$store.state.wallet.address, value: amountToSend})         
            .then(() => {
                location.reload()
            })
            .catch(err => {
                this.$store.commit('showSnackbar', err.message);
            });
        },
        placeBid () {
            var web3 = new Web3(window.ethereum || Web3.givenProvider);
            let amountToSend = web3.utils.toWei(this.nftBid+"");
            this.$store.state.rallyContract.methods.setBid(0, amountToSend).send({from: this.$store.state.wallet.address, value: amountToSend})         
            .then(() => {
                location.reload()
            })
            .catch(err => {
                this.$store.commit('showSnackbar', err.message);
            })
            
        },
        claim () {
            this.$store.state.rallyContract.methods.claimRaceBalance().send({from: this.$store.state.wallet.address})         
            .then(() => {
                location.reload()
            })
            .catch(err => {
                this.$store.commit('showSnackbar', err.message);
            });
        },
        endSeason () {
            this.$store.state.rallyContract.methods.endSeason().send({from: this.$store.state.wallet.address})         
            .then(() => {
                location.reload()
            })
            .catch(err => {
                this.$store.commit('showSnackbar', err.message);
            });
        },
        closeDialog () {
            this.dialog = false
            if(this.checkbox){
                sessionStorage.setItem("dialog", true)
            }else{
                sessionStorage.setItem("dialog", false)
            }
        }
    },
    components: {
    'car-tr': require('@/components/Shared/RalliesSoy.vue').default,
    'error-overlay': require('@/components/Shared/ErrorOverlay.vue').default
  }
}
</script>

<style scoped>
    th{
        background: url('../assets/RockBar.gif') repeat !important;
        background-size: auto 100% !important;
        font-family: 'Press Start 2P', cursive;
        font-size: 15px !important;
        color: rgb(0, 255, 55) !important;

    }
    .rock{
        background: url('../assets/RockTile.png') repeat !important;
    }
    .stars{
        background-image: 
            url('../assets/StarBig.gif'),
            url('../assets/StarBig.gif'),
            url('../assets/StarSmall.gif'), 
            url('../assets/StarSmall.gif'), 
            url('../assets/StarSmall.gif'), 
            url('../assets/Space.png');
        background-position: 
            center top,
            75% 20%, 
            right center, 
            75% 75%, 
            20% 75%,
            left top;
        background-repeat: 
            no-repeat, 
            no-repeat, 
            no-repeat, 
            no-repeat,
            no-repeat,
            repeat;
    }
    p,h1, h2,button, td {
    font-family: 'Press Start 2P', cursive;; 
    }
    .v-btn, .v-text-field{
        border-radius: 0 !important;
    }
</style>

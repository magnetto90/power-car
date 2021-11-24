<template>
   <div
   align="center"
   >  
    <v-btn
      class="ma-2"
      :to="'/'"
      link
    >
      <h1>GO BACK</h1>
    </v-btn>
        <div
            v-if="$store.state.network.id == 820"
            align="center"
            width="100vw"
        >
            <v-card
                align="center"
                width="600px"
                min-height="300px"
                class="ma-10"
                style='border: 2px solid yellow'
            >
            
            <div>   
                <v-btn 
                class="float-sm-left mb-2" 
                shapped
                color="blue"
                width="100%"
                >
                    CAR 056 - ONE MORE CAR
                </v-btn>
                <img 
                width="85%"
                :src="imagePath"
                >
                <p :title="hBidder">
                    Highest Bidder: {{hBidder.substring(0, 4)+"..."+hBidder.substring(hBidder.length -4, hBidder.length)}} ----
                    Highest Bid: {{hBid/10**18}}
                </p>
                        
                <p>
                    <span v-if="bonus>0"> Bonus: +{{bonus}}</span><br>
                </p>

                <p v-if="end - actual > 0">
                    Blocks to Auctions End: {{end - actual}}
                </p>
                <h1 v-else>Auction Ended</h1>
            </div>
            <p>Rules:<br>
            1. You can add funds to your current bid to surpass the current highest bid.<br>
            2. You can bid until block count ends.<br>
            3. NFT owner can not bid.<br>
            4. If someone bid when there are ten or less blocks remaining, ten more blocks will be added.<br>
            5. Bid Increase must be at least 1 CLO.<br>
            6. You can withdraw your funds any time if you are not the highest bidder.
            </p>
            <div v-if="end - actual > 0">
              <h2 >Place your bid:</h2>
              <p>* this amount will be added to your current funds ({{funds}} CLO)</p>
            </div>
            <v-text-field
            v-if="end - actual > 0"
            v-model="amount"
            background-color="black"
            color="yellow"
            solo
            class="ma-2"
            outlined
            hide-details
            type="number"
            step="1"
            min="1"
            dense
            >
            </v-text-field>
            <v-btn
                class="black--text ma-2" 
                color="red"
                @click="retire()"
                >
                Withdraw Funds ({{funds}} CLO)
            </v-btn>
            <v-btn
                v-if="end - actual > 0"
                class="black--text ma-2" 
                color="green"
                @click="bid()"
                >
                Place Bid ({{parseInt(amount) + parseInt(funds)}} CLO)
            </v-btn>
              <v-overlay
                :absolute="absolute"
                :value="progressOverlay"
                opacity="90"
              >
              <img src="@/assets/Fuel.gif">
              </v-overlay>
            </v-card>
        </div>  
      
        <error-overlay
            v-if="$store.state.network.id != 820 || !$store.state.web3"
        />
   </div>
</template>

<script>
import Car from '@/store/car'
import Auction from '@/store/auction'
export default {
    props: ['car'],
    data() {
      return {
        imagePath: '',
        amount: 0,
        absolute: true,
        progressOverlay: false,
        bonus: 0,
        hBidder: '',
        hBid: 0,
        funds: 0,
        actual: 0,
        end: 0
      }
    },
    beforeMount(){

        Car.methods.tokenURI(56).call((err, res) => {
          this.imagePath = res
        })
        Car.methods.carBonus(56).call((err, res) => {
          this.bonus = res
        })
        Car.methods.carState(56).call((err, res) => {
          this.carState = res;
        })
        Auction.methods._highest_bid().call((err, res) => {
          this.hBid = res;
        })
        Auction.methods._highest_bidder().call((err, res) => {
           this.hBidder = res;
        })
        web3.eth.requestAccounts().then(addresses => {
          Auction.methods._bidders_balance(addresses[0]).call((err, res) => {
            this.funds = res/10**18;
          })
        })
        Auction.methods.actualBlock().call((err, res) => {
          this.actual = res
        })
        Auction.methods.endBlock().call((err, res) => {
          this.end = res
        })


    },
    methods: {
      bid () {
        this.progressOverlay = true;
        let amountToSend = web3.utils.toWei(this.amount+'', "ether"); 
        Auction.methods.bid().send({from: this.$store.state.wallet.address, value: amountToSend})         
        .then(value => {
          sessionStorage.setItem("lastTx", value.transactionHash) 
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          this.progressOverlay = false;
          });
      },
      retire () {
        this.progressOverlay = true;
        Auction.methods.claimFunds().send({from: this.$store.state.wallet.address})         
        .then(value => {
          sessionStorage.setItem("lastTx", value.transactionHash) 
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          this.progressOverlay = false;
          });
      }
    },
       mounted(){
    if(Car){
      this.$store.state.web3 = true
    }else{
      this.$store.state.web3 = false
    }
  },
    components: {
      'error-overlay': require('@/components/Shared/ErrorOverlay.vue').default,
    }
   
    }


</script>

<style>
p {
  margin: 0;
  padding: 0;
}

.v-progress-circular {
  margin: 1rem;
}

.myFont {
  font-family: 'Press Start 2P', cursive;; 
}


</style>


<template>
  <div
    :class="background"
    v-if="!$store.state.my_tokens || $store.state.wallet.address === this.owner"
  >
    <div>   
      <v-img 
        width="75%"
        :src="bonusImg"
        class="ma-0"
      ></v-img>
      <div class="plate">
        CAR {{car.id}}</div>
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 1
        }"
        transition="slide-x-reverse-transition"
      >
        <v-img 
          width="75%"
          :src="imagePath"
          :key="componentKey"
          @error="errorHandler()"
          class="mb-3"
        ></v-img>
      </v-lazy>

      <p>
        <span v-if="carState == 1 && $store.state.wallet.address == owner"> Price: {{carPrice}}</span>
      </p>
    </div>

    <button
      class="nes-btn"
      style="visibility: hidden;"
      v-if="carState == 0 && $store.state.wallet.address != owner"
    >
      dummy
    </button>

    <v-hover
      v-slot="{ hover }"
    >
      <button
        class="nes-btn is-warning" 
        v-if="carState == 1 && $store.state.wallet.address != owner"
        @click="buyCar()"
      >
        <span v-if="hover">BUY ({{parseInt(carPrice * cloPrice)}} USD)</span>
        <span v-else>BUY ({{carPrice}} CLO)</span>
      </button>
    </v-hover>

    <v-overlay
      :absolute="absolute"
      :value="sellOverlay"
      opacity="90"
    >
      <p>Fee: {{$store.state.feeRate}}%</p>
      <p>Set the CAR price:</p>
      <input v-model="amount" type="text" id="dark_field" class="nes-input is-dark">
      <button
        class="nes-btn is-success" 
        @click="sellCar()"
      >
        Confirm
      </button>
      <button
        class="nes-btn is-error" 
        @click="sellOverlay = false"
      >
        Cancel
      </button>
    </v-overlay>

    <v-overlay
      :absolute="absolute"
      :value="transferOverlay"
      opacity="90"
    >
      <h5>Instructions:</h5>
      <p>To send your car to another wallet enter the new wallet address and select confirm.</p>
      <input v-model="toAddress" type="text" id="dark_field" class="nes-input is-dark">
      <button
        class="nes-btn is-success" 
        @click="transferCar()"
      >
        Confirm
      </button>
      <button
        class="nes-btn is-error" 
        @click="transferOverlay = false"
      >
        Cancel
      </button>
    </v-overlay>

    <button
      v-if="carState == 0 && $store.state.wallet.address == owner"
      class="nes-btn is-warning"
      @click="sellOverlay = true"
      width="50%"
    >
      SELL
    </button>

    <button
      v-if="carState == 0 && $store.state.wallet.address == owner"
      class="nes-btn is-warning"
      @click="transferOverlay = true"
      width="50%"
    >
      TRANSFER
    </button>

    <button
      v-if="carState == 1 && $store.state.wallet.address == owner"
      class="nes-btn is-warning"
      @click="cancelSell()"
      width="100%"
    >
      CANCEL SELL
    </button>

    <v-overlay
      :absolute="absolute"
      :value="progressOverlay"
      opacity="90"
    >
      <img src="@/assets/Fuel.gif">
    </v-overlay>
  </div>
</template>

<script>
import Web3 from 'web3'
const web3_read = new Web3("https://rpc.callisto.network/");
const web3_write = new Web3(window.ethereum || Web3.givenProvider)

const axios = require('axios');

export default {
    props: ['car'],
    data() {
      return {
        imagePath: '',
        carState: 0,
        owner: '',
        carPrice: 0,
        amount: 0,
        toAddress: "",
        absolute: true,
        sellOverlay: false,
        transferOverlay: false,
        progressOverlay: false,
        bonus: 0,
        isActive: false,
        componentKey: 0,
        background: "",
        bonusImg: "",
        cloPrice: 0,
        contract_read: new web3_read.eth.Contract(
          [
            this.$store.state.contract.tokenURIABI, 
            this.$store.state.contract.carBonusABI,
            this.$store.state.contract.carStateABI,
            this.$store.state.contract.ownerOfABI,
            this.$store.state.contract.carSalesABI,
          ], 
            this.$store.state.contract.address
        ),
        contract_write: new web3_write.eth.Contract(
        [
          this.$store.state.contract.createCarSaleABI, 
          this.$store.state.contract.transferFromABI,
          this.$store.state.contract.endSaleABI,
          this.$store.state.contract.buyCarABI,
          ], 
          this.$store.state.contract.address
      )
      }
    },
    beforeMount(){
      this.imagePath = "https://raw.githubusercontent.com/ESNJS/power-car/assets/SerieC-"+this.car.id+".gif"
      /*
      this.contract_read.methods.tokenURI(this.car.id).call((err, res) => {
        this.imagePath = res
      })
      */
      this.contract_read.methods.carBonus(this.car.id).call((err, res) => {
        this.bonus = res
        this.bonusImg = "https://raw.githubusercontent.com/ESNJS/power-car/assets/p"+this.bonus+".png"
      })
      this.contract_read.methods.carState(this.car.id).call((err, res) => {
        this.carState = res;
        if(res == 1){
          this.contract_read.methods.carSales(this.car.id).call((err, res) => {
              this.carPrice = res.carPrice.slice(0, -18)
          })
        }
      })
      this.contract_read.methods.ownerOf(this.car.id).call((err, res) => {
        this.owner = res
      })

        if(this.car.id == 81){
          this.background = 'car-card starsrace'
        }else{
          this.background = 'car-card trackrace'
        }

        axios
        .get('https://api.coingecko.com/api/v3/coins/callisto')
        .then(res => {
          //console.log(`statusCode: ${res.status}`);
          this.cloPrice = res.data.market_data.current_price.usd;
        })
        .catch(error => {
          console.error(error);
          //retry if error
          //getPrice(tokenSymbol);
        });

    },
    methods: {
      errorHandler () {
        this.componentKey += 1;
      },
      async sellCar () {
        await this.$store.dispatch('switchChain')
        await this.$store.dispatch('getNetworkId')
        if(this.$store.state.network_id == 820){
          this.sellOverlay = false;
          this.progressOverlay = true;
          this.contract_write.methods.createCarSale(this.car.id, this.amount).send({from: this.$store.state.wallet.address})         
          .then(() => {
            location.reload()
          })
          .catch(err => {
            this.$store.commit('showSnackbar', err.message);
            this.progressOverlay = false;
            });
        }
      },
      async transferCar () {
        await this.$store.dispatch('switchChain')
        await this.$store.dispatch('getNetworkId')
        if(this.$store.state.network_id == 820){
          this.transferOverlay = false;
          this.progressOverlay = true;
          this.contract_write.methods.transferFrom(this.$store.state.wallet.address, this.toAddress, this.car.id).send({from: this.$store.state.wallet.address})         
          .then(() => {
            location.reload()
          })
          .catch(err => {
            this.$store.commit('showSnackbar', err.message);
            this.progressOverlay = false;
            });
        }
      },
      async cancelSell () {
        await this.$store.dispatch('switchChain')
        await this.$store.dispatch('getNetworkId')
        if(this.$store.state.network_id == 820){
          this.progressOverlay = true;
          this.contract_write.methods.endSale(this.car.id).send({from: this.$store.state.wallet.address})         
          .then(() => {
            location.reload()
          })
          .then(value => { console.log(value) })
          .catch(err => {
            this.$store.commit('showSnackbar', err.message);
            this.progressOverlay = false;
            });
        }
      },
      async buyCar () {
        await this.$store.dispatch('switchChain')
        await this.$store.dispatch('getNetworkId')
        if(this.$store.state.network_id == 820){
          var web3 = new Web3(window.ethereum || Web3.givenProvider);
          this.progressOverlay = true;
          let amountToSend = web3.utils.toWei(this.carPrice+'', "ether"); 
          this.contract_write.methods.buyCar(this.car.id).send({from: this.$store.state.wallet.address, value: amountToSend})         
          .then(() => {
            location.reload()
          })
          .catch(err => {
            this.$store.commit('showSnackbar', err.message);
            this.progressOverlay = false;
          });
        }

      },  
    }
}

</script>

<style>
  .car-card{
    margin: 0px !important;
    display: inline-block;
    width: 300px;
    height: 300px;

  }

  .plate {
    width: 32%;
    margin: 0;
    background: linear-gradient(90deg, rgba(0,0,255,1) 15%, rgba(255,255,255,1) 15%);
    color: black !important;
    text-align: right;
    padding-top: 2px;
    padding-right: 1px;
    margin-left: 100px;
    margin-bottom: 15px;

  }

  .trackrace{
        background: url( '../../assets/trackrace.png') no-repeat center center;
  }

  .starsrace{
        background: url( '../../assets/trackrace.gif') no-repeat center center;
  }
</style>


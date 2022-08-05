<template>
   <div>  
      <div
         align="center"
         width="100vw"
      >
      <h1 class="mt-10">Page Not Found</h1>
      <h2 >...but you found a car.</h2>
        <v-card
          align="center"
          width="270px"
          height="279px"
          :class="background"
          :style="$store.state.wallet.address == owner ? 'border: 2px solid green;' : 'border: 2px solid red;'"
        >
         <div>   
      <v-hover
        v-slot="{ hover }"
      >
        <v-btn 
          class="mb-2" 
          shapped
          color="blue"
          width="100%"
        >
          <v-spacer></v-spacer>
          <span v-if="hover && car.name != ''">{{car.name}}</span>
          <span v-else>CAR {{car.id}}</span>
          <v-spacer></v-spacer>
        </v-btn>
      </v-hover>
      <p :title="owner">
        Owner: {{owner.substring(0, 4)+"..."+owner.substring(owner.length -4, owner.length)}}
      </p>
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: 1
        }"
        transition="slide-x-reverse-transition"
      >
        <v-img 
          width="80%"
          :src="imagePath"
          :key="componentKey"
          @error="errorHandler()"
        ></v-img>
      </v-lazy>
      <p>
        <span v-if="bonus>0" title="This number helps you win races!!"> Bonus: +{{bonus}}</span><br>
        <span v-if="carState == 1 && $store.state.wallet.address == owner"> Price: {{carPrice}}</span>
      </p>
    </div>

    <button
      v-if="carState == 1 && $store.state.wallet.address != owner"
      class="nes-btn is-warning" 
      @click="buyCar()"
    >
      BUY ({{carPrice}} CLO)
    </button>

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
  </v-card>
      </div>  
   </div>
</template>

<script>
import Web3 from 'web3'
const web3_read = new Web3("https://rpc.callisto.network/");
const web3_write = new Web3(window.ethereum || Web3.givenProvider)

export default {
    data() {
      return {
        car: {id: "404", name: "Car not found"},
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
        time: 0,
        background: "",
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
        var today = new Date();
        this.time = today.getHours();
        this.imagePath = "https://raw.githubusercontent.com/ESNJS/power-car/assets/SerieC-"+this.car.id+".gif"
        /*
        this.contract_read.methods.tokenURI(this.car.id).call((err, res) => {
          this.imagePath = res
        })
        */
        this.contract_read.methods.carBonus(this.car.id).call((err, res) => {
          this.bonus = res
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
          this.background = 'car-card stars'
        }else{
          if(this.time <= 7 ||this.time >= 19){
            this.background = 'car-card night'
          }else{
            this.background = 'car-card day'
          }
        }
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
p {
  margin: 0 !important;
  padding: 0;
}

.car-card{
  margin: 10px;
  display: inline-block;
}

.night{
      background: url( '../assets/night.png') no-repeat center center;
}

.day{
      background: url( '../assets/day.png') no-repeat center center;
}

.stars{
      background: url( '../assets/stars.gif') no-repeat center center;
}


</style>


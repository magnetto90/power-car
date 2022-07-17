<template>
  <v-card
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
          class="float-left mb-2" 
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

      <v-lazy
        v-model="isActive"
        :options="{
          threshold: .5
        }"
        transition="fade-transition"
      >
        <v-img 
          width="80%"
          :src="imagePath"
          :key="componentKey"
          @error="errorHandler()"
        ></v-img>
      </v-lazy>
      <p :title="owner">
        Owner: {{owner.substring(0, 4)+"..."+owner.substring(owner.length -4, owner.length)}}
      </p>
      <p>
        <span v-if="bonus>0" title="This number helps you win races!!"> Bonus: +{{bonus}}</span><br>
        <span v-if="carState == 1 && $store.state.wallet.address == owner"> Price: {{carPrice}}</span>
      </p>
    </div>

    <v-btn
      class="black--text" 
      v-if="carState == 1 && $store.state.wallet.address != owner"
      color="yellow"
      width="100%"
      @click="buyCar()"
    >
      BUY ({{carPrice}} CLO)
    </v-btn>

    <v-overlay
      :absolute="absolute"
      :value="sellOverlay"
      opacity="90"
    >
      <p>Fee: {{$store.state.feeRate}}%</p>
      <p>Set the CAR price:</p>
      <v-text-field
        v-model="amount"
        background-color="black"
        color="yellow"
        solo
        class="ml-0"
        outlined
        hide-details
        type="number"
        step="1"
        min="1"
        dense
      >
      </v-text-field>
      <v-btn
        color="success"
        @click="sellCar()"
      >
        Confirm
      </v-btn>
      <v-btn
        color="error"
        @click="sellOverlay = false"
      >
        Cancel
      </v-btn>
    </v-overlay>

    <v-overlay
      :absolute="absolute"
      :value="transferOverlay"
      opacity="90"
    >
      <v-btn 
        class="float-left mb-2" 
        shapped
        :color="car.id == 59? 'red' : 'blue'"
        width="100%"
      >
        <v-spacer></v-spacer>
        <span>CAR {{car.id}}</span>
        <v-spacer></v-spacer>
      </v-btn>
      <h5>Instructions:</h5>
      <p>To send your car to another wallet enter the new wallet address and select confirm.</p>
      <v-text-field
        v-model="toAddress"
        background-color="black"
        color="yellow"
        solo
        class="ml-0"
        outlined
        hide-details
        type="text"
        dense
      >
      </v-text-field>
      <v-btn
        color="success"
        @click="transferCar()"
      >
        Confirm
      </v-btn>
      <v-btn
        color="error"
        @click="transferOverlay = false"
      >
        Cancel
      </v-btn>
    </v-overlay>

    <v-btn
      v-if="carState == 0 && $store.state.wallet.address == owner"
      class="mr-0 black--text" 
      color="yellow"
      @click="sellOverlay = true"
      width="50%"
    >
      SELL
    </v-btn>

    <v-btn
      v-if="carState == 0 && $store.state.wallet.address == owner"
      class="mr-0 black--text" 
      color="yellow"
      @click="transferOverlay = true"
      width="50%"
    >
      TRANSFER
    </v-btn>

    <v-btn
      class=" black--text" 
      v-if="carState == 1 && $store.state.wallet.address == owner"
      color="yellow"
      @click="cancelSell()"
      width="100%"
    >
      CANCEL SELL
    </v-btn>
    <v-btn
      class=" black--text" 
      v-if="carState == 3 && $store.state.wallet.address == owner"
      color="yellow"
      @click="cancelRace()"
      width="100%"
    >
      CANCEL RACE
    </v-btn>

    <v-overlay
      :absolute="absolute"
      :value="progressOverlay"
      opacity="90"
    >
      <img src="@/assets/Fuel.gif">
    </v-overlay>
  </v-card>
</template>

<script>
import Web3 from 'web3'
const web3_read = new Web3("https://rpc.callisto.network/");
const web3_write = new Web3(window.ethereum || Web3.givenProvider)

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
        this.contract_read.methods.tokenURI(this.car.id).call((err, res) => {
          this.imagePath = res
        })
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
          this.background = 'float-left mx-3 my-3 stars'
        }else{
          if(this.time <= 7 ||this.time >= 19){
            this.background = 'float-left mx-3 my-3 night'
          }else{
            this.background = 'float-left mx-3 my-3 day'
          }
        }
    },
    methods: {
      errorHandler () {
        this.componentKey += 1;
      },
      sellCar () {
        this.sellOverlay = false;
        this.progressOverlay = true;
        this.contract_write.methods.createCarSale(this.car.id, this.amount).send({from: this.$store.state.wallet.address})         
        .then(value => {
          sessionStorage.setItem("lastTx", value.transactionHash) 
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          this.progressOverlay = false;
          });

      },
      transferCar () {
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

      },
      cancelSell () {
        this.progressOverlay = true;
        this.contract_write.methods.endSale(this.car.id).send({from: this.$store.state.wallet.address})         
        .then(value => {
          sessionStorage.setItem("lastTx", value.transactionHash) 
          location.reload()
        })
        .then(value => { console.log(value) })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          this.progressOverlay = false;
          });
      },
      buyCar () {
        var web3 = new Web3(window.ethereum || Web3.givenProvider);
        this.progressOverlay = true;
        let amountToSend = web3.utils.toWei(this.carPrice+'', "ether"); 
        this.contract_write.methods.buyCar(this.car.id).send({from: this.$store.state.wallet.address, value: amountToSend})         
        .then(value => {
          sessionStorage.setItem("lastTx", value.transactionHash) 
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          this.progressOverlay = false;
          });
      },  
    }
}

</script>

<style>
p {
  margin: 0;
  padding: 0;
}

.night{
      background: url( '../../assets/night.png') no-repeat center center;
}

.day{
      background: url( '../../assets/day.png') no-repeat center center;
}

.stars{
      background: url( '../../assets/stars.gif') no-repeat center center;
}


</style>


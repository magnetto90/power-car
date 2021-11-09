<template>
  <v-card
    align="center"
    width="300px"
    min-height="300px"
    class="float-left mx-9 my-5"
    :style="address == owner ? 'border: 2px solid green;' : 'border: 2px solid red;'"
  >
    <div>   
      <v-btn 
        class="float-left mb-2" 
        shapped
        :color="car.id == 59? 'red' : 'blue'"
        width="100%"
        >
        <img v-if="car.id <= 59 && car.id >= 55" src="@/assets/MusicNote.gif" class="music-note">
        <v-spacer></v-spacer>
        CAR {{car.id}}
        <v-spacer></v-spacer>
      </v-btn>

      <v-lazy
        v-model="isActive"
        :options="{
          threshold: .5
        }"
        transition="fade-transition"
      >
        <v-img 
          width="75%"
          :src="imagePath"
          :key="componentKey"
          @error="errorHandler()"
        ></v-img>
      </v-lazy>
      <p :title="owner">
        Owner: {{owner.substring(0, 4)+"..."+owner.substring(owner.length -4, owner.length)}}
      </p>
      <p>
        <span :class="winRateColor()" v-if="total>0">Win Rate: {{(wins*100/total).toFixed(0)}}% </span>
        <span v-if="bonus>0" title="This number helps you win races!!"> Bonus: +{{bonus}}</span><br>
        <span v-if="carState == 1 && address == owner"> Price: {{carPrice}}</span>
      </p>
    </div>

     <v-btn
        class="black--text" 
        v-if="carState == 1 && address != owner"
        color="yellow"
        @click="buyCar()"
      >
      
        BUY ({{carPrice.toFixed(0)}} CLO)

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



      <v-btn
        v-if="carState == 0 && address == owner"
        class="mr-0 black--text" 
        color="yellow"
        @click="sellOverlay = true"
        width="50%"
      >
        SELL
      </v-btn>

    <v-btn
      class=" black--text" 
      v-if="carState == 1 && address == owner"
      color="yellow"
      @click="cancelSell()"
      width="100%"
    >
      CANCEL SELL
    </v-btn>
    <v-btn
      class="black--text" 
      v-if="carState == 0 && address == owner"
      color="red"
      @click="createRace()"
      width="50%"
      title="If you run a race you can lose your car! Or win your oponent car!"
    >
      RACE
    </v-btn>


        <v-overlay
          :absolute="absolute"
          :value="raceOverlay"
          opacity="90"
        >
         <p>Enter your car ID to race:</p>
        <v-text-field
          v-model="betCar"
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
            @click="acceptRace()"
          >
            Confirm
          </v-btn>
          <v-btn
            color="error"
            @click="raceOverlay = false"
          >
            Cancel
          </v-btn>
          <p>*If you lose the race you lose your car.</p>
        </v-overlay>
          <v-btn
          v-if="carState == 3 && address != owner"
      class=" black--text" 
      color="red"
      @click="raceOverlay = true"
      
    >
      ACCEPT RACE
    </v-btn>
 

    <v-btn
      class=" black--text" 
      v-if="carState == 3 && address == owner"
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
import CarMob from '@/store/carMobile'
import Web3 from 'web3'
export default {
    props: ['car'],
    data() {
      return {
        imagePath: '',
        carState: 0,
        owner: '',
        carPrice: 0,
        amount: 0,
        betCar: 0,
        absolute: true,
        sellOverlay: false,
        raceOverlay: false,
        progressOverlay: false,
        bonus: 0,
        wins: 0,
        total: 0,
        isActive: false,
        componentKey: 0,
        address: ''
      }
    },
    beforeMount(){
        var web3 = new Web3(Web3.givenProvider);
        web3.eth.requestAccounts().then(addresses => {this.address = addresses[0]})
        CarMob.methods.tokenURI(this.car.id).call((err, res) => {
          this.imagePath = res
        })
        CarMob.methods.carBonus(this.car.id).call((err, res) => {
          this.bonus = res
        })
        CarMob.methods.carWinRate(this.car.id).call((err, res) => {
          this.wins = res.wins
          this.total = res.total
        })
        CarMob.methods.carState(this.car.id).call((err, res) => {
          this.carState = res;
          if(res == 1){
            CarMob.methods.carSales(this.car.id).call((err, res) => {
              this.carPrice = res.carPrice/(10**18)
            })
          }
        })
        CarMob.methods.ownerOf(this.car.id).call((err, res) => {
          this.owner = res
          if(res+'' == this.address+''){
            this.$store.state.carsOwned.push(this.car.id);
          }
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
      sellCar () {
        this.sellOverlay = false;
        this.progressOverlay = true;
         CarMob.methods.createCarSale(this.car.id, this.amount).send({from: this.address})         
        .then(value => {
          sessionStorage.setItem("lastTx", value.transactionHash) 
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          this.progressOverlay = false;
          });

      },
      cancelSell () {
        this.progressOverlay = true;
        CarMob.methods.endSale(this.car.id).send({from: this.address})         
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
        this.progressOverlay = true;
        let amountToSend = web3.utils.toWei(this.carPrice+'', "ether"); 
        CarMob.methods.buyCar(this.car.id).send({from: this.address, value: amountToSend})         
        .then(value => {
          sessionStorage.setItem("lastTx", value.transactionHash) 
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          this.progressOverlay = false;
          });
      },
      createRace () {
        this.progressOverlay = true;
        CarMob.methods.createDragRace(this.car.id).send({from: this.address})         
        .then(value => {
          sessionStorage.setItem("lastTx", value.transactionHash) 
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          this.progressOverlay = false;
          });
      },
      cancelRace () {
        this.progressOverlay = true;
        CarMob.methods.cancelDragRace(this.car.id).send({from: this.address})         
        .then(value => {
          sessionStorage.setItem("lastTx", value.transactionHash) 
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          this.progressOverlay = false;
          });
      },
      acceptRace () {
        this.raceOverlay = false;
        this.progressOverlay = true;
        CarMob.methods.acceptDragRace(this.car.id, this.betCar).send({from: this.address})         
        .then(value => {
          sessionStorage.setItem("lastTx", value.transactionHash) 
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          this.progressOverlay = false;
          });
      }      
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

.music-note{
 position: absolute;
 left: 0;
}

</style>


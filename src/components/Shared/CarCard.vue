<template>
  <v-card
    align="center"
    width="250px"
    height="300px"
    class="float-sm-left ma-10 pa-5"
    :style="$store.state.wallet.address == owner ? 'border: 2px solid green;' : 'border: 2px solid red;'"
  >
    <div>   
      <v-btn 
        class="float-sm-left" 
        shapped
        color="blue"
        >
        CAR {{car.id}}
      </v-btn>

      <img 
        width="100%"
        :src="imagePath"
      >
      <p :title="owner">
        Owner: {{owner.substring(0, 4)+"..."+owner.substring(owner.length -4, owner.length)}}
      </p>
    </div>

     <v-btn
        class="black--text" 
        v-if="carState == 1 && $store.state.wallet.address != owner"
        color="yellow"
        @click="buyCar()"
      >
        BUY
      </v-btn>

        <v-overlay
          :absolute="absolute"
          :value="sellOverlay"
          opacity="90"
        >
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
        v-if="carState == 0 && $store.state.wallet.address == owner"
        class="mr-0 black--text" 
        color="yellow"
        @click="sellOverlay = true"
        width="100%"
      >
        SELL
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
      class="black--text" 
      v-if="carState == 0 && $store.state.wallet.address == owner"
      color="red"
      @click="createRace()"
      width="100%"
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
        </v-overlay>
          <v-btn
          v-if="carState == 3 && $store.state.wallet.address != owner"
      class=" black--text" 
      color="red"
      @click="raceOverlay = true"
      width="100%"
    >
      ACCEPT RACE
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
    <p v-if="carPrice > 0">
      Price: CLO {{carPrice}}
    </p>

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
import Car from '@/store/car'
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
        progressOverlay: false
      }
    },
    beforeMount(){
        Car.methods.tokenURI(this.car.id).call((err, res) => {
          this.imagePath = res
        })
        Car.methods.carState(this.car.id).call((err, res) => {
          this.carState = res;
          if(res == 1){
            Car.methods.carSales(this.car.id).call((err, res) => {
              this.carPrice = res.carPrice/(10**18)
            })
          }
        })
        Car.methods.ownerOf(this.car.id).call((err, res) => {
          this.owner = res
          if(res+'' == this.$store.state.wallet.address+''){
            this.$store.state.carsOwned.push(this.car.id);
          }
        })
    },
    methods: {
      sellCar () {
        this.sellOverlay = false;
        this.progressOverlay = true;
         Car.methods.createCarSale(this.car.id, this.amount).send({from: this.$store.state.wallet.address})         
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
        Car.methods.endSale(this.car.id).send({from: this.$store.state.wallet.address})         
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
        Car.methods.buyCar(this.car.id).send({from: this.$store.state.wallet.address, value: amountToSend})         
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
        Car.methods.createDragRace(this.car.id).send({from: this.$store.state.wallet.address})         
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
        Car.methods.cancelRace(this.car.id).send({from: this.$store.state.wallet.address})         
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
        Car.methods.acceptDragRace(this.car.id, this.betCar).send({from: this.$store.state.wallet.address})         
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

</style>


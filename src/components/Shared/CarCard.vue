<template>
  <v-card
    width="20vw"
    height="350px"
    min-width="250px" 
    :color="$store.state.wallet.address == owner ? 'green' : 'blue'" 
    class="float-sm-left ma-10 pa-5"
    :disabled="false"
  >
    <img 
      width="90%"
      :src="imagePath"
      center
    >
    <br>
    <p>Car Battery: {{carBattery}}</p>
     <v-btn
      class="mr-3 black--text" 
      v-if="carState == 1 && $store.state.wallet.address != owner"
      color="yellow"
      @click="buyCar()"
    >
      BUY
    </v-btn>
    <div v-if="carState == 0 && $store.state.wallet.address == owner" class="d-flex">

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
        class="mr-0 black--text" 
        color="yellow"
        @click="sellCar()"
      >
        SELL
      </v-btn>
    </div>
    <v-btn
      class="mr-3 black--text" 
      v-if="carState == 1 && $store.state.wallet.address == owner"
      color="yellow"
      @click="cancelSell()"
    >
      CANCEL SELL
    </v-btn>
    <v-btn
      class="mr-3 black--text" 
      v-if="carState == 0 && $store.state.wallet.address == owner"
      color="red"
      @click="createRace()"
    >
      RACE
    </v-btn>
    <div v-if="carState == 3 && $store.state.wallet.address != owner">
          <v-btn
      class="mr-3 black--text" 
      
      color="red"
      @click="acceptRace()"
    >
      ACCEPT RACE
    </v-btn>
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
      width="50%"
      label="Your Card ID"
    >
    </v-text-field>
    </div>

    <v-btn
      class="mr-3 black--text" 
      v-if="carState == 3 && $store.state.wallet.address == owner"
      color="yellow"
      @click="cancelRace()"
    >
      CANCEL RACE
    </v-btn>
    <p v-if="carPrice > 0">
      Price: CLO: {{carPrice}}
    </p>
    <p :title="owner">
      Owner: {{owner.substring(0, 4)+"..."+owner.substring(owner.length -4, owner.length)}}
    </p>
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
        carBattery: '',
      }
    },
    beforeMount(){
        Car.methods.tokenURI(this.car.id).call((err, res) => {
          this.imagePath = res
        })
        Car.methods.carBattery(this.car.id).call((err, res) => {
          this.carBattery = res.status+'/'+res.amount
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
        })
    },
    methods: {
      sellCar () {
        Car.methods.createCarSale(this.car.id, this.amount).send({from: this.$store.state.wallet.address})         
        .on('confirmation', function(){
            location.reload()
        })
        .on('error', function(error){
            this.$store.commit('showSnackbar', 'Car is not on sale ' + error);
        });
      },
      cancelSell () {
        Car.methods.endSale(this.car.id).send({from: this.$store.state.wallet.address})         
        .on('confirmation', function(){
            location.reload()
        })
        .on('error', function(error){
            this.$store.commit('showSnackbar', 'Can not perform this acction ' + error);
        });
      },
      buyCar () {
          const amountToSend = web3.utils.toWei(this.carPrice+'', "ether"); 
        Car.methods.buyCar(this.car.id).send({from: this.$store.state.wallet.address, value: amountToSend})         
          .on('confirmation', function(){
              location.reload()
          })
          .on('error', function(error){
              this.$store.commit('showSnackbar', error);
        });
      },
      createRace () {
        Car.methods.createDragRace(this.car.id).send({from: this.$store.state.wallet.address})         
        .on('confirmation', function(){
            location.reload()
        })
        .on('error', function(error){
            this.$store.commit('showSnackbar', 'Can not perform this acction ' + error);
        });
      },
      cancelRace () {
        Car.methods.cancelRace(this.car.id).send({from: this.$store.state.wallet.address})         
        .on('confirmation', function(){
            location.reload()
        })
        .on('error', function(error){
            this.$store.commit('showSnackbar', 'Can not perform this acction ' + error);
        });

      },
      acceptRace () {
        Car.methods.acceptDragRace(this.car.id, this.betCar).send({from: this.$store.state.wallet.address})         
        .on('confirmation', function(){
            location.reload()
        })
        .on('error', function(error){
            this.$store.commit('showSnackbar', 'Can not perform this acction ' + error);
        });
      }      
    }
}

</script>

<style>
p {
  margin: 0; 

}
</style>


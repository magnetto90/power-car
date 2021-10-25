<template>
  <v-card
    width="20vw"
    min-width="250px" 
    color="blue" 
    class="float-sm-left ma-10 pa-5"
  >
    <img 
      width="90%"
      :src="imagePath"
      center
    >
    <br>
     <v-btn
      class="mr-3 black--text" 
      v-if="carState == 1 && $store.state.wallet.address != owner"
      color="yellow"
    >
      BUY
    </v-btn>
    <v-btn
      class="mr-3 black--text" 
      v-if="carState == 0 && $store.state.wallet.address == owner"
      color="yellow"
    >
      SELL
    </v-btn>
    <v-btn
      class="mr-3 black--text" 
      v-if="carState == 0 && $store.state.wallet.address == owner"
      color="red"
    >
      RACE
    </v-btn>
    <v-btn
      class="mr-3 black--text" 
      v-if="carState == 3 && $store.state.wallet.address != owner"
      color="red"
    >
      ACCEPT RACE
    </v-btn>
    <v-btn
      class="mr-3 black--text" 
      v-if="carState == 1 && $store.state.wallet.address == owner"
      color="yellow"
    >
      CANCEL SELL
    </v-btn>
    <p 
      class="ma-5"
    >
      Price: CLO: {{carPrice}}
    </p>
    <p :title="owner"
      class="ma-5"
    >
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
      }
    },
    beforeMount(){
      
      console.log("Listing Car");

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
        })
    }
}

</script>


<template>
<div>
  <div
    v-if="$store.state.network.id == 820"
    align="center"
  >

    <v-btn class="ma-1 white--text"
      color="#cc0000"
      @click="sortByID"
    >Sort by ID</v-btn>
    <v-btn class="ma-1 white--text" 
      color="#cc0000"
      @click="sortByPrice"
    >Sort by Price</v-btn>
    <v-btn class="ma-1 white--text"
      color="#cc0000"
      @click="sortByBonus"
    >Sort by Bonus</v-btn>

    <v-pagination
      class="mt-1"
      color="#cc0000"
      v-model="page"
      :length="8"
      @input="setCurrentPage(0)"
      @next="setCurrentPage(1)"
      @previous="setCurrentPage(-1)"
    ></v-pagination>  

    <div v-if="page == 1">
      <car-card
      v-for="car in $store.state.cars.slice(0, 10)"
      :key="car.id"
      :car="car"
    /></div> 
    <div v-if="page == 2">
      <car-card
      v-for="car in $store.state.cars.slice(10, 20)"
      :key="car.id"
      :car="car"
    /></div> 
    <div v-if="page == 3">
      <car-card
      v-for="car in $store.state.cars.slice(20, 30)"
      :key="car.id"
      :car="car"
    /></div> 
    <div v-if="page == 4">
      <car-card
      v-for="car in $store.state.cars.slice(30, 40)"
      :key="car.id"
      :car="car"
    /></div>
    <div v-if="page == 5">
      <car-card
      v-for="car in $store.state.cars.slice(40, 50)"
      :key="car.id"
      :car="car"
    /></div> 
    <div v-if="page == 6">
      <car-card
      v-for="car in $store.state.cars.slice(50, 60)"
      :key="car.id"
      :car="car"
    /></div>
    <div v-if="page == 7">
      <car-card
      v-for="car in $store.state.cars.slice(60, 70)"
      :key="car.id"
      :car="car"
    /></div>
    <div v-if="page == 8">
      <car-card
      v-for="car in $store.state.cars.slice(70, 80)"
      :key="car.id"
      :car="car"
    /></div>     
  </div>
   <error-overlay
    v-if="$store.state.network.id != 820 || !$store.state.web3"
  />
</div>
</template>


<script>
import Car from '@/store/car'
export default {
  data () {
      return {
        page: 1,
        random: [],
        ByID: true,
        ByPrice: false,
        ByBonus: false
      }
    },
  beforeMount(){
    this.$store.state.raceButton = true;
    for(let i = 0; i <= 79; i++){    
      Car.methods.carBonus(i).call((err, res) => {
        this.$store.state.cars[i].bonus = res
      })
      Car.methods.carState(i).call((err, res) => {
        if(res == 1){
          Car.methods.carSales(i).call((err, res) => {
            this.$store.state.cars[i].carPrice = parseInt(res.carPrice.slice(0, -18))
          })
        }else{
          this.$store.state.cars[i].carPrice = 100**12
        }
      })
    }

    //console.log(this.$store.state.cars)


    if(Car){
      this.$store.state.web3 = true
    }else{
      this.$store.state.web3 = false
    }
    if(sessionStorage.getItem("currentPage")){
      this.page = parseInt(sessionStorage.getItem("currentPage"))
    }
  },methods: {
    setCurrentPage(){
      sessionStorage.setItem("currentPage", this.page)
      this.fisherYates(this.random)
    },
    fisherYates ( myArray ) {
      var i = myArray.length;
      if ( i == 0 ) return false;
      while ( --i ) {
        var j = Math.floor( Math.random() * ( i + 1 ) );
        var tempi = myArray[i];
        var tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
      }
    },
    sortByID () {
      if(this.ByID){
        this.$store.state.cars.sort((a, b) => a.id <= b.id ? 1 : -1);
        this.ByID = false
      }else{
        this.$store.state.cars.sort((a, b) => a.id >= b.id ? 1 : -1);
        this.ByID = true
      }
    },
    sortByPrice () {
      if(this.ByPrice){
        this.$store.state.cars.sort((a, b) => a.carPrice <= b.carPrice ? 1 : -1);
        this.ByPrice = false
      }else{
        this.$store.state.cars.sort((a, b) => a.carPrice >= b.carPrice ? 1 : -1);
        this.ByPrice = true
      }

    },
    sortByBonus () {
      if(this.ByBonus){
        this.$store.state.cars.sort((a, b) => a.bonus <= b.bonus ? 1 : -1);
        this.ByBonus = false
      }else{
        this.$store.state.cars.sort((a, b) => a.bonus >= b.bonus ? 1 : -1);
        this.ByBonus = true
      } 
      
    }
  },
  components: {
    'car-card': require('@/components/Shared/CarCard.vue').default,
    'error-overlay': require('@/components/Shared/ErrorOverlay.vue').default
  }
};
</script>


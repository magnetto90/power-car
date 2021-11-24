<template>
<div>
  <div
    v-if="$store.state.network.id == 820"
    align="center"
  >

    <v-pagination
      class="mt-1"
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
        random: []
      }
    },
  beforeMount(){
    /*
    for (let i = 0; i <= 9; i++) {
      this.random[i] = this.$store.state.cars[i];
    }
    this.fisherYates(this.random)
    */
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
    }
  },
  components: {
    'car-card': require('@/components/Shared/CarCard.vue').default,
    'error-overlay': require('@/components/Shared/ErrorOverlay.vue').default
  }
};
</script>


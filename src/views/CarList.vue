<template>
<div>
  <div
    v-if="$store.state.network.id == 820"
    align="center"
  >
    <div v-if="page == 1">
      <car-card
      v-for="car in $store.state.cars1"
      :key="car.id"
      :car="car"
    /></div> 
    <div v-if="page == 2">
      <car-card
      v-for="car in $store.state.cars2"
      :key="car.id"
      :car="car"
    /></div> 
    <div v-if="page == 3">
      <car-card
      v-for="car in $store.state.cars3"
      :key="car.id"
      :car="car"
    /></div> 
    <div v-if="page == 4">
      <car-card
      v-for="car in $store.state.cars4"
      :key="car.id"
      :car="car"
    /></div>
    <div v-if="page == 5">
      <car-card
      v-for="car in $store.state.cars5"
      :key="car.id"
      :car="car"
    /></div> 
    <div v-if="page == 6">
      <car-card
      v-for="car in $store.state.cars6"
      :key="car.id"
      :car="car"
    /></div>
    <div v-if="page == 7">
      <car-card
      v-for="car in random"
      :key="car.id"
      :car="car"
    /></div>   
    <v-pagination
      class="my-5"
      v-model="page"
      :length="7"
      circle
      @input="setCurrentPage(0)"
      @next="setCurrentPage(1)"
      @previous="setCurrentPage(-1)"
    ></v-pagination>  
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
        page: 7,
        random: []
      }
    },
  beforeMount(){
    for (let i = 0; i <= 9; i++) {
      this.random[i] = this.$store.state.cars7[i];
    }

    this.fisherYates(this.random)
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


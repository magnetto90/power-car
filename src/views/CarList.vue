<template>
<div>
  <div
    v-if="$store.state.network.id == 820"
    align="center"
  >
    <v-pagination
      class="mt-5"
      v-model="page"
      :length="5"
      circle
      @input="setCurrentPage(0)"
      @next="setCurrentPage(1)"
      @previous="setCurrentPage(-1)"
    ></v-pagination> 
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
      }
    },
  beforeMount(){
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
    }
  },
  components: {
    'car-card': require('@/components/Shared/CarCard.vue').default,
    'error-overlay': require('@/components/Shared/ErrorOverlay.vue').default
  }
};
</script>


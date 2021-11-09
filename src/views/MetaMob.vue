<template>
<div>     
    <v-pagination
      class="mt-5"
      v-model="page"
      :length="6"
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
    <div v-if="page == 6">
      <car-card
      v-for="car in $store.state.cars6"
      :key="car.id"
      :car="car"
    /></div>
</div>

</template>

<script>
import CarMob from '@/store/carMobile'
export default {
      data () {
      return {
        page: 1,
      }
    }, 
    beforeMount(){
    if(CarMob){
      this.$store.state.web3 = true

    }else{
      this.$store.state.web3 = false
    }
    if(sessionStorage.getItem("currentPage")){
      this.page = parseInt(sessionStorage.getItem("currentPage"))
    }
  },
    methods: {
    setCurrentPage(){
      sessionStorage.setItem("currentPage", this.page)
    }
    },
    components: {
        'car-card': require('@/components/Shared/CarCardMob.vue').default,
    }
}
</script>
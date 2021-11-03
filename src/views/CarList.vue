<template>
<div>
  <div
    v-if="$store.state.network.id == 820"
  >  
    <car-card
      v-for="car in $store.state.cars"
      :key="car.id"
      :car="car"
    />
  </div>

  <error-overlay
    v-if="$store.state.network.id != 820 || !$store.state.web3"
  />
</div>
</template>


<script>
import Car from '@/store/car'
export default {
  
  mounted(){
    if(Car){
      this.$store.state.web3 = true
    }else{
      this.$store.state.web3 = false
    }
  },
  components: {
    'car-card': require('@/components/Shared/CarCard.vue').default,
    'error-overlay': require('@/components/Shared/ErrorOverlay.vue').default
  }
};
</script>


<template>
<div>
  <car-card
  v-for="car in $store.state.cars"
  :key="car.id"
  :car="car"
   />
</div>
</template>


<script>
export default {
  components: {
    'car-card': require('@/components/Shared/CarCard.vue').default,
  }
};
</script>
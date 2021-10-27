<template>
<div>   
   <v-card color="blue" width="300" class="float-sm-left ma-10"> 
   <v-btn text>BUY</v-btn>
   </v-card>
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
      'error-overlay': require('@/components/Shared/ErrorOverlay.vue').default,
    }
  }
</script>
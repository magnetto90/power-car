<template>
    <v-btn
        class="left"
        color="#20272F"
        @click="claim()"
    >
        <v-icon
            
            color="yellow rounded-circle"
            class="mr-4"
        >
            mdi-cash
        </v-icon>
        Claim: CLO {{amount}}
    </v-btn>
 
</template>

<script>
import Car from '@/store/car'
export default {
    data() {
      return {
        amount: 0
      }
    },
    Mounted(){
        Car.methods.getSalesBalance().call({from: this.$store.state.wallet.address}, (err, res) => {
          this.amount = res/(10**18)
          console.log(res)
        })
    },
    methods: {
      claim () {
        Car.methods.claimSalesBalance().send({from: this.$store.state.wallet.address})         
        .on('confirmation', function(){
            location.reload()
        })
        .on('error', function(error){
            this.$store.commit('showSnackbar', 'Car is not on sale ' + error);
        });
      }   
    }
}

</script>
<template>
    <v-btn
        class="left"
        color="#20272F"
        @click="claim()"
    >
        <v-icon
            
            color="yellow rounded-circle"
            class="mr-1"
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
    beforeMount(){
      web3.eth.requestAccounts().then(addresses => {
        Car.methods.getSalesBalance().call({from: addresses[0]}, (err, res) => {
          this.amount = res/(10**18)
        })
      })
    },
    methods: {
      claim () {
        Car.methods.claimSalesBalance().send({from: this.$store.state.wallet.address})         
        .then(value => {
          sessionStorage.setItem("lastTx", value.transactionHash) 
          location.reload()
        })
        .catch(err => {
          this.$store.commit('showSnackbar', err.message);
          });
      },
    }
}

</script>
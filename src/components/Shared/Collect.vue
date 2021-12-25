<template>
    <v-btn
        class="left pa-2"
        color="#20272F"
        @click="claim()"
    >
        <v-icon
            
            color="yellow rounded-circle"
            class="mr-1"
        >
            mdi-cash
        </v-icon>
        <span class="d-none d-md-flex" >Claim: </span> {{amount.toFixed(0)}} CLO
    </v-btn>
 
</template>

<script>
import Web3 from 'web3'
export default {
    data() {
      return {
        amount: 0
      }
    },
    beforeMount(){
      var web3 = new Web3(window.ethereum || Web3.givenProvider);
      web3.eth.requestAccounts().then(addresses => {
        this.$store.state.contract.methods.getSalesBalance().call({from: addresses[0]}, (err, res) => {
          this.amount = res/(10**18)
        })
      })
    },
    methods: {
      claim () {
        this.$store.state.contract.methods.claimSalesBalance().send({from: this.$store.state.wallet.address})         
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
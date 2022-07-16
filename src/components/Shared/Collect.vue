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
        <span class="d-none d-md-flex" ></span> {{amount.toFixed(0)}} CLO
    </v-btn>
 
</template>

<script>
import Web3 from 'web3'
const web3_read = new Web3("https://rpc.callisto.network/");
const web3_write = new Web3(window.ethereum || Web3.givenProvider)
export default {
    data() {
      return {
        amount: 0,
        contract_read:  new web3_read.eth.Contract(
          [
            this.$store.state.contract.getSalesBalanceABI, 
          ], 
            this.$store.state.contract.address
        ),
        contract_write:  new web3_write.eth.Contract(
        [
          this.$store.state.contract.claimSalesBalanceABI
          ], 
          this.$store.state.contract.address
      )
      }
    },
    beforeMount(){
      web3_write.eth.requestAccounts().then(addresses => {
        contract_read.methods.getSalesBalance().call({from: addresses[0]}, (err, res) => {
          this.amount = res/(10**18)
        })
      })
    },
    methods: {
      claim () {
        contract_write.methods.claimSalesBalance().send({from: this.$store.state.wallet.address})         
        .then(value => {
          sessionStorage.setItem("lastTx", value.transactionHash) 
          location.reload()
        })
        .catch(err => {
          console.log(err)
          this.$store.commit('showSnackbar', err.message);
          });
      },
    }
}

</script>
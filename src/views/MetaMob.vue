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
import Web3 from 'web3'
export default {
      data () {
      return {
        page: 1,
      }
    },
    mounted() {
        if (window.ethereum) {
            handleEthereum();
        } else {
            window.addEventListener('ethereum#initialized', handleEthereum, {
                once: true,
            });

            // If the event is not dispatched by the end of the timeout,
            // the user probably doesn't have MetaMask installed.
            setTimeout(handleEthereum, 3000); // 3 seconds
            }

            function handleEthereum() {
            const { ethereum } = window;
                if (ethereum && ethereum.isMetaMask) {
                    console.log('Ethereum successfully detected!');
                    // Access the decentralized web!
                } else {
                    console.log('Please install MetaMask!');
            }
        }
        console.log(Web3.givenProvider)
        var web3 = new Web3(Web3.givenProvider);
        //web3.eth.getChainId().then(id => {alert(id)});
       //web3.eth.requestAccounts().then(addresses => {alert(addresses[0])})

    },
    methods: {
    setCurrentPage(){
      sessionStorage.setItem("currentPage", this.page)
    }
    },
    components: {
        'car-card': require('@/components/Shared/CarCard.vue').default,
    }
}
</script>
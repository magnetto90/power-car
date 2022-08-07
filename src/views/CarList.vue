<template>
  <div>
    <div
      align="center"
    >
      <button class="nes-btn is-error"
        @click="sortByID"
      >Sort by ID</button>
      <button class="nes-btn is-error"
        @click="sortByPrice"
      >Sort by Price</button>
      <button class="nes-btn is-error"
        @click="sortByBonus"
      >Sort by Bonus</button>
      <button 
        :class="!$store.state.my_tokens ? 'nes-btn is-error' : 'nes-btn is-success'"
        @click="onlyMyTokens"
      >My Tokens</button>
      <div>
        <car-card
          v-for="car in $store.state.cars"
          :key="car.id"
          :car="car"
        />
      </div>
    </div>
  </div>
</template>


<script>
import Web3 from 'web3-eth'
const web3_read = new Web3("https://rpc.callisto.network/");

export default {
  data () {
    return {
      page: 1,
      random: [],
      ByID: true,
      ByPrice: false,
      ByBonus: false,
      contract_read:  new web3_read.Contract(
        [
          this.$store.state.contract.carBonusABI, 
          this.$store.state.contract.carStateABI,
          this.$store.state.contract.carSalesABI
        ], 
          this.$store.state.contract.address
      )
    }
  },
  beforeMount(){
    for(let i in this.$store.state.cars){ 
      this.contract_read.methods.carBonus(this.$store.state.cars[i].id).call((err, res) => {
        this.$store.state.cars[i].bonus = res
      })
      this.contract_read.methods.carState(this.$store.state.cars[i].id).call((err, res) => {
        if(res == 1){
          this.contract_read.methods.carSales(this.$store.state.cars[i].id).call((err, res) => {
            this.$store.state.cars[i].carPrice = parseInt(res.carPrice.slice(0, -18))
          })
        }else{
          this.$store.state.cars[i].carPrice = 0
        }
      })
    }
  },
  methods: {
    onlyMyTokens () {
      this.$store.state.my_tokens = !this.$store.state.my_tokens
    },
    sortByID () {
      if(this.ByID){
        this.$store.state.cars.sort((a, b) => a.id <= b.id ? 1 : -1);
        this.ByID = false
      }else{
        this.$store.state.cars.sort((a, b) => a.id >= b.id ? 1 : -1);
        this.ByID = true
      }
    },
    sortByPrice () {
      if(this.ByPrice){
        this.$store.state.cars.sort(function(a, b) {
          return (a.carPrice===0)-(b.carPrice===0) || +(a.carPrice>b.carPrice)||-(a.carPrice<b.carPrice);
        });
        this.ByPrice = false
      }else{
        this.$store.state.cars.sort(function(a, b) {
          return (a.carPrice===0)-(b.carPrice===0) || -(a.carPrice>b.carPrice)||+(a.carPrice<b.carPrice);
        });
        this.ByPrice = true
      }
    },
    sortByBonus () {
      if(this.ByBonus){
        this.$store.state.cars.sort((a, b) => a.bonus <= b.bonus ? 1 : -1);
        this.ByBonus = false
      }else{
        this.$store.state.cars.sort((a, b) => a.bonus >= b.bonus ? 1 : -1);
        this.ByBonus = true
      } 
      
    }
  },
  components: {
    'car-card': require('@/components/Shared/CarCard.vue').default,
  }
};
</script>

<style>
  .sort-btn{
    color: white;
    background-color: red !important;
    margin: 5px;
  }
</style>




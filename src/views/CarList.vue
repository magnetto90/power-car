<template>
  <div>
    <div
      align="center"
    >
      <v-btn class="ma-1 white--text"
        color="#cc0000"
        @click="sortByID"
      >Sort by ID</v-btn>
      <v-btn class="ma-1 white--text" 
        color="#cc0000"
        @click="sortByPrice"
      >Sort by Price</v-btn>
      <v-btn class="ma-1 white--text"
        color="#cc0000"
        @click="sortByBonus"
      >Sort by Bonus</v-btn>

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
    for(let i = 0; i <= 89; i++){    
      this.contract_read.methods.carBonus(i).call((err, res) => {
        this.$store.state.cars[i].bonus = res
      })
      this.contract_read.methods.carState(i).call((err, res) => {
        if(res == 1){
          this.contract_read.methods.carSales(i).call((err, res) => {
            this.$store.state.cars[i].carPrice = parseInt(res.carPrice.slice(0, -18))
          })
        }else{
          this.$store.state.cars[i].carPrice = 100**12
        }
      })
    }

    if(sessionStorage.getItem("currentPage")){
      this.page = parseInt(sessionStorage.getItem("currentPage"))
    }
  },
  methods: {
    setCurrentPage(){
      sessionStorage.setItem("currentPage", this.page)
      this.fisherYates(this.random)
    },
    fisherYates ( myArray ) {
      var i = myArray.length;
      if ( i == 0 ) return false;
      while ( --i ) {
        var j = Math.floor( Math.random() * ( i + 1 ) );
        var tempi = myArray[i];
        var tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
      }
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
        this.$store.state.cars.sort((a, b) => a.carPrice <= b.carPrice ? 1 : -1);
        this.ByPrice = false
      }else{
        this.$store.state.cars.sort((a, b) => a.carPrice >= b.carPrice ? 1 : -1);
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
    'error-overlay': require('@/components/Shared/ErrorOverlay.vue').default
  }
};
</script>




<template>
  <div>
    <v-card
        width="150px"
        height="155px"
        :class="background"
        :style="carState == 0 ? 'border: 3px solid green;' : 'border: 3px solid red;'"
    >
        <div align="center">   
            <v-btn 
                class="float-left mb-2" 
                shapped
                color="blue"
                width="100%"
                height="25px"
            >
                <v-spacer></v-spacer>
                    <span >CAR {{car.id}}</span>
                <v-spacer></v-spacer>
            </v-btn>
            <v-lazy
                v-model="isActive"
                :options="{
                threshold: .5
                }"
                transition="fade-transition"
            >
                <v-img 
                width="75%"
                :src="imagePath"
                :key="componentKey"
                @error="errorHandler()"
                ></v-img>
            </v-lazy>
            <p
              class="ma-0" 
            >
                <span :title="wins+'/'+total" v-if="total>0">Win Rate: <span :class="winRateColor()" >{{(wins*100/total).toFixed(0)}}%</span></span>
                <span v-if="bonus > 0" title="This number helps you win races!!"> Bonus: +{{bonus}}</span><br>
            </p>
        </div>
    </v-card>
</div>
</template>

<script>
import Web3 from 'web3'
export default {
    props: ['car'],
    data() {
      return {
        imagePath: '',
        carState: 0,
        amount: 0,
        absolute: true,
        sellOverlay: false,
        progressOverlay: false,
        bonus: 0,
        wins: 0,
        total: 0,
        isActive: false,
        componentKey: 0,
        time: 0,
        background: "",
      }
    },
    beforeMount(){
        var today = new Date();
        this.time = today.getHours();
        this.$store.state.contract.methods.tokenURI(this.car.id).call((err, res) => {
          this.imagePath = res
        })
        this.$store.state.rentContract.methods._getCarBonus(this.car.id).call((err, res) => {
          this.bonus = res
        })
        this.$store.state.rentContract.methods.carWinRate(this.car.id).call((err, res) => {
          this.wins = parseInt(res.wins)
          this.total = parseInt(res.total)
        })
        this.$store.state.rentContract.methods.carState(this.car.id).call((err, res) => {
          this.carState = res;
        })

        if(this.car.id == 81){
          this.background = 'float-left mx-9 my-5 stars'
        }else{
          if(this.time <= 7 ||this.time >= 19){
            this.background = 'float-left mx-9 my-5 night'
          }else{
            this.background = 'float-left mx-9 my-5 day'
          }
        
        }
    },
    methods: {
      errorHandler () {
        this.componentKey += 1;
      },
      winRateColor(){
         let winRate = this.wins*100/this.total
         if(winRate <= 100 && winRate > 66){
            return "green--text"
         }
         if(winRate <= 65 && winRate > 33){
            return "yellow--text"
         }
         if(winRate <= 33 && winRate >= 0){
            return "red--text"
         }
      }
    }
}

</script>

<style>
p {
  margin: 0;
  padding: 0;
}

.v-progress-circular {
  margin: 1rem;
}

.music-note{
 position: absolute;
 left: 0;
}

.night{
      background: url( '../../assets/night.png') no-repeat center center;
}

.day{
        background: url( '../../assets/day.png') no-repeat center center;
}

.stars{
        background: url( '../../assets/stars.gif') no-repeat center center;
}


</style>


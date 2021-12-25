<template>
  <v-app id="inspire">
    <v-app-bar
      app
      hide-on-scroll
      short
     >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(204,0,0,.5), rgba(0,0,0,.8)"
        ></v-img>
      </template>

      <v-btn
        v-if="$store.state.raceButton"
        class="ma-0"
        :to="'/race'"
        link
        color="#20272F"
      >
      race
      </v-btn>
      <v-btn
        v-if="$store.state.raceButton"
        class="ml-1"
        :to="'/rally-soy'"
        link
        color="#20272F"
      >
      rally
      </v-btn>
      <v-btn      
        v-else
        class="ma-0"
        :to="'/'"
        link
        color="#20272F"
      >
      home
      </v-btn>
      <v-spacer></v-spacer>
      <h1 class="myFont d-none d-md-block">Power-C.AR</h1>
      <v-spacer></v-spacer>
      

      <collect class="mx-1"/>
      <unlock-wallet
        v-if="!$store.state.wallet.unlocked"
       />
      <wallet
        v-else
      />
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar />
    </v-main>
     


  <v-footer app fixed padless color="black">
<v-btn class="d-none d-md-flex" icon href="https://twitter.com/PowercNFT" target="_blank">
        <v-icon>mdi-twitter</v-icon> 
      </v-btn>
      <v-btn class="d-none d-md-flex" icon href="https://explorer.callisto.network/address/0xE830AFDAe4Dba5b3b6c6b3506138C373Eb6CE73C/contracts" target="_blank">
        <v-icon>mdi-code-tags</v-icon> 
      </v-btn>
      <v-btn class="d-none d-md-flex" icon href="https://t.me/powercarNTF" target="_blank">
        <v-icon>mdi-send</v-icon> 
      </v-btn>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon>mdi-help-circle</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5">
          Whitepaper
        </v-card-title>

        <v-card-text>
          1. 100 Cars are going to be minted before 31/12/2021 <br>
          2. Race Rules: If you run a race and lose, you also lose your car. But if you win, you also win your oponent´s car.<br>
          3. Bonus: Increase the chances of wining a race. For example +5 gives a 10% more chances to win.<br>
          4. Collection Rules: If you are the first in completing a Collection (buy 4 cars) you will be given the Special car of that collection.<br>
          5. Fee, at the beginning, for selling a car is 5%, it will never be higher, it is written in the smart contract. It can only decrease.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Let's ride
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-spacer></v-spacer>
    <p class="d-none d-md-flex my-2">* Attention!, do not buy from a Ledger wallet. CAR NFTs are not supported.</p>
    <v-spacer></v-spacer>
      <v-btn
        class="mx-2 my-2 d-none d-md-flex"
        color="grey"
        outlined
        rounded
        small
        @click="$store.dispatch('addChain')"
      >
        Add Network
      </v-btn>

  </v-footer>
  </v-app>
  
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
    components: {
      'unlock-wallet': require('@/components/Shared/UnlockWallet.vue').default,
      'wallet': require('@/components/Shared/Wallet.vue').default,
      'snackbar': require('@/components/Shared/Snackbar.vue').default,
      'collect': require('@/components/Shared/Collect.vue').default
      },
      beforeMount(){
        this.$store.commit('getFeeRate');
      }
  }
</script>

<style>
.myFont {
  font-family: 'Press Start 2P', cursive;; 
}
</style>
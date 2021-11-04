<template>
  <v-app id="inspire">
    <v-app-bar
      app
     >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <collect />
      <v-spacer></v-spacer>
      <h1 class="myFont">PowerC</h1>
      <v-spacer></v-spacer>
      <v-btn icon href="https://twitter.com/PowercNFT" target="_blank">
        <v-icon>mdi-twitter</v-icon> 
      </v-btn>
      <v-btn icon href="https://explorer.callisto.network/address/0x5d2aE663E93956B8f51068Cb79EC58b6086dB21c/contracts" target="_blank">
        <v-icon>mdi-code-tags</v-icon> 
      </v-btn>

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
      <v-btn
    class="mx-2 mt-2"
    color="grey"
    outlined
    rounded
    small
    @click="$store.dispatch('addChain')"
  >
    Add Network
  </v-btn>
  </v-app>
  
</template>

<script>
  export default {
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
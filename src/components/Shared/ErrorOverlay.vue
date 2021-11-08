<template>
    <v-overlay
      absolute
      opacity="1"
    >
      <div v-if="!$store.state.web3">      
        <h1>
          Install Metamask to continue<v-img src="@/assets/MetaMask_Fox.svg" max-height="45px" max-width="45px"></v-img>
        </h1>
      </div>
      <div v-if="$store.state.network.id != 820 && $store.state.web3">      
        <h1>
          Connect to Callisto Network <v-img src="@/assets/CLO-transparent.png" max-height="47px" max-width="47px"></v-img>
        </h1>
        <p>*or Unlock your Wallet.</p>
      </div>
    </v-overlay>
</template>


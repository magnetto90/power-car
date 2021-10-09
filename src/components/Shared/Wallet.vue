<template>
    <v-btn
        class="mx-1 rigth"
        color="#20272F"
    >
        {{$store.state.wallet.short}}   
    </v-btn>
  
</template>

<script>
export default {
    mounted() {
        window.ethereum.on('accountsChanged',() => {
            this.$store.dispatch('getAddress');
            this.$store.commit('showSnackbar', 'Atencion, se cambio de Wallet!');
        })
        window.ethereum.on('chainChanged', () => {
            this.$store.dispatch('getNetworkId');
            this.$store.commit('showSnackbar', 'Atencion, se cambio de Red!');
            location.reload()
        });
    }
}
</script>
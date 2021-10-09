<template>
    <v-btn
        @click="unlockWallet"
        class="mx-1 rigth"
        color="#20272F"
        
    >
        Unlock Wallet
    </v-btn>
</template>

<script>
export default {
    mounted(){
        if(sessionStorage.getItem("isLogged")){
            this.unlockWallet();
        }
        window.ethereum.on('chainChanged', () => {
            this.$store.dispatch('getNetworkId');
            this.$store.commit('showSnackbar', 'Atencion, se cambio de Red!');
            location.reload()
        });
    },
    methods: 
    {
        unlockWallet (){  
            this.$store.dispatch('getAddress')
            this.$store.dispatch('getNetworkId')        
        }
    }
}
</script>

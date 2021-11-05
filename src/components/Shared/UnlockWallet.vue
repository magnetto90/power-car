<template>
    <v-btn
        @click="unlockWallet"
        class="rigth"
        color="#20272F"
        
    >
        <v-icon
            
            color="yellow rounded-circle"
            class="mr-1"
        >
            mdi-key-variant
        </v-icon> Unlock Wallet
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

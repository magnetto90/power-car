<template>
    <button
        @click="unlockWallet()"
        class="nes-btn is-error"        
    >
        <v-icon
            color="yellow rounded-circle"
            class="mr-1"
        >
            mdi-key-variant
        </v-icon> START
    </button>
</template>

<script>
export default {
    mounted(){
        if(sessionStorage.getItem("isLogged")){
            this.unlockWallet();
        }
        window.ethereum.on('chainChanged', () => {
            this.$store.dispatch('getNetworkId');
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

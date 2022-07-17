<template>

    <v-btn
        class="rigth  pa-2"
        color="#20272F"
    >
        <v-icon
            color="yellow rounded-circle"
            class="mr-1"
        >
            mdi-key-variant
        </v-icon>
        {{$store.state.wallet.short}}
    </v-btn>
 
</template>

<script>
export default {
    mounted() {
        window.ethereum.on('accountsChanged',() => {
            this.$store.dispatch('getAddress');
        })
    }
}
</script>
<template>

    <button
        class="nes-btn is-error"
    >
        <v-icon
            color="yellow rounded-circle"
            class="mr-1"
        >
            mdi-key-variant
        </v-icon>
        {{$store.state.wallet.short}}
    </button>
 
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
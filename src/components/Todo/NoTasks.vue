<template>
    <div
      class="noTask"
    >
      <v-icon
        size=150
      >
        mdi-check-circle-outline
      </v-icon>
      <div
      class="text-h5 white--text"
      > 
      Nothing to do!! 
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="sass">
  .noTask
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    opacity: 0.5
</style>
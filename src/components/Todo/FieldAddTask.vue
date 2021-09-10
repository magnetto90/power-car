<template>
    <v-text-field
        v-model="newTaskTitle"
        @click:append="addTask()"
        @keyup.enter="addTask()"
        class="pa-3"
        outlined
        label="New Task"
        append-icon="mdi-plus"
        hide-details
        clearable
    ></v-text-field>
</template>

<script>
export default {
    data() {
      return {
        newTaskTitle: "", 
        tasks: []
      }
    },
    methods: {
      addTask() {
        this.$store.dispatch('addTask', this.newTaskTitle)
        this.newTaskTitle = ""
      }
    }
}
</script>

<style>

</style>
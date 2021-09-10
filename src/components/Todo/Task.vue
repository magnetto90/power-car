<template>
    <div>
    <v-list-item
        @click="$store.commit('doneTask', task.id)"
    >
        <template v-slot:default>
        <v-list-item-action>
            <v-checkbox :input-value="task.done"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title>{{ task.title}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
            <v-btn 
            @click.stop="$store.dispatch('deleteTask', task.id)"               
            icon
            >
            <v-icon color="red lighten-1">mdi-trash-can-outline</v-icon>
            </v-btn>
        </v-list-item-action>            
        </template>
    </v-list-item>
    <v-divider></v-divider>
    </div>
</template>

<script>
export default {
    props: ['task']
}
</script>

<style>

</style>
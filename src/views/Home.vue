<template>
  <div class="home">
    <field-add-task />
    <list-task 
      v-if="$store.state.tasks.length"
    />
    <no-tasks
      v-else
    /> 

  </div>   
</template>

<script>
  export default {
    name: 'Home',
    components: {
      'field-add-task': require('@/components/Todo/FieldAddTask.vue').default,
      'list-task': require('@/components/Todo/ListTask.vue').default,
      'no-tasks': require('@/components/Todo/NoTasks.vue').default
        
    }
  }
</script>


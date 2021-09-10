import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: 'foo',
        done: false
      },
    ],
    snackbar: {
      show: false,
      text: "Hello there..."
    }
  },
  mutations: {
    addTask(state, newTaskTitle){
      let newTask = {
        id: Date.now(),
        title: newTaskTitle,
        done: false
      }
      state.tasks.push(newTask)
    },
    doneTask(state, id){
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id){
      state.tasks = state.tasks.filter(task => task.id !== id)
    }, 
    showSnackbar(state, text) {
      state.snackbar.show = true;
      state.snackbar.text = text;
    }
  },
  actions: {
    addTask({commit}, newTaskTitle) {
      commit('addTask', newTaskTitle)
      commit('showSnackbar', 'Task Added!')
    },
    deleteTask({commit}, id) {
      commit('deleteTask', id)
      commit('showSnackbar', 'Task Deleted!')
    }
  },
  modules: {
  }
})

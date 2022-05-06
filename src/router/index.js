import Vue from 'vue'
import VueRouter from 'vue-router'
import CarList from '../views/CarList.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Race from '../views/Race.vue'
import RallySoy from '../views/RallySoy.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Car List',
    component: CarList
  },  
  
  {
    path: '/race',
    name: 'Race',
    component: Race
  },

  {
    path: '/rally-soy',
    name: 'Rally Soy',
    component: RallySoy
  },

  {
    path: '/*',
    name: '404',
    component: PageNotFound
  },


]

const router = new VueRouter({
  routes
})

export default router

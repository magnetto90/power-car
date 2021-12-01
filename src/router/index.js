import Vue from 'vue'
import VueRouter from 'vue-router'
import CarList from '../views/CarList.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Auction from '../views/Auction.vue'
import Race from '../views/Race.vue'
import RaceOld from '../views/RaceForCLO.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Car List',
    component: CarList
  },  
  {
    path: '/auction',
    name: 'Auction',
    component: Auction
  },  
  {
    path: '/race',
    name: 'Race',
    component: Race
  },
  {
    path: '/raceOld',
    name: 'RaceOld',
    component: RaceOld
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

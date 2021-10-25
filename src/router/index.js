import Vue from 'vue'
import VueRouter from 'vue-router'
import Market from '../views/CarList.vue'
import PowerPlant from '../views/PowerPlant.vue'
import WhitePaper from '../views/WhitePaper.vue'
import PageNotFound from '../views/PageNotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'WhitePaper',
    component: WhitePaper
  },
  {
    path: '/car-list',
    name: 'Car List',
    component: Market
  },
  {
    path: '/power-plant',
    name: 'PowerPlant',
    component: PowerPlant
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

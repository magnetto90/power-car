<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title" >
            <p class="myFont ma-0">Power Cars</p>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>


      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
              <template v-slot:append>
        <div class="pa-2">
            <v-btn
              class="mx-2 mt-2"
              width="95%"
              color="grey"
              outlined
              rounded
              small
              @click="$store.dispatch('addChain')"
            >
              Agregar Red
            </v-btn>
            <v-btn
              class="mx-2 mt-2"
              width="95%"
              color="grey"
              outlined
              rounded
              small
              @click="$store.dispatch('addToken')"
            >
              Configurar Token
            </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      app
     >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <collect />
      <v-spacer></v-spacer>
      <unlock-wallet
        v-if="!$store.state.wallet.unlocked"
       />
      <wallet
        v-else
      />
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
      items: [
        { title: 'White Paper', icon: 'mdi-file-outline', to: '/' },
        { title: 'Car List', icon: 'mdi-car', to: '/car-list' },
        { title: 'Power Plant', icon: 'mdi-wind-turbine', to: '/power-plant' },
      ],
    }),
    components: {
      'unlock-wallet': require('@/components/Shared/UnlockWallet.vue').default,
      'wallet': require('@/components/Shared/Wallet.vue').default,
      'snackbar': require('@/components/Shared/Snackbar.vue').default,
      'collect': require('@/components/Shared/Collect.vue').default
    }
  }
</script>

<style>
.myFont {
  font-family: 'Press Start 2P', cursive;; 
}
</style>
import Vue from 'vue'
import Vuex from 'vuex'
import Power from './power'
import Car from './car'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    web3: false,
    wallet: {
      address: '',
      short: '',
      unlocked: false
    },
    network: {
      id: null
    },
    snackbar: {
      show: false,
      text: ''
    },
    cars: [
      {id: 0},
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5},
      {id: 6},
      {id: 7}
    ]
  },
  mutations: {
    setNetworkId (state, id){
      state.network.id = id;
    },
    //Captura el address de Metamask y lo muestra en donde estaba el boton UnlockWallet
    showAddress (state, address){
      state.wallet.address = address;
      state.wallet.short = address.substring(0, 4)+"..."+address.substring(address.length -4, address.length);
      state.wallet.unlocked = true;
      sessionStorage.setItem("isLogged", true)
    },
    showSnackbar(state, text) {
      let timeout = 0
      if (state.snackbar.show) {
        state.snackbar.show = false
        timeout = 300
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
    },
    hideSnackbar(state) {
      state.snackbar.show = false
    },
  },
  actions: {    
    getNetworkId (){
      web3.eth.getChainId().then(id => {
        this.commit("setNetworkId",id)
      });
    },
    getAddress(){
      web3.eth.requestAccounts().then(addresses => {
        this.commit("showAddress",addresses[0])
      })
    },
    async addChain(){
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x334' }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{ 
                chainId: '0x334', 
                chainName: 'Callisto',
                nativeCurrency: {
                  name: 'Callisto',
                  symbol: 'CLO',
                  decimals: 18,
                },
                rpcUrls: ['https://clo-geth.0xinfra.com/'],
                blockExplorerUrls: ['https://explorer.callisto.network/']

              }],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
    },
    async addToken (){
      ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0xE2E4Cf144F4365AAa023da04918A64072C284201',
            symbol: 'POWER',
            decimals: 2
          },
        },
      })
      .then((success) => {
        if (success) {
          console.log('POWER successfully added to wallet!')
        } else {
          throw new Error('Something went wrong.')
        }
      })
      .catch(console.error)
    }
  }
})

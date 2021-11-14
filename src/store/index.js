import Vue from 'vue'
import Vuex from 'vuex'
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
    feeRate: 0,
    cars1: [
      {id: "000"},
      {id: "001"},
      {id: "002"},
      {id: "003"},
      {id: "004"},
      {id: "005"},
      {id: "006"},
      {id: "007"},
      {id: "008"},
      {id: "009"},
    ],
    cars2: [
      {id: "010"},
      {id: "011"},
      {id: "012"},
      {id: "013"},
      {id: "014"},
      {id: "015"},
      {id: "016"},
      {id: "017"},
      {id: "018"},
      {id: "019"},
    ],
    cars3: [
      {id: "020"},
      {id: "021"},
      {id: "022"},
      {id: "023"},
      {id: "024"},
      {id: "025"},
      {id: "026"},
      {id: "027"},
      {id: "028"},
      {id: "029"},
    ],
    cars4: [
      {id: "030"},
      {id: "031"},
      {id: "032"},
      {id: "033"},
      {id: "034"},
      {id: "035"},
      {id: "036"},
      {id: "037"},
      {id: "038"},
      {id: "039"},
    ],
    cars5: [
      {id: "040"},
      {id: "041"},
      {id: "042"},
      {id: "043"},
      {id: "044"},
      {id: "045"},
      {id: "046"},
      {id: "047"},
      {id: "048"},
      {id: "049"}
    ],
    cars6: [
      {id: "050"},
      {id: "051"},
      {id: "052"},
      {id: "053"},
      {id: "054"},
      {id: "055"},
      {id: "056"},
      {id: "057"},
      {id: "058"},
      {id: "059"}
    ],
    cars7: [
      {id: "060"},
      {id: "061"},
      {id: "062"},
      {id: "063"},
      {id: "064"},
      {id: "065"},
      {id: "066"},
      {id: "067"},
      {id: "068"},
      {id: "069"}
    ],
    carsOwned: [],
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
        timeout = 3000
      }
      setTimeout(() => {
        state.snackbar.show = true
        state.snackbar.text = text
      }, timeout)
    },
    hideSnackbar(state) {
      state.snackbar.show = false
    },
    getFeeRate (state) {
      Car.methods.feeRate().call((err, res) => {
        if(res > 0){
          state.feeRate = 100/res
        }

      })
    }

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
    }
  }
})

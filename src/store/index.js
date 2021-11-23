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
    cars: [
      {id: "000", name: ""},
      {id: "001", name: ""},
      {id: "002", name: ""},
      {id: "003", name: ""},
      {id: "004", name: ""},
      {id: "005", name: ""},
      {id: "006", name: ""},
      {id: "007", name: ""},
      {id: "008", name: "Flaco"},
      {id: "009", name: ""},
      {id: "010", name: ""},
      {id: "011", name: ""},
      {id: "012", name: "Plastic Car"},
      {id: "013", name: ""},
      {id: "014", name: ""},
      {id: "015", name: ""},
      {id: "016", name: ""},
      {id: "017", name: ""},
      {id: "018", name: ""},
      {id: "019", name: ""},
      {id: "020", name: ""},
      {id: "021", name: "CLOE Williams"},
      {id: "022", name: ""},
      {id: "023", name: ""},
      {id: "024", name: ""},
      {id: "025", name: ""},
      {id: "026", name: ""},
      {id: "027", name: "Woody"},
      {id: "028", name: ""},
      {id: "029", name: ""},
      {id: "030", name: ""},
      {id: "031", name: ""},
      {id: "032", name: ""},
      {id: "033", name: ""},
      {id: "034", name: ""},
      {id: "035", name: ""},
      {id: "036", name: ""},
      {id: "037", name: ""},
      {id: "038", name: ""},
      {id: "039", name: ""},
      {id: "040", name: ""},
      {id: "041", name: ""},
      {id: "042", name: ""},
      {id: "043", name: "Fake Taxi"},
      {id: "044", name: ""},
      {id: "045", name: ""},
      {id: "046", name: ""},
      {id: "047", name: ""},
      {id: "048", name: ""},
      {id: "049", name: ""},
      {id: "050", name: ""},
      {id: "051", name: ""},
      {id: "052", name: ""},
      {id: "053", name: ""},
      {id: "054", name: ""},
      {id: "055", name: "Thunder"},
      {id: "056", name: "One more car"},
      {id: "057", name: "Notorius car"},
      {id: "058", name: "Nevermint"},
      {id: "059", name: "One CLOVE"},
      {id: "060", name: ""},
      {id: "061", name: ""},
      {id: "062", name: ""},
      {id: "063", name: ""},
      {id: "064", name: ""},
      {id: "065", name: ""},
      {id: "066", name: ""},
      {id: "067", name: ""},
      {id: "068", name: ""},
      {id: "069", name: ""},
      {id: "070", name: ""},
      {id: "071", name: ""},
      {id: "072", name: ""},
      {id: "073", name: ""},
      {id: "074", name: ""},
      {id: "075", name: ""},
      {id: "076", name: ""},
      {id: "077", name: ""},
      {id: "078", name: "Total Eclipse"},
      {id: "079", name: ""},
      {id: "080", name: ""},
      {id: "081", name: ""},
      {id: "082", name: ""},
      {id: "083", name: ""},
      {id: "084", name: ""},
      {id: "085", name: ""},
      {id: "086", name: ""},
      {id: "087", name: ""},
      {id: "088", name: ""},
      {id: "089", name: ""},
      {id: "090", name: ""},
      {id: "091", name: ""},
      {id: "092", name: ""},
      {id: "093", name: ""},
      {id: "094", name: ""},
      {id: "095", name: ""},
      {id: "096", name: ""},
      {id: "097", name: ""},
      {id: "098", name: ""},
      {id: "099", name: ""}
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

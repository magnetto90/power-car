import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contract: {
        address: "0xE830AFDAe4Dba5b3b6c6b3506138C373Eb6CE73C",
        buyCarABI: {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "buyCar",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        createCarSaleABI: {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "carPrice",
                    "type": "uint256"
                }
            ],
            "name": "createCarSale",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        claimSalesBalanceABI: {
            "inputs": [],
            "name": "claimSalesBalance",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        endSaleABI: {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "endSale",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        transferFromABI: {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        carBonusABI: {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "carBonus",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        carSalesABI: {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "carSales",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "carOwner",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "carPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amountPaid",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        carStateABI: {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "carState",
            "outputs": [
                {
                    "internalType": "enum CAR.State",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        feeRateABI: {
            "inputs": [],
            "name": "feeRate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        getSalesBalanceABI: {
            "inputs": [],
            "name": "getSalesBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        ownerOfABI: {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        salesBalanceABI: {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "salesBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        tokenURIABI: {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    },
    wallet: {
      address: '',
      short: '',
      unlocked: false
    },
    network_id: null,
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
      {id: "080", name: "Coatl"},
      {id: "081", name: "Power Bot"},
      {id: "082", name: "YAGUARETÉ"},
      {id: "083", name: ""},
      {id: "084", name: "Trusty Car"},
      {id: "085", name: ""},
      {id: "086", name: ""},
      {id: "087", name: ""},
      {id: "088", name: ""},
      {id: "089", name: ""},
      /*{id: "090", name: ""},
      {id: "091", name: ""},
      {id: "092", name: ""},
      {id: "093", name: ""},
      {id: "094", name: ""},
      {id: "095", name: ""},
      {id: "096", name: ""},
      {id: "097", name: ""},
      {id: "098", name: ""},
      {id: "099", name: ""}
      {id: "404", name: "Car not found"}*/
    ]
  },
  mutations: {
    setNetworkId (state, id){
      state.network_id = id;
    },
    //Captura el address de Metamask y lo muestra en donde estaba el boton UnlockWallet
    showAddress (state, address){
      state.wallet.address = address;
      state.wallet.short = address.substring(0, 3)+"..."+address.substring(address.length -4, address.length);
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
        let web3_read = new Web3("https://rpc.callisto.network/");
        let contract_read =  new web3_read.eth.Contract(
            [
              state.contract.feeRateABI, 
            ], 
              state.contract.address
          )
        contract_read.methods.feeRate().call((err, res) => {
        if(res > 0){
          state.feeRate = 100/res
        }
      })
    },
  },
  actions: { 
    async getNetworkId (){
        var web3 = new Web3(window.ethereum || Web3.givenProvider);
        let id = await web3.eth.getChainId()
        this.commit("setNetworkId",id)
    },
    getAddress(){
        var web3 = new Web3(window.ethereum || Web3.givenProvider);
        web3.eth.requestAccounts().then(addresses => {
        this.commit("showAddress",addresses[0])
      })
    },
    async switchChain(){
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
                rpcUrls: ['https://rpc.callisto.network/'],
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
    getProvider(){
        if (window.ethereum) {
          } else {
            window.addEventListener('ethereum#initialized', () => {
            }, {
              once: true,
            });
  
            // If the event is not dispatched by the end of the timeout,
            // the user probably doesn't have MetaMask installed.
            setTimeout(handleEthereum, 3000); // 3 seconds
          }
  
          function handleEthereum() {
            const { ethereum } = window;
            if (ethereum) {
              console.log('Ethereum successfully detected!');
              // Access the decentralized web!
            } else {
              alert('Please install MetaMask!');
            }
          }
    }
  }
})

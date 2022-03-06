import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contract: '',
    raceContract: '',
    rallyContract: '',
    rentContract: '',
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
      {id: "404", name: "Car not found"}*/,
    ],
    raceCars: [
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
      {id: "083", name: "Bulls"},
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
      {id: "099", name: ""}*/
      {id: "404", name: "Car not found"},
    ],
    carsOwned: [],
    raceButton: true,
  },
  mutations: {
    setNetworkId (state, id){
      state.network.id = id;
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
      state.contract.methods.feeRate().call((err, res) => {
        if(res > 0){
          state.feeRate = 100/res
        }

      })
    },
    loadContract(state){
        var web3 = new Web3(window.ethereum || Web3.givenProvider);
         var contract = new web3.eth.Contract(
             [
                 {
                     "anonymous": false,
                     "inputs": [
                         {
                             "indexed": true,
                             "internalType": "address",
                             "name": "owner",
                             "type": "address"
                         },
                         {
                             "indexed": true,
                             "internalType": "address",
                             "name": "approved",
                             "type": "address"
                         },
                         {
                             "indexed": true,
                             "internalType": "uint256",
                             "name": "tokenId",
                             "type": "uint256"
                         }
                     ],
                     "name": "Approval",
                     "type": "event"
                 },
                 {
                     "anonymous": false,
                     "inputs": [
                         {
                             "indexed": true,
                             "internalType": "address",
                             "name": "owner",
                             "type": "address"
                         },
                         {
                             "indexed": true,
                             "internalType": "address",
                             "name": "operator",
                             "type": "address"
                         },
                         {
                             "indexed": false,
                             "internalType": "bool",
                             "name": "approved",
                             "type": "bool"
                         }
                     ],
                     "name": "ApprovalForAll",
                     "type": "event"
                 },
                 {
                     "anonymous": false,
                     "inputs": [
                         {
                             "indexed": true,
                             "internalType": "address",
                             "name": "previousOwner",
                             "type": "address"
                         },
                         {
                             "indexed": true,
                             "internalType": "address",
                             "name": "newOwner",
                             "type": "address"
                         }
                     ],
                     "name": "OwnershipTransferred",
                     "type": "event"
                 },
                 {
                     "anonymous": false,
                     "inputs": [
                         {
                             "indexed": false,
                             "internalType": "address",
                             "name": "winner",
                             "type": "address"
                         }
                     ],
                     "name": "RaceWinner",
                     "type": "event"
                 },
                 {
                     "anonymous": false,
                     "inputs": [
                         {
                             "indexed": true,
                             "internalType": "address",
                             "name": "payer",
                             "type": "address"
                         },
                         {
                             "indexed": false,
                             "internalType": "uint256",
                             "name": "tokenId",
                             "type": "uint256"
                         },
                         {
                             "indexed": false,
                             "internalType": "uint256",
                             "name": "amount",
                             "type": "uint256"
                         }
                     ],
                     "name": "Received",
                     "type": "event"
                 },
                 {
                     "anonymous": false,
                     "inputs": [
                         {
                             "indexed": true,
                             "internalType": "address",
                             "name": "carOwner",
                             "type": "address"
                         },
                         {
                             "indexed": false,
                             "internalType": "uint256",
                             "name": "tokenId",
                             "type": "uint256"
                         }
                     ],
                     "name": "SaleEnded",
                     "type": "event"
                 },
                 {
                     "anonymous": false,
                     "inputs": [
                         {
                             "indexed": true,
                             "internalType": "address",
                             "name": "payee",
                             "type": "address"
                         },
                         {
                             "indexed": false,
                             "internalType": "uint256",
                             "name": "amount",
                             "type": "uint256"
                         }
                     ],
                     "name": "Sent",
                     "type": "event"
                 },
                 {
                     "anonymous": false,
                     "inputs": [
                         {
                             "indexed": true,
                             "internalType": "address",
                             "name": "from",
                             "type": "address"
                         },
                         {
                             "indexed": true,
                             "internalType": "address",
                             "name": "to",
                             "type": "address"
                         },
                         {
                             "indexed": true,
                             "internalType": "uint256",
                             "name": "tokenId",
                             "type": "uint256"
                         }
                     ],
                     "name": "Transfer",
                     "type": "event"
                 },
                 {
                     "inputs": [
                         {
                             "internalType": "uint256",
                             "name": "challenger",
                             "type": "uint256"
                         },
                         {
                             "internalType": "uint256",
                             "name": "tokenId",
                             "type": "uint256"
                         }
                     ],
                     "name": "acceptDragRace",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
                     "inputs": [
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
                     "name": "approve",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
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
                 {
                     "inputs": [
                         {
                             "internalType": "uint256",
                             "name": "tokenId",
                             "type": "uint256"
                         }
                     ],
                     "name": "cancelDragRace",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
                     "inputs": [
                         {
                             "internalType": "uint256",
                             "name": "newId",
                             "type": "uint256"
                         },
                         {
                             "internalType": "string",
                             "name": "_tokenURI",
                             "type": "string"
                         },
                         {
                             "internalType": "uint256",
                             "name": "_carBonus",
                             "type": "uint256"
                         }
                     ],
                     "name": "carFactory",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
                     "inputs": [],
                     "name": "claimSalesBalance",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
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
                 {
                     "inputs": [
                         {
                             "internalType": "uint256",
                             "name": "tokenId",
                             "type": "uint256"
                         }
                     ],
                     "name": "createDragRace",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
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
                 {
                     "inputs": [],
                     "name": "getCallistos",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
                     "inputs": [],
                     "name": "renounceOwnership",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
                     "inputs": [
                         {
                             "internalType": "address",
                             "name": "_token",
                             "type": "address"
                         },
                         {
                             "internalType": "uint256",
                             "name": "_amount",
                             "type": "uint256"
                         }
                     ],
                     "name": "rescueERC20",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
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
                     "name": "safeTransferFrom",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
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
                         },
                         {
                             "internalType": "bytes",
                             "name": "_data",
                             "type": "bytes"
                         }
                     ],
                     "name": "safeTransferFrom",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
                     "inputs": [
                         {
                             "internalType": "address",
                             "name": "operator",
                             "type": "address"
                         },
                         {
                             "internalType": "bool",
                             "name": "approved",
                             "type": "bool"
                         }
                     ],
                     "name": "setApprovalForAll",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
                     "inputs": [
                         {
                             "internalType": "string",
                             "name": "newBaseURI",
                             "type": "string"
                         }
                     ],
                     "name": "setBaseURI",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
                     "inputs": [
                         {
                             "internalType": "uint256",
                             "name": "_newRate",
                             "type": "uint256"
                         }
                     ],
                     "name": "setFeeRate",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
                     "inputs": [
                         {
                             "internalType": "address payable",
                             "name": "_withdrawalWallet",
                             "type": "address"
                         }
                     ],
                     "name": "setwithdrawalWallet",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
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
                 {
                     "inputs": [
                         {
                             "internalType": "address",
                             "name": "newOwner",
                             "type": "address"
                         }
                     ],
                     "name": "transferOwnership",
                     "outputs": [],
                     "stateMutability": "nonpayable",
                     "type": "function"
                 },
                 {
                     "inputs": [],
                     "stateMutability": "nonpayable",
                     "type": "constructor"
                 },
                 {
                     "inputs": [
                         {
                             "internalType": "address",
                             "name": "owner",
                             "type": "address"
                         }
                     ],
                     "name": "balanceOf",
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
                 {
                     "inputs": [],
                     "name": "baseURI_",
                     "outputs": [
                         {
                             "internalType": "string",
                             "name": "",
                             "type": "string"
                         }
                     ],
                     "stateMutability": "view",
                     "type": "function"
                 },
                 {
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
                 {
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
                 {
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
                 {
                     "inputs": [
                         {
                             "internalType": "uint256",
                             "name": "",
                             "type": "uint256"
                         }
                     ],
                     "name": "carWinRate",
                     "outputs": [
                         {
                             "internalType": "uint256",
                             "name": "total",
                             "type": "uint256"
                         },
                         {
                             "internalType": "uint256",
                             "name": "wins",
                             "type": "uint256"
                         }
                     ],
                     "stateMutability": "view",
                     "type": "function"
                 },
                 {
                     "inputs": [
                         {
                             "internalType": "uint256",
                             "name": "",
                             "type": "uint256"
                         }
                     ],
                     "name": "dragRaces",
                     "outputs": [
                         {
                             "internalType": "uint256",
                             "name": "carOne",
                             "type": "uint256"
                         },
                         {
                             "internalType": "address",
                             "name": "pilotOne",
                             "type": "address"
                         },
                         {
                             "internalType": "uint256",
                             "name": "carTwo",
                             "type": "uint256"
                         },
                         {
                             "internalType": "address",
                             "name": "pilotTwo",
                             "type": "address"
                         }
                     ],
                     "stateMutability": "view",
                     "type": "function"
                 },
                 {
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
                 {
                     "inputs": [],
                     "name": "feesBalance",
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
                 {
                     "inputs": [
                         {
                             "internalType": "uint256",
                             "name": "tokenId",
                             "type": "uint256"
                         }
                     ],
                     "name": "getApproved",
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
                 {
                     "inputs": [],
                     "name": "getBalance",
                     "outputs": [
                         {
                             "internalType": "uint256",
                             "name": "contractBalance",
                             "type": "uint256"
                         }
                     ],
                     "stateMutability": "view",
                     "type": "function"
                 },
                 {
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
                 {
                     "inputs": [
                         {
                             "internalType": "address",
                             "name": "owner",
                             "type": "address"
                         },
                         {
                             "internalType": "address",
                             "name": "operator",
                             "type": "address"
                         }
                     ],
                     "name": "isApprovedForAll",
                     "outputs": [
                         {
                             "internalType": "bool",
                             "name": "",
                             "type": "bool"
                         }
                     ],
                     "stateMutability": "view",
                     "type": "function"
                 },
                 {
                     "inputs": [],
                     "name": "name",
                     "outputs": [
                         {
                             "internalType": "string",
                             "name": "",
                             "type": "string"
                         }
                     ],
                     "stateMutability": "view",
                     "type": "function"
                 },
                 {
                     "inputs": [],
                     "name": "owner",
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
                 {
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
                 {
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
                 {
                     "inputs": [
                         {
                             "internalType": "bytes4",
                             "name": "interfaceId",
                             "type": "bytes4"
                         }
                     ],
                     "name": "supportsInterface",
                     "outputs": [
                         {
                             "internalType": "bool",
                             "name": "",
                             "type": "bool"
                         }
                     ],
                     "stateMutability": "view",
                     "type": "function"
                 },
                 {
                     "inputs": [],
                     "name": "symbol",
                     "outputs": [
                         {
                             "internalType": "string",
                             "name": "",
                             "type": "string"
                         }
                     ],
                     "stateMutability": "view",
                     "type": "function"
                 },
                 {
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
             ],
             "0xE830AFDAe4Dba5b3b6c6b3506138C373Eb6CE73C"
         );
   
         state.contract = contract;
    },
    loadRaceContract(state){
    var web3 = new Web3(window.ethereum || Web3.givenProvider);
    var contract = new web3.eth.Contract(
        [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "carTwo",
                        "type": "uint256"
                    }
                ],
                "name": "acceptDragRace",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    }
                ],
                "name": "cancelDragRace",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "claimRaceBalance",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    }
                ],
                "name": "createDragRace",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getCallistos",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_address",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "winner",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timeOne",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timeTwo",
                        "type": "uint256"
                    }
                ],
                "name": "RaceWinner",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "payee",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Sent",
                "type": "event"
            },
            {
                "stateMutability": "payable",
                "type": "receive"
            },
            {
                "inputs": [],
                "name": "car_address",
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
            {
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
                        "internalType": "enum RaceForCLO.State",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "carWinRate",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "total",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wins",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "dragRaces",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "pilotOne",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "carTwo",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "pilotTwo",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "raceBalance",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "feesBalance",
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
            {
                "inputs": [],
                "name": "getBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "contractBalance",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "leaderBoard",
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
            {
                "inputs": [],
                "name": "owner",
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
            {
                "inputs": [],
                "name": "raceFee",
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
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "racerBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
            "0xEF852c8cA576148b81ed54F0C6e8882feCb7db68"
        );

        state.raceContract = contract;
    },
    loadRallyContract(state){
        var web3 = new Web3(window.ethereum || Web3.givenProvider);
        var contract = new web3.eth.Contract(
        [
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "name_",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol_",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_defaultFee",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_CARaddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_tokenImage",
                        "type": "string"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "winner",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timeOne",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timeTwo",
                        "type": "uint256"
                    }
                ],
                "name": "RaceWinner",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "carOnePoints",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "carTwo",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "carTwoPoints",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "carThree",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "carThreePoints",
                        "type": "uint256"
                    }
                ],
                "name": "SeasonWinners",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "payee",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Sent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "name": "TransferData",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "_getCarBonus",
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
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_season",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "_getSeasonPoints",
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
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "carTwo",
                        "type": "uint256"
                    }
                ],
                "name": "acceptRally",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
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
            {
                "inputs": [],
                "name": "bidLock",
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
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "bidOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address payable",
                        "name": "bidder",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "bonusMultiplier",
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
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    }
                ],
                "name": "cancelRally",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
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
                        "internalType": "enum RallySoy.State",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "car_address",
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
            {
                "inputs": [],
                "name": "claimRaceBalance",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    }
                ],
                "name": "createRally",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "end",
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
            {
                "inputs": [],
                "name": "endSeason",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint32",
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "name": "feeLevels",
                "outputs": [
                    {
                        "internalType": "address payable",
                        "name": "feeReceiver",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "feePercentage",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getTokenImage",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
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
            {
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
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "priceOf",
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
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "racerBalance",
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
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "rallies",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "carTwo",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "raceBalance",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "rallyTotalEarnings",
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
            {
                "inputs": [],
                "name": "season",
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
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "seasonHistory",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "first",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "second",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "third",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "seasonBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "seasonStarted",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "seasonTicketShare",
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
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_amountInWEI",
                        "type": "uint256"
                    }
                ],
                "name": "setBid",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_bonusMultiplier",
                        "type": "uint256"
                    }
                ],
                "name": "setBonusMultiplier",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_address",
                        "type": "address"
                    }
                ],
                "name": "setFeeReceiver",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_amountInWEI",
                        "type": "uint256"
                    }
                ],
                "name": "setPrice",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "silentTransfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "standard",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_amoutInWEI",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_share",
                        "type": "uint256"
                    }
                ],
                "name": "startSeason",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "ticketBalance",
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
            {
                "inputs": [],
                "name": "ticketPrice",
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
            {
                "inputs": [],
                "name": "tokenImage",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "_data",
                        "type": "bytes"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "withdrawBid",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "withdrawTicketBalance",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "stateMutability": "payable",
                "type": "receive"
            }
        ],
        "0xf3D8eD487Bbbba0683F26d62A909b3DcE6f478E4"
        );

        state.rallyContract = contract;
    },
    loadRentContract(state){
        var web3 = new Web3(window.ethereum || Web3.givenProvider);
        var contract = new web3.eth.Contract([
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "carTwo",
                        "type": "uint256"
                    }
                ],
                "name": "acceptDragRace",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "claimRacerBalance",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    }
                ],
                "name": "createDragRace",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_address",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "payee",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "Sent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timeOne",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "carTwo",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timeTwo",
                        "type": "uint256"
                    }
                ],
                "name": "Times",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "_getCarBonus",
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
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "_isOwner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "car_address",
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
            {
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
                        "internalType": "enum PowerCarRental.State",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "carWinRate",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "total",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wins",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "dragRaces",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "carOne",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "pilotOne",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "carTwo",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "pilotTwo",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "raceBalance",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "racerBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ],
                "0x4EB7bF24274f11ee2847bee93d032D6ccE6633Aa"
            );
    
            state.rentContract = contract;
        },

  },
  actions: {    
    getNetworkId (){
        var web3 = new Web3(window.ethereum || Web3.givenProvider);
      web3.eth.getChainId().then(id => {
        this.commit("setNetworkId",id)
      });
    },
    getAddress(){
        var web3 = new Web3(window.ethereum || Web3.givenProvider);
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
    getProvider(){
        if (window.ethereum) {
            this.commit("loadContract");
            this.commit("loadRaceContract");
            this.commit("loadRallyContract");
            this.commit("loadRentContract");
          } else {
            window.addEventListener('ethereum#initialized', () => {
                this.commit("loadContract")
                this.commit("loadRaceContract")
                this.commit("loadRallyContract")
                this.commit("loadRentContract");
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

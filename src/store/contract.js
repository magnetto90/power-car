import Web3 from 'web3'

if(typeof web3 == 'undefined')
{
    console.log("No tenes Metamask Capo!")

}else{

    web3 = new Web3(window.ethereum);

    var contract = new web3.eth.Contract(
        [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "tokenOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "tokens",
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
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "tokens",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "tokenOwner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
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
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokens",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "success",
                        "type": "bool"
                    }
                ],
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
                "name": "auctions",
                "outputs": [
                    {
                        "internalType": "enum CryptoLink.State",
                        "name": "auctionState",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "highestBidder",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "highestBid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "step",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "item",
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
                        "name": "tokenOwner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "balance",
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
                        "name": "_bid",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_auctionID",
                        "type": "uint256"
                    }
                ],
                "name": "bidAuction",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_burnTokens",
                        "type": "uint256"
                    }
                ],
                "name": "burnTokens",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_auctionID",
                        "type": "uint256"
                    }
                ],
                "name": "cancelAuction",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "gameID",
                        "type": "uint256"
                    }
                ],
                "name": "cancelUpOrDown",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "gameID",
                        "type": "uint256"
                    }
                ],
                "name": "claimUpOrDown",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_auctionID",
                        "type": "uint256"
                    }
                ],
                "name": "closeAuction",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "gameID",
                        "type": "uint256"
                    }
                ],
                "name": "closeUpOrDown",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "countAuctions",
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
                "name": "countGames",
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
                        "internalType": "string",
                        "name": "_item",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_step",
                        "type": "uint256"
                    }
                ],
                "name": "createAuction",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "decimals",
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
                        "name": "gameID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_endPrice",
                        "type": "uint256"
                    }
                ],
                "name": "endUpOrDown",
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
                "name": "gamesList",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "jackpotUp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "jackpotDown",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "multiplierUp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "multiplierDown",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum CryptoLink.State",
                        "name": "upOrDownState",
                        "type": "uint8"
                    },
                    {
                        "internalType": "string",
                        "name": "startDate",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "closeDate",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "endDate",
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
                        "name": "_tokenHolder",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_newRole",
                        "type": "uint256"
                    }
                ],
                "name": "giveRole",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_mintTokens",
                        "type": "uint256"
                    }
                ],
                "name": "mintTokens",
                "outputs": [],
                "stateMutability": "nonpayable",
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
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "gameID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_bet",
                        "type": "uint256"
                    }
                ],
                "name": "playDown",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "gameID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_bet",
                        "type": "uint256"
                    }
                ],
                "name": "playUp",
                "outputs": [],
                "stateMutability": "nonpayable",
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
                "name": "playersList",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "_gameID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_betUp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_betDown",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "_claimed",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_auctionID",
                        "type": "uint256"
                    }
                ],
                "name": "reopenAuction",
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
                        "internalType": "uint256",
                        "name": "_startPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_startDate",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_closeDate",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_endDate",
                        "type": "string"
                    }
                ],
                "name": "startUpOrDown",
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
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "tokenHolders",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "_balance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_role",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
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
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokens",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "success",
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
                        "name": "tokens",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "success",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        "0xE2E4Cf144F4365AAa023da04918A64072C284201"
    );
}

export default contract;
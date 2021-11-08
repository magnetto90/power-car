<template>
    <p>Test</p>
</template>

<script>
import Web3 from 'web3'
import carMob from '@/store/carMobile'
export default {
    mounted() {
        if (window.ethereum) {
            handleEthereum();
        } else {
            window.addEventListener('ethereum#initialized', handleEthereum, {
                once: true,
            });

            // If the event is not dispatched by the end of the timeout,
            // the user probably doesn't have MetaMask installed.
            setTimeout(handleEthereum, 3000); // 3 seconds
            }

            function handleEthereum() {
            const { ethereum } = window;
                if (ethereum && ethereum.isMetaMask) {
                    console.log('Ethereum successfully detected!');
                    // Access the decentralized web!
                } else {
                    console.log('Please install MetaMask!');
            }
        }
        console.log(Web3.givenProvider)
        var web3 = new Web3(Web3.givenProvider);
        //web3.eth.getChainId().then(id => {alert(id)});
        //web3.eth.requestAccounts().then(addresses => {alert(addresses[0])})

        carMob.methods.tokenURI(0).call((err, res) => {
          alert(res)
        })
    },
}
</script>
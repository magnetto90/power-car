<template>
    <p>Test</p>
</template>

<script>
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
                    alert('Ethereum successfully detected!');
                    // Access the decentralized web!
                } else {
                    console.log('Please install MetaMask!');
            }
        }
    },
}
</script>
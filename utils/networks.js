export const networks = {
    mumbai: {
        chainName: 'Mumbai Testnet',
        chainId: 80001,
        rpcUrls: ['https://rpc-mumbai.matic.today/'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18,
        },
    },

    arbitrum: {
        chainName: 'Arbitrum Nitro Rollup Testnet',
        chainId: 421613,
        rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
        blockExplorerUrls: [
            'https://goerli-rollup-explorer.arbitrum.io/',
        ],
        nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
        },
    },

    telos:
    {
        chainName: 'Telos Testnet',
        chainId: 41,
        rpcUrls: ['https://testnet.telos.net/evm'],
        blockExplorerUrls: ['https://testnet.teloscan.io'],
        nativeCurrency: {
            name: 'Telos',
            symbol: 'TLOS',
            decimals: 18,
        },
    },

    goerli:
    {
        chainName: 'Goerli test network',
        chainId: 5,
        rpcUrls: ['https://goerli.infura.io/v3/'],
        blockExplorerUrls: ['https://goerli.etherscan.io'],
        nativeCurrency: {
            name: 'Goerli',
            symbol: 'GoerliETH',
            decimals: 18,
        },
    },


}
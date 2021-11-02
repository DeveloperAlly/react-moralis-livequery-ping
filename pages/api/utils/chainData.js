export const CHAIN_DATA = {
  polygon: {
    liveEventName: "PolygonPing",
    chainName: "Polygon Testnet",
    blockScanLink: "https://mumbai.polygonscan.com/tx/",
    chainID: 80001,
    hexChainID: "0x13881",
    addWalletParams: {
      chainID: "0x13881",
      chainName: "Matic(Polygon) Testnet Mumbai",
      rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
      nativeCurrency: {
        name: "tMatic",
        symbol: "tMatic",
        decimals: 18,
      },
      blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    },
  },
  bsc: {
    liveEventName: "BSCPing",
    chainName: "Binance Testnet",
    blockScanLink: "https://testnet.bscscan.com/tx/",
    chainID: 97,
    hexChainID: "0x61",
    addWalletParams: {
      chainID: "0x61",
      chainName: "Binance Smart Chain Testnet",
      rpcUrls: [
        "https://data-seed-prebsc-1-s1.binance.org:8545/",
        "https://data-seed-prebsc-2-s1.binance.org:8545/",
        "https://data-seed-prebsc-1-s2.binance.org:8545/",
        "https://data-seed-prebsc-2-s2.binance.org:8545/",
        "https://data-seed-prebsc-1-s3.binance.org:8545/",
        "https://data-seed-prebsc-2-s3.binance.org:8545/",
      ],
      nativeCurrency: {
        name: "tBNB",
        symbol: "tBNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://testnet.bscscan.com/"],
    },
  },
  kovan: {
    liveEventName: "KovanPing",
    chainName: "Kovan Ethereum Testnet",
    blockScanLink: "https://kovan.etherscan.io/tx/",
    chainID: 42,
    hexChainID: "0x2a",
    addWalletParams: {
      chainID: "0x2a",
      chainName: "Kovan Ethereum Testnet",
      rpcUrls: ["https://kovan.poa.network", "http://kovan.poa.network:8545"],
      nativeCurrency: {
        name: "kETH",
        symbol: "kETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://kovan.etherscan.io/"],
    },
  },
};

//https://chainid.network/chains.json (for network info)

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
        name: "Matic",
        symbol: "Matic",
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
      chainID: "",
      chainName: "",
      rpcUrls: [],
      nativeCurrency: {
        name: "",
        symbol: "",
        decimals: 0,
      },
      blockExplorerUrls: [""],
    },
  },
  kovan: {
    liveEventName: "KovanPing",
    chainName: "Ethereum Kovan Testnet",
    blockScanLink: "https://kovan.etherscan.io/tx/",
    chainID: 42,
    hexChainID: "0x2a",
    addWalletParams: {
      chainID: "",
      chainName: "",
      rpcUrls: [],
      nativeCurrency: {
        name: "",
        symbol: "",
        decimals: 0,
      },
      blockExplorerUrls: [""],
    },
  },
};

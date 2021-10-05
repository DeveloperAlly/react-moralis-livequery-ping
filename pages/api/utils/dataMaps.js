export const INITIAL_TRANSACTION_STATE = {
  loading: "",
  error: "",
  success: "",
  warning: "",
};

export const INITIAL_CHAIN_DATA = {
  polygon: [],
  bsc: [],
  kovan: [],
};

export const AUTH_BUTTON_PROPS = {
  authenticated: {
    color: "green",
    action: null,
    message: "Connected",
  },
  unauthenticated: {
    color: "red",
    action: null,
    message: "Connect",
  },
  nowallet: {
    color: "grey",
    action: () => window.open("https://metamask.io/download.html", "_blank"),
    message: "Install Metamask! 🦊",
  },
};

export const CHAIN_MAP = {
  80001: "Polygon Testnet",
  97: "Binance Testnet",
  42: "Kovan Ethereum Testnet",
};

export const FAUCET_URLS = {
  bsc: "https://testnet.binance.org/faucet-smart",
  polygon: "https://faucet.polygon.technology/",
  kovan: "https://faucet.kovan.network/",
};

export const MORALIS_SOCIALS = {
  docs: "https://docs.moralis.io/",
  youtube: "https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw",
  discord: "",
  forum: "",
  github: "https://github.com/MoralisWeb3",
  twitter: "https://twitter.com/MoralisWeb3",
};

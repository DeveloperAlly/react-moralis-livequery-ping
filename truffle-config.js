require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider({
          mnemonic: process.env.METAMASK_MNEMONIC,
          providerOrUrl: process.env.MORALIS_KOVAN_TESTNET_NODE,
        });
      },
      network_id: 42,
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      // confirmations: 10,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 300, // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    bsc: {
      provider: function () {
        return new HDWalletProvider({
          mnemonic: process.env.METAMASK_MNEMONIC,
          providerOrUrl: process.env.MORALIS_BSC_TESTNET_NODE,
        });
      },
      network_id: 97,
      // gas: 5500000,        // Ropsten has a lower block limit than mainnet
      // confirmations: 10,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    polygon: {
      provider: function () {
        return new moralisWalletProvider({
          mnemonic: process.env.METAMASK_MNEMONIC,
          providerOrUrl: process.env.MORALIS_POLY_TESTNET_NODE,
        });
      },
      network_id: 80001,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.7",
    },
  },

  db: {
    enabled: false,
  },
};

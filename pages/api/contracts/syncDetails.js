const topic = "ChainPinged(address, uint256, uint256)";
// import { ABI } from "./syncABI.json";

const syncEvents = {
  bsc: {
    description: "Chain Pinged - BSC",
    address: "0xbc775665dbfC5a621E978f568724382467e880d1",
    tableName: "BSCPing",
    topic,
    ABI,
  },
  polygon: {
    description: "Chain Pinged - Polygon",
    address: "0x4c498c7d2e76de0dac253b4acd85ba127e1140ed",
    tableName: "PolygonPing",
    topic,
    ABI,
  },
  kovan: {
    description: "Chain Pinged - Kovan",
    address: "0x54fdf91322a1767c2e26d82555759b06f21f4a37",
    tableName: "KovanPing",
    topic,
    ABI,
  },
};

import React, { useState, useEffect, useContext } from "react";
import {
  useMoralis,
  useMoralisSubscription,
  useMoralisCloudFunction,
} from "react-moralis";
import { Container, Header } from "semantic-ui-react";
import MoralisPing from "../api/contracts/MoralisPing.json";
import LatestPing from "./LatestPing";
import PingTable from "./PingTable";
import StatusMessage from "./StatusMessage";
import FaucetFunds from "./FaucetFunds";
import { CHAIN_DATA } from "../api/utils/chainData";
import {
  INITIAL_TRANSACTION_STATE,
  INITIAL_CHAIN_DATA,
} from "../api/utils/dataMaps";
import { calculateTotalPings } from "../api/utils/helperFunctions";

const Home = ({ data1, ...props }) => {
  const { web3, isAuthenticated, isWeb3Enabled, enableWeb3 } = useMoralis();

  const [transactionState, setTransactionState] = useState(
    INITIAL_TRANSACTION_STATE
  );
  const [count, setCount] = useState(null);
  const [latestPing, setLatestPing] = useState(null);
  const [liveEventData, setLiveEventData] = useState(INITIAL_CHAIN_DATA);

  const MoralisPingContractInterface = {
    polygon: new web3.eth.Contract(
      MoralisPing.abi,
      process.env.NEXT_PUBLIC_POLYGON_ADDRESS
    ),
    bsc: new web3.eth.Contract(
      MoralisPing.abi,
      process.env.NEXT_PUBLIC_BSC_ADDRESS
    ),
    kovan: new web3.eth.Contract(
      MoralisPing.abi,
      process.env.NEXT_PUBLIC_KOVAN_ADDRESS
    ),
  };

  useEffect(() => {
    fetch();
  }, []);

  // this is my init cloud function
  const { fetch, data, error, isLoading } = useMoralisCloudFunction(
    "InitFunction",
    { autoFetch: false }
  );

  useMoralisSubscription(
    "PolygonPing",
    (query) => query.descending("createdAt").limit(1),
    [],
    {
      live: true,
      onCreate: (data) => {
        setLiveEventData({ ...liveEventData, polygon: [data] });
        setLatestPing(data);
      },
    }
  );

  useMoralisSubscription(
    "BSCPing",
    (query) => query.descending("createdAt").limit(1),
    [],
    {
      live: true,
      onCreate: (data) => {
        setLiveEventData({ ...liveEventData, bsc: [data] });
        setLatestPing(data);
      },
    }
  );

  useMoralisSubscription(
    "KovanPing",
    (query) => query.descending("createdAt").limit(1),
    [],
    {
      live: true,
      onCreate: (data) => {
        setLiveEventData({ ...liveEventData, kovan: [data] });
        setLatestPing(data);
      },
    }
  );

  useEffect(() => {
    // console.log("LIVE", liveEventData, latestPing);
    liveEventData && setCount(calculateTotalPings(liveEventData));
  }, [liveEventData]);

  useEffect(() => {
    console.log("DATA", data);
    if (data) {
      setLiveEventData({
        polygon: data.polygon,
        bsc: data.bsc,
        kovan: data.kovan,
      });
      let items = [data.polygon[0], data.bsc[0], data.kovan[0]];
      items.sort(function (a, b) {
        return b.createdAt - a.createdAt;
      });
      setLatestPing(items[0]);
    }
  }, [data]);

  const changeWallet = async (chain) => {
    await web3.currentProvider
      .request({
        method: "wallet_switchEthereumChain",
        params: [
          { chainId: `0x${parseInt(CHAIN_DATA[chain].chainID).toString(16)}` },
        ],
      })
      .then((res) => {
        callPing(chain);
      })
      .catch((err) => {
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          error: `Error: ${err.message || "Could not change Wallet Chain"}`,
        });
      });
  };

  const addWallet = async (chain) => {};

  const ping = async (chain) => {
    setTransactionState(INITIAL_TRANSACTION_STATE);
    await web3.eth
      .getChainId()
      .then((cid) => {
        if (cid !== CHAIN_DATA[chain].chainID) {
          changeWallet(chain);
        } else {
          callPing(chain);
        }
      })
      .catch((err) => {
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          error: `Error: ${err.message || "Could not change Wallet Chain"}`,
        });
        return;
      });
  };

  const callPing = async (chain) => {
    let contractInterface;
    let { chainName, blockScanLink, chainID } = CHAIN_DATA[chain];
    switch (chain) {
      case "polygon":
        contractInterface = MoralisPingContractInterface.polygon;
        break;
      case "bsc":
        contractInterface = MoralisPingContractInterface.bsc;
        break;
      case "kovan":
        contractInterface = MoralisPingContractInterface.kovan;
        break;
      default:
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          error: `Error: No Matching Chain`,
        });
        return;
    }

    await web3.eth
      .getAccounts()
      .then(async (accounts) => {
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          loading: "Transaction is processing....",
        });
        //check chain or get them to change to correct chain
        await contractInterface.methods
          .ping()
          .send({
            from: accounts[0],
          })
          .then((res) => {
            const etherscanLink = `${blockScanLink}${res.transactionHash}`;
            setTransactionState({
              ...INITIAL_TRANSACTION_STATE,
              success: (
                <div>
                  <p>Pinged {chainName} Network</p>
                  <a href={etherscanLink} target="_blank" rel="noreferrer">
                    Click to view the transaction on Block Explorer
                  </a>
                </div>
              ),
            });
          })
          .catch((err) => {
            setTransactionState({
              ...INITIAL_TRANSACTION_STATE,
              error: err.message,
            });
          });
      })
      .catch((err) => {
        setTransactionState({
          ...INITIAL_TRANSACTION_STATE,
          error: `Error: ${err.message || "Could not init accounts"}`,
        });
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        margin: "1em",
      }}
    >
      <Container>
        <Header as="h2">Total Pings: {count ? count : 0}</Header>
        {latestPing && <LatestPing latestPing={latestPing} />}
        {liveEventData && (
          <PingTable
            data={liveEventData}
            ping={ping}
            transactionState={transactionState}
            connected={isAuthenticated && isWeb3Enabled}
          />
        )}
      </Container>
      {transactionState && (
        <Container style={{ marginTop: "20px" }}>
          {JSON.stringify(transactionState) !==
            JSON.stringify(INITIAL_TRANSACTION_STATE) && (
            <StatusMessage
              status={transactionState}
              setTransactionState={setTransactionState}
            />
          )}
        </Container>
      )}
      <FaucetFunds />
    </div>
  );
};

export default Home;

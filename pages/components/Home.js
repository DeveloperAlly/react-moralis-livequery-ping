import React, { useState, useEffect } from "react";

/**Styling */
import { Container, Header, Button } from "semantic-ui-react";

/** The Contract Interface */
import MoralisPing from "../api/contracts/MoralisPing.json";

/** React Display Components */
import LatestPing from "./LatestPing";
import PingTable from "./PingTable";
import StatusMessage from "./StatusMessage";

/** Utility functions & data maps */
import { CHAIN_DATA } from "../api/utils/chainData";
import {
  INITIAL_TRANSACTION_STATE,
  INITIAL_CHAIN_DATA,
} from "../api/utils/dataMaps";
import { calculateTotalPings } from "../api/utils/helperFunctions";

/**Moralis imports */
import {
  useMoralis,
  useMoralisSubscription,
  useMoralisCloudFunction,
} from "react-moralis";

const Home = ({ ...props }) => {
  const { web3, isAuthenticated, isWeb3Enabled } = useMoralis();

  const [transactionState, setTransactionState] = useState(
    INITIAL_TRANSACTION_STATE
  );

  const [count, setCount] = useState(null);
  const [latestPing, setLatestPing] = useState(null);
  const [liveEventData, setLiveEventData] = useState(INITIAL_CHAIN_DATA);

  /**
   * Subscribe to Polygon events (pings) with Moralis
   */
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

  /**
   * Subscribe to BSC events (pings) with Moralis
   */
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

  /**
   * Subscribe to Kovan events (pings) with Moralis
   */
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

  /**
   * Effect Hook to calculate totalPings when liveEventData changes
   * LiveEventData will change when a new event is heard on the chain
   */
  useEffect(() => {
    liveEventData && setCount(calculateTotalPings(liveEventData));
  }, [liveEventData]);

  /** Moralis Cloud function
   * this will run on page load only to fetch the ping data
   * from our moralis event data classes on all 3 chains
   * I'm using this to avoid writing a query and calling it 3 times on loading
   */
  const {
    fetch,
    data,
    error: cloudError,
    isLoading: cloudIsLoading,
  } = useMoralisCloudFunction("FetchInitialData");

  /**
   * Store our data into state when it loads, or display an error
   */
  useEffect(() => {
    if (cloudError && !cloudIsLoading) {
      setTransactionState({
        ...transactionState,
        disableTimeout: true,
        warning: (
          <div>
            <p>Could not load CloudData</p>
            {cloudError && <p>{cloudError.message}</p>}
            <p>
              You can still use Ping function though data displayed may not be
              accurate
            </p>
            <Button basic onClick={fetch}>
              Re-fetch
            </Button>
          </div>
        ),
      });
    }
    if (data) {
      setTransactionState(INITIAL_TRANSACTION_STATE);
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
    } //else something happened and the data is null or undefined. We can still ping though
  }, [data, cloudError, cloudIsLoading]);

  /**
   * Connection to our Polygon, BSC and Kovan Deployed Smart Contacts
   */
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

  //Function that checks if we are on the right chain
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

  //Function that calls our smart contract ping function.
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

  //Helper function to change wallet chains
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

  //unimplemented helper function to add a chain if wallet doesn't have it
  const addWallet = async (chain) => {};

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
              useTimeout={false}
            />
          )}
        </Container>
      )}
      {props.children}
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import {
  useMoralis,
  useMoralisQuery,
  useMoralisSubscription,
  useMoralisCloudFunction,
} from "react-moralis";
import { Container, Header, Button, Image } from "semantic-ui-react";
import MoralisPing from "./api/contracts/MoralisPing.json";
import StatusMessage from "./components/StatusMessage";
import PingTable from "./components/PingTable";
import { CHAIN_DATA } from "./api/utils/chainData";
import {
  INITIAL_TRANSACTION_STATE,
  CHAIN_MAP,
  FAUCET_URLS,
} from "./api/utils/dataMaps";
import FaucetFunds from "./components/FaucetFunds";

const Home = ({
  connected,
  data,
  liveEventData,
  setLiveEventData,
  count,
  setCount,
  latestPing,
  setLatestPing,
  ...props
}) => {
  const {
    web3,
    enableWeb3,
    isWeb3Enabled,
    web3EnableError,
    // authenticate,
    // isAuthenticated,
    // user,
  } = useMoralis();

  const [transactionState, setTransactionState] = useState(
    INITIAL_TRANSACTION_STATE
  );

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

  const calculateTotalPings = () => {
    const { polygon, kovan, bsc } = liveEventData;
    let pC =
      polygon[0] && polygon[0].attributes.current_count
        ? parseInt(polygon[0].attributes.current_count)
        : 0;
    let kC =
      kovan[0] && kovan[0].attributes.current_count
        ? parseInt(kovan[0].attributes.current_count)
        : 0;
    let bC =
      bsc[0] && bsc[0].attributes.current_count
        ? parseInt(bsc[0].attributes.current_count)
        : 0;
    console.log("counts", pC, kC, bC);
    return pC + kC + bC;
  };

  useMoralisSubscription(
    "PolygonPing",
    (query) => query.descending("createdAt").limit(1),
    [],
    {
      live: true,
      onCreate: (data) => {
        console.log(`poly ping was just created`, data);
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
        console.log(`bsc ping was just created`, data);
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
        console.log(`kovan ping was just created`, data);
        setLiveEventData({ ...liveEventData, kovan: [data] });
        setLatestPing(data);
      },
    }
  );

  useEffect(() => {
    console.log("LIVE", liveEventData);
    liveEventData && setCount(calculateTotalPings());
  }, [liveEventData, latestPing]);

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
    console.log("chain", contractInterface, chainName, blockScanLink, chainID);

    // await web3.eth.getChainId().then((chain) => console.log("CHAINID", chain));
    await web3.eth
      .getAccounts()
      .then(async (accounts) => {
        console.log("accounts", accounts);
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
            console.log("PING RES", res);
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

  const changeWallet = async (chain) => {
    console.log(
      "change chain to ",
      `0x${parseInt(CHAIN_DATA[chain].chainID).toString(16)}`
    );
    await web3.currentProvider
      .request({
        method: "wallet_switchEthereumChain",
        params: [
          { chainId: `0x${parseInt(CHAIN_DATA[chain].chainID).toString(16)}` },
        ],
      })
      .then((res) => {
        console.log("changed chains");
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
    !isWeb3Enabled && enableWeb3();
    setTransactionState(INITIAL_TRANSACTION_STATE);

    await web3.eth
      .getChainId()
      .then((cid) => {
        console.log("CHAINID", cid);
        if (cid !== CHAIN_DATA[chain].chainID) {
          console.log("need to change chains");
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
    // let contractInterface;
    // let { chainName, blockScanLink, chainID } = CHAIN_DATA[chain];
    // switch (chain) {
    //   case "polygon":
    //     contractInterface = MoralisPingContractInterface.polygon;
    //     break;
    //   case "bsc":
    //     contractInterface = MoralisPingContractInterface.bsc;
    //     break;
    //   case "kovan":
    //     contractInterface = MoralisPingContractInterface.kovan;
    //     break;
    //   default:
    //     setTransactionState({
    //       ...INITIAL_TRANSACTION_STATE,
    //       error: `Error: No Matching Chain`,
    //     });
    //     return;
    // }
    // console.log("chain", contractInterface, chainName, blockScanLink, chainID);

    // // await web3.eth.getChainId().then((chain) => console.log("CHAINID", chain));
    // await web3.eth
    //   .getAccounts()
    //   .then(async (accounts) => {
    //     console.log("accounts", accounts);
    //     setTransactionState({
    //       ...INITIAL_TRANSACTION_STATE,
    //       loading: "Transaction is processing....",
    //     });
    //     //check chain or get them to change to correct chain
    //     await contractInterface.methods
    //       .ping()
    //       .send({
    //         from: accounts[0],
    //       })
    //       .then((res) => {
    //         console.log("PING RES", res);
    //         const etherscanLink = `${blockScanLink}${res.transactionHash}`;
    //         setTransactionState({
    //           ...INITIAL_TRANSACTION_STATE,
    //           success: (
    //             <div>
    //               <p>Pinged {chainName} Network</p>
    //               <a href={etherscanLink} target="_blank" rel="noreferrer">
    //                 Click to view the transaction on Block Explorer
    //               </a>
    //             </div>
    //           ),
    //         });
    //       })
    //       .catch((err) => {
    //         setTransactionState({
    //           ...INITIAL_TRANSACTION_STATE,
    //           error: err.message,
    //         });
    //       });
    //   })
    //   .catch((err) => {
    //     setTransactionState({
    //       ...INITIAL_TRANSACTION_STATE,
    //       error: `Error: ${err.message || "Could not init accounts"}`,
    //     });
    //   });
  };

  const renderLatestPing = () => {
    return (
      <div key={latestPing}>
        <Header as="h5" style={{ padding: 0, margin: 0 }}>
          Latest Ping
        </Header>
        <p as="h5" style={{ padding: 0, margin: 0 }}>
          Chain:{" "}
          {`${CHAIN_MAP[latestPing.attributes.chain_id]}  (id: ${
            latestPing.attributes.chain_id
          })`}
        </p>
        <p as="h5" style={{ padding: 0, margin: 0 }}>
          Sender: {latestPing.attributes.sender}
        </p>
      </div>
    );
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
        <Header as="h2">Total Pings: {count ? count : "loading..."}</Header>
        {latestPing && renderLatestPing()}
        {liveEventData && (
          <PingTable
            data={liveEventData}
            ping={ping}
            transactionState={transactionState}
            connected={connected}
          />
        )}
      </Container>
      {transactionState && (
        <Container style={{ marginTop: "20px" }}>
          {JSON.stringify(transactionState) !==
            JSON.stringify(INITIAL_TRANSACTION_STATE) && (
            <StatusMessage status={transactionState} />
          )}
        </Container>
      )}
      <FaucetFunds />
    </div>
  );
};

export default Home;

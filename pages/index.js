import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  useMoralis,
  useMoralisCloudFunction,
  useMoralisSubscription,
} from "react-moralis";
import { useRouter } from "next/router";
import Layout from "./components/Layout";
import Home from "./Home";
import "semantic-ui-css/semantic.min.css";

const INITIAL_CHAIN_DATA = {
  polygon: [],
  bsc: [],
  kovan: [],
};

const Index = (props) => {
  const { web3 } = useMoralis();
  const router = useRouter();
  const [connected, setConnected] = useState(null);
  const [count, setCount] = useState(null);
  const [latestPing, setLatestPing] = useState(null);
  const [liveEventData, setLiveEventData] = useState(INITIAL_CHAIN_DATA);

  useEffect(() => {
    console.log("latest ping", latestPing);
  }, [latestPing]);

  const checkWalletConnection = async () => {
    let connectedState;
    // Check if User is already connected by retrieving the accounts
    await web3.eth
      .getAccounts()
      .then(async (addr) => {
        // Set User account into state
        console.log(addr);
        connectedState = Boolean(addr.length > 0);
        console.log("connected state", connectedState, connected);
        if (connectedState !== connected) {
          console.log("reload");
          router.replace("/");
        }
        setConnected(connectedState);
      })
      .catch((err) => {
        console.log("connected check error");
        if (connected !== false) {
          router.replace("/");
        }
        setConnected(false);
      });
    // return connectedState;
  };

  useEffect(() => {
    checkWalletConnection();
  });

  //will only run once on app loading
  useEffect(() => {
    fetch();
  }, []);

  // this is my init cloud function
  const { fetch, data, error, isLoading } = useMoralisCloudFunction(
    "InitFunction",
    { autoFetch: false }
  );

  useEffect(() => {
    console.log("DATA once only?", data);
    if (data) {
      let pCount =
        data.polygon.length > 0
          ? data.polygon[0].attributes.current_count
          : "0";
      let bCount =
        data.bsc.length > 0 ? data.bsc[0].attributes.current_count : "0";
      let kCount =
        data.kovan.length > 0 ? data.kovan[0].attributes.current_count : "0";

      let realCount = parseInt(pCount) + parseInt(bCount) + parseInt(kCount);
      setCount(realCount);
      setLiveEventData({
        polygon: data.polygon,
        bsc: data.bsc,
        kovan: data.kovan,
      });
      let items = [data.polygon[0], data.bsc[0], data.kovan[0]];
      items.sort(function (a, b) {
        return b.createdAt - a.createdAt;
      });
      console.log("DATA ITEMS once only?", items);
      setLatestPing(items[0]);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Moralis Chain Ping</title>
        <meta name="description" content="Moralis LiveQuery Demo" />
        <link rel="icon" href="/Moralis-Icon-Dark.png" />
      </Head>
      <main className={styles.main}>
        <Layout
          data={props}
          connected={connected}
          checkWalletConnection={checkWalletConnection}
        >
          <Home
            connected={connected}
            liveEventData={liveEventData}
            setLiveEventData={setLiveEventData}
            count={count}
            setCount={setCount}
            latestPing={latestPing}
            setLatestPing={setLatestPing}
          />
        </Layout>
        <footer className={styles.footer}>
          <a href="https://docs.moralis.io/" target="_blank" rel="noreferrer">
            <span className={styles.logo}>
              {/* <ByMoralis
                width={300}
                height={40}
                variant="dark"
                alt="Powered By Moralis Logo"
              /> */}
              <Image
                src="/Moralis Logo_Dark.svg"
                alt="Powered By Moralis Logo"
                width={300}
                height={40}
              />
            </span>
          </a>
        </footer>
      </main>
    </div>
  );
};

export default Index;

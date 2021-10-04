import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { useRouter } from "next/router";
import Layout from "./components/Layout";
import Home from "./Home";
import Footer from "./components/Footer";
import "semantic-ui-css/semantic.min.css";
import { ConnectedContext } from "./api/utils/connected-context";

const Index = (props) => {
  const { web3 } = useMoralis();
  const router = useRouter();
  const [connected, setConnected] = useState(null);

  const checkWalletConnection = async () => {
    let connectedState;
    // Check if User is already connected by retrieving the accounts
    await web3.eth
      .getAccounts()
      .then(async (addr) => {
        // Set User account into state
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Moralis Chain Ping</title>
        <meta name="description" content="Moralis LiveQuery Demo" />
        <link rel="icon" href="/Moralis-Icon-Dark.png" />
      </Head>
      <main className={styles.main}>
        <ConnectedContext.Provider value={connected}>
          <Layout data={props}>
            <Home data={data} />
          </Layout>
        </ConnectedContext.Provider>
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </main>
    </div>
  );
};

export default Index;

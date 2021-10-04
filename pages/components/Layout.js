import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import Image from "next/image";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { Transition, Header, Image as SImage, Button } from "semantic-ui-react";
import { useMoralis } from "react-moralis";
import useInterval from "../api/useInterval";
import StatusMessage from "./StatusMessage";

//Hosts the top level layout of our app & also handles wallet connection.
const Layout = ({ data, checkWalletConnection, connected, ...props }) => {
  const { web3, enableWeb3, isWeb3Enabled, web3EnableError } = useMoralis();
  const router = useRouter();
  const [isVisibile, setIsVisible] = useState(true);

  const REFRESH_INTERVAL = 10000;
  useInterval(async () => {
    setIsVisible(!isVisibile);
  }, REFRESH_INTERVAL);

  const renderInstallMetamask = () => {
    return (
      <Button
        as="a"
        href="https://metamask.io/download.html"
        target="_blank"
        rel="noreferrer"
        basic
        size="large"
        key={connected}
      >
        Install Metamask! 🦊
      </Button>
    );
  };

  const renderConnectWallet = () => {
    return (
      <Button
        key={connected}
        color="red"
        basic
        size="large"
        onClick={() => enableWeb3()}
      >
        Connect
      </Button>
    );
  };

  const renderConnectedButton = () => {
    return (
      <Button
        color="green"
        basic
        size="large"
        onClick={() => router.replace("/")}
        key={connected}
      >
        Connected
      </Button>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Moralis Chain Ping</title>
        <meta name="description" content="Moralis LiveQuery Demo" />
        <link rel="icon" href="/Moralis-Icon-Dark.png" />
      </Head>
      <main className={styles.main}>
        <Container fluid style={{ paddingTop: "2em" }} key={connected}>
          <Header as="h1" icon textAlign="center">
            <Transition
              animation="tada"
              duration="1500"
              transitionOnMount
              visible={isVisibile}
              onComplete={() => {
                setIsVisible(false);
              }}
            >
              <SImage src="/Moralis-Icon-Dark.png" />
            </Transition>
            <Header.Content style={{ paddingTop: "20px" }}>
              Moralis Chain Ping
            </Header.Content>
            <div key={checkWalletConnection()}>
              {connected
                ? renderConnectedButton()
                : web3EnableError
                ? renderInstallMetamask()
                : renderConnectWallet()}
            </div>
          </Header>
          {web3EnableError && (
            <Container style={{ marginTop: "20px", width: "30%" }}>
              <StatusMessage
                status={{
                  loading: "",
                  error: "Connect to a Wallet to use Moralis Chain Ping!",
                  success: "",
                  warning: "",
                }}
              />
            </Container>
          )}
          {props.children}
        </Container>
      </main>
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
    </div>
  );
};

export default Layout;

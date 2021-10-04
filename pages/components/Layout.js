import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
import { useMoralis } from "react-moralis";
import useInterval from "../api/useInterval";
import HeaderLogo from "./HeaderLogo";
import StatusMessage from "./StatusMessage";

//Hosts the top level layout of our app
const Layout = ({ data, checkWalletConnection, connected, ...props }) => {
  const { web3, enableWeb3, isWeb3Enabled, web3EnableError } = useMoralis();
  const router = useRouter();

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
    <Container fluid style={{ paddingTop: "2em" }} key={connected}>
      <HeaderLogo />
      <Container
        key={checkWalletConnection}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {connected
          ? renderConnectedButton()
          : web3EnableError
          ? renderInstallMetamask()
          : renderConnectWallet()}
      </Container>
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
  );
};

export default Layout;

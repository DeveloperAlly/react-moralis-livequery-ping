import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Container, Button } from "semantic-ui-react";
import { useMoralis } from "react-moralis";
import StatusMessage from "./StatusMessage";
import { ConnectedContext } from "../api/utils/connected-context";

const Authentication = () => {
  const { web3, enableWeb3, isWeb3Enabled, web3EnableError } = useMoralis();
  const router = useRouter();
  const connected = useContext(ConnectedContext);

  //move button to a component
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
        style={{
          backgroundColor: "#B7E803 !important",
          color: "#B7E803 !important",
        }}
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
    <Container>
      <Container
        key={connected}
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
    </Container>
  );
};

export default Authentication;

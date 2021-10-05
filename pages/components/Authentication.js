import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Container, Button } from "semantic-ui-react";
import { useMoralis } from "react-moralis";
import StatusMessage from "./StatusMessage";
import { AUTH_BUTTON_PROPS } from "../api/utils/dataMaps";

/**
 * You probably want to add session and encryption for users with multiple accounts
 * Currently - I handle account changes by logging the user out instead (quick fix)
 */

const Authentication = () => {
  const {
    Moralis,
    enableWeb3,
    web3EnableError,
    authenticate,
    isAuthenticated,
    user,
    logout,
  } = useMoralis();
  const router = useRouter();
  AUTH_BUTTON_PROPS.unauthenticated.action = () => {
    authenticate();
    enableWeb3();
  };
  AUTH_BUTTON_PROPS.authenticated.action = () => {
    logout();
  };

  useEffect(() => {
    Moralis.Web3.onAccountsChanged(() => {
      logout();
      router.replace("/");
    });
  }, []);

  const AuthButton = () => {
    let type = isAuthenticated
      ? "authenticated"
      : web3EnableError
      ? "nowallet"
      : "unauthenticated";

    //type = "authenticated", "unauthenticated", "nowallet"
    const { color, action, message } = AUTH_BUTTON_PROPS[type];

    return (
      <Button color={color} basic size="large" onClick={action}>
        {message}
      </Button>
    );
  };

  return (
    <Container>
      <Container
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {<AuthButton />}
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

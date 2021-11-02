import React from "react";
import { Container, Image, Button } from "semantic-ui-react";
import { FAUCET_URLS } from "../api/utils/dataMaps";

//TODO: destructure
const FaucetFunds = () => {
  return (
    <>
      <Container
        textAlign="center"
        fluid
        style={{
          marginTop: "30px",
          display: "flex",
          flexDirection: "row",
          width: "50%",
        }}
      >
        <a
          href={FAUCET_URLS.bsc}
          target="_blank"
          rel="noreferrer"
          style={{ paddingBottom: "10px" }}
        >
          <Button basic size="small">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Image
                src="/bnb.png"
                alt="Binance Logo"
                width={30}
                height={30}
                style={{ marginRight: "10px" }}
              />
              Get testnet BNB funds
            </div>
          </Button>
        </a>
        <a
          href={FAUCET_URLS.polygon}
          target="_blank"
          rel="noreferrer"
          style={{ paddingBottom: "10px" }}
        >
          <Button basic size="small">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Image
                src="/matic.png"
                alt="Matic Logo"
                width={30}
                height={30}
                style={{ marginRight: "10px" }}
              />
              Get testnet Poly funds
            </div>
          </Button>
        </a>
        <a
          href={FAUCET_URLS.kovan}
          target="_blank"
          rel="noreferrer"
          style={{ paddingBottom: "10px" }}
        >
          <Button basic size="small">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Image
                src="/eth.png"
                alt="Ethereum Logo"
                width={30}
                height={30}
                style={{ marginRight: "10px" }}
              />
              Get testnet kETH funds
            </div>
          </Button>
        </a>
      </Container>
    </>
  );
};

export default FaucetFunds;

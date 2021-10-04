import React from "react";
import { Container, Button, Image } from "semantic-ui-react";
import { MORALIS_SOCIALS } from "../api/utils/dataMaps";

//move socials to a list to render
//use styled-components or css styles instead of inline be cool, be DRY :P
const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "150px",
        borderTop: "1px solid #eaeaea",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
        paddingBottom: "30px",
        paddingTop: "10px",
      }}
    >
      <Container>
        <a href={MORALIS_SOCIALS.docs} target="_blank" rel="noreferrer">
          <Image
            src="/Moralis Logo_Dark.svg"
            alt="Powered By Moralis Logo"
            width="100%"
            height={60}
          />
        </a>
      </Container>
      <Container
        textAlign="center"
        fluid
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <a href={MORALIS_SOCIALS.twitter} target="_blank" rel="noreferrer">
          <Button
            size="small"
            circular
            icon="twitter"
            style={{ background: "#041836", color: "white", margin: "0 10px" }}
          />
        </a>
        <a href={MORALIS_SOCIALS.youtube} target="_blank" rel="noreferrer">
          <Button
            size="small"
            circular
            icon="youtube"
            style={{ background: "#041836", color: "white", margin: "0 10px" }}
          />
        </a>
        <a href={MORALIS_SOCIALS.github} target="_blank" rel="noreferrer">
          <Button
            size="small"
            circular
            icon="github"
            style={{ background: "#041836", color: "white", margin: "0 10px" }}
          />
        </a>
      </Container>
    </div>
  );
};

export default Footer;

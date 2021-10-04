import React from "react";
import { Container, Button, Image } from "semantic-ui-react";
import { MORALIS_SOCIALS } from "../api/utils/dataMaps";

const Footer = () => {
  return (
    <div>
      <Container>
        <a href={MORALIS_SOCIALS.docs} target="_blank" rel="noreferrer">
          <Image
            src="/Moralis Logo_Dark.svg"
            alt="Powered By Moralis Logo"
            width={300}
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
          width: "20%",
        }}
      >
        <a href={MORALIS_SOCIALS.twitter} target="_blank" rel="noreferrer">
          <Button size="tiny" circular icon="twitter" />
        </a>
        <a href={MORALIS_SOCIALS.youtube} target="_blank" rel="noreferrer">
          <Button size="tiny" circular icon="youtube" />
        </a>
        <a href={MORALIS_SOCIALS.github} target="_blank" rel="noreferrer">
          <Button size="tiny" circular icon="github" />
        </a>
      </Container>
    </div>
  );
};

export default Footer;

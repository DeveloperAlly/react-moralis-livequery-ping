import React from "react";
import { Container } from "semantic-ui-react";
import HeaderLogo from "./HeaderLogo";
import Footer from "./Footer";

//Hosts the top level layout of our app
const Layout = (props) => {
  return (
    <Container fluid style={{ paddingTop: "2em" }}>
      <HeaderLogo />
      {props.children}
      <Footer />
    </Container>
  );
};

export default Layout;

import { useState } from "react";
import { Transition, Header, Image as SImage } from "semantic-ui-react";
import useInterval from "../api/useInterval";

const HeaderLogo = () => {
  const [isVisibile, setIsVisible] = useState(true);

  const REFRESH_INTERVAL = 10000;
  useInterval(async () => {
    setIsVisible(!isVisibile);
  }, REFRESH_INTERVAL);

  return (
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
    </Header>
  );
};

export default HeaderLogo;

import { Header } from "semantic-ui-react";
import { CHAIN_MAP } from "../api/utils/dataMaps";

const LatestPing = ({ latestPing }) => {
  return (
    <>
      {latestPing && latestPing.attributes && (
        <div key={latestPing}>
          <Header as="h5" style={{ padding: 0, margin: 0 }}>
            Latest Ping
          </Header>
          <p as="h5" style={{ padding: 0, margin: 0 }}>
            Chain:{" "}
            {`${CHAIN_MAP[latestPing.attributes.chain_id]}  (id: ${
              latestPing.attributes.chain_id
            })`}
          </p>
          <p as="h5" style={{ padding: 0, margin: 0 }}>
            Sender: {latestPing.attributes.sender}
          </p>
        </div>
      )}
    </>
  );
};

export default LatestPing;

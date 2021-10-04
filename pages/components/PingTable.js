import React from "react";
import { Table, Button } from "semantic-ui-react";
import { CHAIN_DATA } from "../api/utils/chainData";

const PingTable = ({ data, ping, transactionState, connected }) => {
  const renderRow = (details, network) => {
    return (
      <Table.Row key={network}>
        <Table.Cell>{CHAIN_DATA[network].chainName}</Table.Cell>
        <Table.Cell>
          {details[0] ? details[0].attributes.sender : "-"}
        </Table.Cell>
        <Table.Cell>
          {details[0] ? details[0].createdAt.toLocaleString() : "-"}
        </Table.Cell>
        <Table.Cell>
          {details[0] ? details[0].attributes.current_count : 0}
        </Table.Cell>
        <Table.Cell>
          <Button
            style={{ background: "#041836", color: "white" }}
            onClick={() => ping(network)}
            disabled={Boolean(transactionState.loading) || !connected} //OR NO WALLET
          >
            Ping
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Network</Table.HeaderCell>
          <Table.HeaderCell>Last Ping From Address</Table.HeaderCell>
          <Table.HeaderCell>Last Pinged</Table.HeaderCell>
          <Table.HeaderCell>Number of Pings</Table.HeaderCell>
          <Table.HeaderCell>Ping Me!</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {data && (
        <>
          <Table.Body>
            {renderRow(data.polygon, "polygon")}
            {renderRow(data.bsc, "bsc")}
            {renderRow(data.kovan, "kovan")}
          </Table.Body>
        </>
      )}
    </Table>
  );
};

export default PingTable;

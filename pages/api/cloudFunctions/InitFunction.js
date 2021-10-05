import { Moralis } from "react-moralis";

Moralis.Cloud.define("FetchInitialData", async (request) => {
  const polyData = await new Moralis.Query("PolygonPing")
    .descending("createdAt")
    .limit(1)
    .find();
  const bscData = await new Moralis.Query("BSCPing")
    .descending("createdAt")
    .limit(1)
    .find();
  const kovanData = await new Moralis.Query("KovanPing")
    .descending("createdAt")
    .limit(1)
    .find();

  return { polygon: polyData, bsc: bscData, kovan: kovanData };
});

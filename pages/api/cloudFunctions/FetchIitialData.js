import { Moralis } from "react-moralis";

//Would be good to pipe this data into a database all together & update it when pings come in
//Not sure if possible?
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

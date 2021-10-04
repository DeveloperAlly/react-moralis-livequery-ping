import { Moralis } from "react-moralis";

Moralis.Cloud.define("InitFunction", async (request) => {
  const queryP = new Moralis.Query("PolygonPing");
  queryP.descending("createdAt").limit(1);
  const queryB = new Moralis.Query("BSCPing");
  queryB.descending("createdAt").limit(1);
  const queryK = new Moralis.Query("KovanPing");
  queryK.descending("createdAt").limit(1);
  const polyData = await queryP.find();
  const bscData = await queryB.find();
  const kovanData = await queryK.find();

  return { polygon: polyData, bsc: bscData, kovan: kovanData };
});

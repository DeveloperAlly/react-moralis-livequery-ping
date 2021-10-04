let MoralisPing = artifacts.require("./MoralisPing.sol");

module.exports = function (deployer) {
  deployer.deploy(MoralisPing, "MoralisPing constructor ran");
  //add others here
};

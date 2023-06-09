const Web3 = require("web3");
const Contract = require("web3-eth-contract");
const originConfig = require("../config/origin.config.js");
const contractConfig = require("../config/contract.config.js");
const infuraConfig = require("../config/infura.config.js");
const ABI = require("./abi.json");

Contract.setProvider(
  new Web3.providers.HttpProvider(
    `https://${infuraConfig.NETWORK}.infura.io/v3/${infuraConfig.ID}`
  )
);


var currentSupply = {};
originConfig.VALID_ORIGINS.forEach((origin, index) => {
  console.log(contractConfig.ADDRESS)
  currentSupply[origin] = {
    address: contractConfig.ADDRESS[index],
    supply: 0,
  };
});

exports.updateData = (origin) => {
  console.log(currentSupply, origin);
  const ERC721Contract = new Contract(ABI, currentSupply[origin].address);
  ERC721Contract.methods
    .totalSupply()
    .call()
    .then(function (result) {
      if (result && typeof result === "string") {
        currentSupply[origin].supply = parseInt(result);
      }
    })
    .catch(console.log);
};

exports.getData = (origin) => {
  return currentSupply[origin].supply;
};

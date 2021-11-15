const EthSwap = artifacts.require("EthSwap");
const Token = artifacts.require("Token");

module.exports = async function(deployer) {

//Deploy ethswap
 await deployer.deploy(EthSwap);
  const ethswap = await EthSwap.deployed()

//Deploy token
 await deployer.deploy(Token);
  const token = await Token.deployed()

  //Transfer all tokens to ethswap (1million)
  await token.transfer(ethswap.address,'1000000000000000000')
};

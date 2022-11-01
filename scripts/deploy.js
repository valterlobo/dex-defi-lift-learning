
const hre = require("hardhat");

async function main() {

  //TOKEN A 
  const TOKEN_A = await hre.ethers.getContractFactory("TokenTemplate");
  const tka = await TOKEN_A.deploy("TOKEN A", "TKA");
  await tka.deployed();

  //TOKEN B
  const TOKEN_B = await hre.ethers.getContractFactory("TokenTemplate");
  const tkb = await TOKEN_B.deploy("TOKEN B", "TKB");
  await tkb.deployed();

  const CPAMM = await hre.ethers.getContractFactory("CPAMM");
  const amm = await CPAMM.deploy(tka.address, tkb.address);

  await amm.deployed();

  console.log(
    ` CPAMM deployed to ${amm.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

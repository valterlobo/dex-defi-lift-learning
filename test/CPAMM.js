const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("CPAMM", function () {

  async function deployContract() {

    const [owner, otherAccount] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("TokenTemplate")
    const nameA = "TOKEN_A"
    const symbolA = "TKA"
    const nameB = "TOKEN_B"
    const symbolB = "TKB"

    const tokenA = await Token.deploy(nameA, symbolA)
    const tokenB = await Token.deploy(nameB, symbolB)
    const CPAMM = await ethers.getContractFactory("CPAMM")
    const cpamm = await CPAMM.deploy(tokenA.address, tokenB.address)

    return { cpamm, tokenA, tokenB, owner, otherAccount };
  }

  describe("Deployment", function () {

    it("Deployment  tokens ", async function () {

      const { cpamm, tokenA, tokenB, owner, otherAccount } = await loadFixture(deployContract)


      expect(await cpamm.tokenA()).to.equal(tokenA.address)
      expect(await cpamm.tokenB()).to.equal(tokenB.address)

    });


  });

  describe("AMM", function () {

    describe("swap", function () {

      const amountA = ethers.utils.parseEther("1");
      const amountB = ethers.utils.parseEther("10");
      const amountIn = ethers.utils.parseEther("1");

      beforeEach(async function () {
        const { cpamm, tokenA, tokenB, owner, otherAccount } = await loadFixture(deployContract);



        // Add liquidity
        await tokenA.approve(cpamm.address, amountA);
        await tokenB.approve(cpamm.address, amountB);
        await cpamm.addLiquidity(amountA, amountB);

        //aprove in 
        await tokenB.approve(cpamm.address, amountIn)

        await tokenA.transfer(otherAccount.address, amountIn)

        await tokenA.connect(otherAccount).approve(cpamm.address, amountIn)

        // DeadLine
        const deadline = 1 + await time.latest();
        this.currentTest.fixture = { cpamm, tokenA, tokenB, owner, deadline, otherAccount };
      });


      it("Swap token B", async function () {



        const { cpamm, tokenA, tokenB, owner, deadline } = this.test.fixture;


        const out = await cpamm.swap(tokenB.address, amountIn, 0, deadline);

        const tokenBalanceA = await cpamm.balanceTokenA()
        const tokenBalanceB = await cpamm.balanceTokenB()

        const amountOut = amountA.sub(tokenBalanceB)
        console.log("OUT....")
        //console.log(out) 
        const totalB = await tokenB.balanceOf(owner.address);

        console.log(totalB)


      });

      it("Swap token A", async function () {

        const dv = ethers.utils.parseEther("1")
        const { cpamm, tokenA, tokenB, owner, deadline, otherAccount } = this.test.fixture;


        const tokenBalanceA = await cpamm.balanceTokenA()
        const tokenBalanceB = await cpamm.balanceTokenB()

        console.log("ANTES SWAP:")
        const totalA1 = await tokenA.balanceOf(otherAccount.address)
        console.log(totalA1.div(dv))
        const out = await cpamm.connect(otherAccount).swap(tokenA.address, amountIn, 0, deadline);

        const amountOut = tokenBalanceB.sub(amountIn)
        console.log("OUT....")
        console.log(amountOut)
        const totalA = await tokenA.balanceOf(cpamm.address);
        console.log(totalA.div(dv))
        console.log("-------------------------------")

        const totalAO = await tokenA.balanceOf(otherAccount.address);
        console.log(totalAO.div(dv))

        const totalBO = await tokenB.balanceOf(otherAccount.address);
        console.log(totalBO.div(dv))
        console.log("-------------------------------")

        console.log("")
        console.log(await tokenA.totalSupply())
        console.log("-------------------------------")


      });

      it("Swap token 3", async function () {



      });
    });

    describe("addLiquidity", function () {

      const amountA = ethers.utils.parseEther("10");
      const amountB = ethers.utils.parseEther("1000");

      beforeEach(async function () {
        const { cpamm, tokenA, tokenB, owner } = await loadFixture(deployContract);

        await tokenA.approve(cpamm.address, amountA);
        await tokenB.approve(cpamm.address, amountB);

        this.currentTest.fixture = { cpamm, tokenA, tokenB, owner };
      });


      it("addLiquidity 1 ", async function () {

        const { cpamm, tokenA, tokenB, owner } = this.test.fixture
        await cpamm.addLiquidity(amountA, amountB)

        expect(await cpamm.balanceTokenA()).to.equal(amountA);
        expect(await cpamm.balanceTokenB()).to.equal(amountB);



      });
    });

    describe("removeLiquidity", function () {

      it("removeLiquidity 1 ", async function () {


      });
    });
  });
});

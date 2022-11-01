

# Aula 07 - DEX - Programadores
### Use esse repositório de ponto de partida: https://github.com/joaoavf/amm

1. Adicione proteção de slippage (minAmountOut)
2. Adicione o time lock (deadline)
3. Adicione a fee (0.3%) para os provedores de liquidez
4. Transforme um contrato em uma token ERC20 e associe o mint ao addLiquidity e o burn ao removeLiquidity()

### Um bom recurso é o repositório da UniswapV2: https://github.com/Uniswap/v2-core/tree/master/contracts 




# Ref. 

## Aula 7 LIFT Learning - DEX (Prof. convidado João Ferreira) 
https://www.youtube.com/watch?v=UTyJBmcU1bw


## Aula slides  
https://docs.google.com/presentation/d/1U_vrh2vLuvXr59IVFXONGGQE7RXJ_Rcs47ZYOD3V4_4/edit#slide=id.g1477972dca2_0_441

## What is an Automated Market Maker? (Liquidity Pool Algorithm)
https://www.youtube.com/watch?v=1PbZMudPP5E


## Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```


npx hardhat verify --network matic 0x703B891dcF731D2Ac54d6a326Cd3c8ee0feF11BB --contract contracts/CPAMM.sol:CPAMM    0xfDCA5bC0315Bb8e1fcCf28f9B35f00c9D018b4f6 0x489Bc08d71A36AeaB2Cd05a53A5a0f1F45b5C07E
import Web3 from 'web3';
import Provider from '@truffle/hdwallet-provider';
import 'dotenv/config';
import contractABI from './contract';

const contractAddress = '0x9BdB5fcc80A49640c7872ac089Cc0e00A98451B6';
const privateKey: any = process.env.PRIVATE_KEY;
const myAddress = process.env.ADDRESS;
const wmaticTokenAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';

const depositMatic = async () => {
  const provider = new Provider(
    privateKey,
    'https://polygon-mainnet.g.alchemy.com/v2/ic9p5HhMYTZAg4p1KB7hAkgC-OpWUVv0'
  );
  const web3 = new Web3(provider);
  const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
  try {
    const tx = await contractInstance.methods.depositETH(
      wmaticTokenAddress,
      myAddress,
      0
    );
    const receipt = await tx.send({
      from: myAddress,
      value: 1000000000000000000, //1 MATIC
      gasPrice: 34000000000,
    });
    console.log(`Transaction hash: ${receipt.transactionHash}`);
  } catch (err) {
    console.log(err);
  }
};

depositMatic();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const ethers = require("ethers");
const tokenAbi = require("./ABI/abi.json");
const dotenv = require("dotenv");
dotenv.config();
const data = require("./wallet.json");

const result = [];
data.map(async (add) => {
  await result.push(add.address);
});

const provider = new ethers.JsonRpcProvider("https://blockchain.ramestta.com");
const signer = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);

const userPrivateKey = (privatekey) => {
  const signer = new ethers.Wallet(privatekey, provider);
  return signer;
};

// // TransferNative coin without contract
const transferNativeRama = async (address, signer) => {
  const tx = await signer.sendTransaction({
    // from: signer.address,
    to: address,
    value: ethers.parseEther("0.00009"),
  });
  console.log("txHash: ", tx.hash);
};

const TransferNativeRama = async (address) => {
  const tx = await signer.sendTransaction({
    from: signer.address,
    to: address,
    value: ethers.parseEther("0.0001"),
    // gasPrice: ethers.toBigInt("7000000"),
  });
  console.log("txHash: ", tx.hash);
};
const startTransfer = async () => {
  for (let item of data) {
   
    const signer = userPrivateKey(item.privateKey);
    console.log(
      "signer Native Balance",
      ethers.formatEther(
        await provider.getBalance("0x428652A5510370a10BBb5767878608b1d29a9217")
      )
    );
    await transferNativeRama(
      "0x428652A5510370a10BBb5767878608b1d29a9217",
      signer
    );

    // await TransferNativeRama(item.address);
  }
};
(async () => {
  await startTransfer();
})();



const read = require('readline');

const rl = read.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (line) => {
    
    const command = line.toLowerCase().trim()
    
    switch(command) 
    {
      case "!xrp":
        donateXRP();
        break;
      
        case "?sol":
        testSol();
        break;

        case "!sol":
          donateSol();
          break;

        case("=gd"):
          gd_balance();
          break;

        default:
          break; //options: //xrp //sol 
    }

  });

  async function gd_balance() {

    const {clusterApiUrl, Connection, Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey} = require("@solana/web3.js");
 
    const giveDirectly = new PublicKey("pWvDXKu6CpbKKvKQkZvDA66hgsTB6X2AgFxksYogHLV")
    
    console.log(giveDirectly)
    
    let connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

    let balance = await connection.getBalance(giveDirectly);
  
    console.log(giveDirectly + ":" + balance)

  }


async function donateXRP()
{
  const xrpl = require("xrpl");
  
  const client = new xrpl.Client("wss://xrplcluster.com");

  await client.connect()

  const secret = "";
  const account = "rLLSeASKDRhyPJoLpXFJV3MEVJCThtWLqC"
  const destination = "XV3oNHx95sqdCkTDCBCVsVeuBmvh2ep8mXLvLVPgbsYPxS6";

  const wallet = xrpl.Wallet.fromSeed(secret);
  
  console.log(wallet.address);
  
  console.log(await client.getXrpBalance(account));
       
  const transaction = await client.autofill(
  {
        "TransactionType": "Payment",
        "Account": account,
        "Amount": "1600", 
        "Destination": destination
  });

  console.log(transaction);

  const tx = await client.submitAndWait(transaction, { wallet: wallet });
  
  console.log(tx);
        
  await client.disconnect();

}

async function testSol()
{
  const {sendAndConfirmTransaction, clusterApiUrl, Connection, Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL} = require("@solana/web3.js");

  const fromKeypair = Keypair.generate();
  const toKeypair = Keypair.generate();

  let connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  let airdropSignature = await connection.requestAirdrop(
    fromKeypair.publicKey,
    LAMPORTS_PER_SOL
  );

  logSolAccount(fromKeypair.publicKey, "devnet")

  await new Promise(resolve => setTimeout(resolve, 10000));

  airdropSignature = await connection.requestAirdrop(
    toKeypair.publicKey,
    LAMPORTS_PER_SOL
  );

  balance = await connection.getBalance(toKeypair.publicKey);

  logSolAccount(toKeypair.publicKey, "devnet")

  const lamportsToSend = 1000000;

  const transferTransaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toKeypair.publicKey,
      lamports: lamportsToSend,
    })
  );

  const result = await sendAndConfirmTransaction(connection, transferTransaction, [
    fromKeypair,
  ]);

  logSolTx(result, "devnet");
}

async function donateSol()
{
  const {sendAndConfirmTransaction, clusterApiUrl, Connection, Keypair, Transaction, SystemProgram, LAMPORTS_PER_SOL} = require("@solana/web3.js");
  
  const fromSecretKey = Uint8Array.from( )
  const fromKeypair = Keypair.fromSecretKey(fromSecretKey)
  const toKeypair = Keypair.generate();

  let connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  logSolAccount(fromKeypair.publicKey, "devnet")

//  await new Promise(resolve => setTimeout(resolve, 10000));

  airdropSignature = await connection.requestAirdrop(
    toKeypair.publicKey,
    LAMPORTS_PER_SOL
  );

  balance = await connection.getBalance(toKeypair.publicKey);

  logSolAccount(toKeypair.publicKey, "devnet")

  const lamportsToSend = 1000000;

  const transferTransaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toKeypair.publicKey,
      lamports: lamportsToSend,
    })
  );

  const result = await sendAndConfirmTransaction(connection, transferTransaction, [
    fromKeypair,
  ]);

  logSolTx(result, "devnet");
}


function logSolTx(id,cluster) {
  console.log("https://explorer.solana.com/tx/" + id + "?cluster=" + cluster);
}

function logSolAccount(id,cluster) {
  console.log("https://explorer.solana.com/address/" + id + "?cluster=" + cluster)
}`
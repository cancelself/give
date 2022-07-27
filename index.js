console.log("meditate2donate");

const read = require('readline');

const rl = read.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('line', (line) => {
    
    const command = line.toLowerCase().trim()
    
    switch(command) 
    {
      case "xrp":
        donateXRP();
        break;
      case "sol":
        donateSol();
        break;
        default:
          break; //options: //xrp //sol 
    }

  });

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

async function donateSol()
{
  
}


   
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

        default:
          break; //xrp //sol 
    }

  });

async function donateXRP()
{
  const xrpl = require("xrpl");
  const client = new xrpl.Client("wss://xrplcluster.com");

  client.connect();

  const secret = "";
  const destination = "rDsbeomae4FXwgQTJp9Rs64Qg9vDiTCdBv";

  const wallet = xrpl.Wallet.fromSeed(secret);
  console.log(wallet.address);

  const transaction = client.autofill(
  {
        "TransactionType": "Payment",
        "Account": wallet.address,
        //"LastLedgerSequence": client.getLedgerIndex() + 75, 
        "Amount": 1600,
        "Destination": destination
  });

  const tx = client.submitAndWait(transaction, { wallet: wallet });
  console.log(tx);
        
  client.disconnect();

}

async function donateSol()
{
  
}


   
## @shakesco/automation

This repository makes it easy for businesss to interact with their 
autopayment contract and enable automation!

To install:
```shell
npm i @shakesco/automation
```

After installing:
```javascript
const shakesco = require("@shakesco/automation");
const { TestAutomation, delegateAccount, Automation } = shakesco;
const { providers, Wallet, utils } = shakesco
```

Use the `TestAutomation` for testing before going live.

When using `TestAutomation`:
```javascript
  const provider = new providers.JsonRpcProvider(process.env.MATICRPC_URL);

  const wallet = new Wallet(process.env.MUMBAIPRIVKEY, provider);

  const shakescocontract = new TestAutomation(wallet);

  const checkRequest = await shakescocontract.isRequested(delegateAccount);
  console.log(checkRequest);
```
> ⚠️ The __privatekey__ and __provider__ for testing __MUST BE IN MUMBAI__. Visit [__Alchemy__](https://dashboard.alchemy.com "Alchemy")

When ready to move live:
```javascript
  const address = /*Initialize your automation address*/

  const shakescocontract = new Automation(address);

  //Period in seconds
  const period = "86400" //1 week
  const amount = utils.parseEther("0.002") //amount to request regularly
  const delegateAddress = /*Ask user for their delegate account(Address,email or phone)*/

  const requestUser = await shakescocontract.requestUser(delegateAddress,period,amount);
  console.log(requestUser);//Requested user successfully
```

ENJOY😁!!!
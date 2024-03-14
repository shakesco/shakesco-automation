## @shakesco/automation

This repository makes it easy for businesss to interact with their 
autopayment contract and enable automation!

Before intergrating please read this [short explanation on how the system works](./system.md "explain shakespay automation"). It will help you understand how you may want to setup your autopayments.

To install:
```shell
npm i @shakesco/automation
```

After installing:
```javascript
const shakesco = require("@shakesco/automation");
const { TestAutomation, delegateAccount, Automation } = shakesco;
const { JsonRpcProvider, Wallet, parseUnits } = shakesco;
```

Use the `TestAutomation` for testing before going live.

When using `TestAutomation`:
```javascript
  const provider = new JsonRpcProvider(process.env.MATICRPC_URL);

  const wallet = new Wallet(process.env.MUMBAIPRIVKEY, provider);

  const shakescocontract = new TestAutomation(wallet);

  const checkRequest = await shakescocontract.isRequested(delegateAccount);
  console.log(checkRequest);
```
> ⚠️ The __privatekey__ and __provider__ for testing __MUST BE IN MUMBAI__. Visit [__Alchemy__](https://dashboard.alchemy.com "Alchemy")

When ready to move live:
>📓NOTE: Visit [__Shakesco__](https://shakesco.netlify.app/ "Shakeco") to get fee rates and api key.

To check if a user has been requested before sending the request:
```javascript
  const address = /*Initialize your automation address*/
  
  let delegateAddress = /*Request user for their info: Email or address or their username(SNS)*/ 

  const shakescocontract = new Automation(address, process.env.SHAKESCOAPIKEY);

  const requestUser = await shakescocontract.isRequested(delegateAddress);
  console.log(requestUser);//"true"
```
>📓NOTE: Please note that boolean values are returned as __STRINGS__


Send request to user. Ask user for their email or delegate address they registered with us.
```javascript
  const address = /* Initialize your automation address. Can be found in your dashboard https://shakesco.netlify.app/ */

  const shakescocontract = new Automation(address, process.env.SHAKESCOAPIKEY);

  const period = "604800" //1 week

  const amount = parseUnits("20", 18); //amount to request regularly 

  const delegateAddress = /*Ask user/business for their delegate account(Address or email or username(SNS))*/

  const requestUser = await shakescocontract.requestUser(delegateAddress,period,amount);//request user

  const requestBusiness = await shakescocontract.requestBusinessToken(delegateAddress,period,amount);//or request business

  console.log(requestUser);//Requested user successfully
  console.log(requestBusiness);//Requested business successfully
```
>📓NOTE: Period should be in seconds. Amount should be in usd. Eg: "20" is in usd


To check if user has made payment or not:
```javascript
  const address = /*Initialize your automation address*/
  
  let delegateAddress = /*Request user for their info: Email or address or username(SNS)*/ 

  const shakescocontract = new Automation(address, process.env.SHAKESCOAPIKEY);

  const requestUser = await shakescocontract.hasPaid(delegateAddress);
  console.log(requestUser);//"true"
```
>⚠️WARNING: Check the above step where you are offering your service. Otherwise you will
> offer service for free without knowing.

We will be deprecating stablecoins(USDT) in the near future and adding Ethereum. We encourage the use of these assets rather than stablecoins.  

We also don't offer daily automation. If your business requires daily automation [please reach out to us](https://shakesco.netlify.app/contact "Shakeco")!

ENJOY YOUR FINANCIAL FREEDOM😁!!!
# @shakesco/automation

This repository makes it easy for businesses to interact with their
auto-payment contract and enable automation!

Before intergrating please read this [short explanation on how the system works](https://docs.shakesco.com/docs/autopayments/integration/ "explain shakespay automation"). It will help you understand how you may want to setup your autopayments.

To install:

```shell
npm i @shakesco/automation
```

After installing:

```javascript
const { Automation, parseUnits } = require("@shakesco/automation");
```

## Test

Before getting started, send a test request to make sure everthing is okay.

First request a delegate address:

```javascript
  const shakescocontract = new Automation(
    your_smart_wallet_address, 
    process.env.SHAKESCOAPIKEY,
    "11155111"
  );

  const your_smart_wallet_address = "";

  const requestAddress = await shakescocontract.testDelegateAddressBuss(); //request test address

  console.log(requestAddress);
  // {
  //   id: "1",
  //   test_delegate_address: "0x472ef8282b420396ad307cb89f542e60b1dec1a1",
  // }
```

Then send a request:

```javascript
  const address = ""; // Your test delegate address you requested above

  const shakescocontract = new Automation(
  /* Requested delegate address above*/;,
  process.env.SHAKESCOAPIKEY, 
  "11155111");

  const period = "86400" //1 day

  const delegateAddress = 

  const requestUser = await shakescocontract.requestUser(
    "0x309E7d835ccE6E74BC72A2E523fa7f79FFC0d413", // parse this address 
    "", 
    period, 
    "", 
    false, 
    [], 
    []);//request user

  console.log(requestUser);//Requested user successfully
```

>📓 __NOTE__: Check if the request is sent to your Shakespay app. If you request business check on Business account side, if you request user, check on Personal account side.

## Live

When ready to move live:

>📓 __NOTE__: Visit __Shakesco__ to [get fee rates](https://shakesco.com/pricing "Shakesco") and [api key](https://users.shakesco.com "Log in").

Send request to user. Ask user for delegate address/ Shakespay card/ business card address.

```javascript
  const address = /* Initialize your automation address. Can be found in your dashboard https://users.shakesco.com */

  const shakescocontract = new Automation(address, process.env.SHAKESCOAPIKEY, "1");

  const period = "604800" //1 week

  const amount = parseUnits("20", 18); //amount to request regularly 

  const delegateAddress = /*Ask user/business for their Shakespay card/delegate/business card ONLY.*/

  const requestUser = await shakescocontract.requestUser(delegateAddress, "", period, amount, false, [], []);//request user

  const requestBusiness = await shakescocontract.requestBusiness(delegateAddress,"", period, amount);//or request business

  console.log(requestUser);//Requested user successfully
  console.log(requestBusiness);//Requested business successfully
```

>📓NOTE: Period should be in seconds. Amount should be in usd. Eg: "20" is in usd. Boolean values are returned as __STRINGS__

When you want to request split payment:

```javascript
  const address = /* Initialize your automation/Shakespay auto/business auto address. Can be found in your dashboard https://users.shakesco.com */

  const shakescocontract = new Automation(address, process.env.SHAKESCOAPIKEY, "1");

  const period = "604800" //1 week

  const mainAddress = /** Users Shakespay card/delegate/business card ONLY.*/

  const friends = ["", ""]; //request friend details. Shakespay card/delegate/business card ONLY.

  const friendsAmount = [parseUnits("10", 18), parseUnits("10", 18)];

  const mainamount = parseUnits("10", 18);
  
  const requestUser = await shakescocontract.requestUser(mainAddress, "", period, mainamount, true, friends, friendsAmount);//request user

  console.log(requestUser); //Requested user successfully (Returns for mainAddress only)

  //so check the rest, "friends".
  for (let i = 0; i < friends.length; i++) {
    const isrequested = await shakescocontract.isRequested(friends[i]);
    console.log(isrequested); // true / false
  }
```

When you want to request a token:

```javascript
  const address = /* Initialize your automation address. Can be found in your dashboard https://users.shakesco.com */

  const shakescocontract = new Automation(address, process.env.SHAKESCOAPIKEY, "137");

  const period = "604800" //1 week

  const amount = parseUnits("20", 18); //amount to request regularly 

  const delegateAddress = /*Ask user/business for their Shakespay card/delegate/business card ONLY.*/

  const tokenAddress = "" //Make sure it is checksummed

  const requestUser = await shakescocontract.requestUser(delegateAddress, tokenAddress, period, amount, false, [], []);//request user

  const requestBusiness = await shakescocontract.requestBusiness(delegateAddress, tokenAddress, period, amount);//or request business

  console.log(requestUser);//Requested user successfully
  console.log(requestBusiness);//Requested business successfully
```

To check if user has made payment or not:

```javascript
  const address = /*Initialize your automation address*/
  
  let delegateAddress = /*Request user for their info: Shakespay card/delegate/business card address ONLY*/

  const shakescocontract = new Automation(address, process.env.SHAKESCOAPIKEY, "137");

  const requestUser = await shakescocontract.hasPaid(delegateAddress);
  console.log(requestUser);//"true"
```

>⚠️WARNING: Check the above step where you are offering your service. Otherwise you will
> offer service for free without knowing. For split auto-payment, service is only given to 'group leader'. So always query them alone, the rest will just return false.

We also don't offer daily automation. If your business requires daily automation [please reach out to us](https://shakesco.com/contact "Shakesco")!

ENJOY YOUR FINANCIAL FREEDOM😁!!!

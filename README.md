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
const { Automation, parseUnits } = shakesco;
```

When ready to move live:
>📓NOTE: Visit [__Shakesco__](https://shakespay.shakesco.com/pricing "Shakeco") to get fee rates and api key.

Send request to user. Ask user for delegate address/ Shakespay card/ business card address.
```javascript
  const address = /* Initialize your automation address. Can be found in your dashboard https://users.shakesco.com */

  const shakescocontract = new Automation(address, process.env.SHAKESCOAPIKEY, "Ethereum");

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

  const shakescocontract = new Automation(address, process.env.SHAKESCOAPIKEY);

  const period = "604800" //1 week

  const totalAmount = parseUnits("30", 18); //amount to request regularly 

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

  const shakescocontract = new Automation(address, process.env.SHAKESCOAPIKEY, "Ethereum");

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

  const shakescocontract = new Automation(address, process.env.SHAKESCOAPIKEY);

  const requestUser = await shakescocontract.hasPaid(delegateAddress);
  console.log(requestUser);//"true"
```
>⚠️WARNING: Check the above step where you are offering your service. Otherwise you will
> offer service for free without knowing. For split auto-payment, service is only given to 'group leader'. So always query them alone, the rest will just return false.

We also don't offer daily automation. If your business requires daily automation [please reach out to us](https://shakesco.netlify.app/contact "Shakeco")!

ENJOY YOUR FINANCIAL FREEDOM😁!!!
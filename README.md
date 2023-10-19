## Shakeco-Package

This repository makes it easy for businesss to interact with their 
autopayment contract and enable automation!

To install:
```shell
npm i shakesco-package
```

After installing:
```javascript
const shakesco = require("./index");
const { TestAutomation, delegateAccount, Automation } = shakesco;
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
Feel free to use either ethers or web3js to provide a signer/provider.

> ⚠️ The __privatekey__ and __provider__ for testing __MUST BE IN MUMBAI__.

When ready to move live:
```javascript
  const provider = new providers.JsonRpcProvider(process.env.MATICRPC_URL);

  const wallet = new Wallet(process.env.MUMBAIPRIVKEY, provider);

  const shakescocontract = new Automation(wallet);

  const checkRequest = await shakescocontract.isRequested(delegateAccount);
  console.log(checkRequest);
```

ENJOY😁!!!
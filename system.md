## Shakesco automation system
- [Shakesco automation system](#shakesco-automation-system)
  - [Let's start with how autopayments works:](#lets-start-with-how-autopayments-works)
  - [Problem:](#problem)
  - [Solution:](#solution)
  - [How shakespay works:](#how-shakespay-works)
    - [Requests](#requests)
    - [Payment](#payment)
    - [Period](#period)
    - [Amount](#amount)
    - [Discount period.](#discount-period)
    - [Grace period](#grace-period)

### Let's start with how autopayments works:
For autopayments to be possible their must be a pull and a push. When you give [__Stripe__](https://stripe.com/ "stripe") your [__Visa__](https://www.visa.com/ "visa") or [__MasterCard__](https://www.mastercard.com/global/en.html "mastercard") details you are actually giving them permission to pull from your account. The system will think that you are pushing payment but this has actually been executed by stripe. This system has been successful in traditional finance but with some drawbacks. One you are trusting the third party using stripe to facilitate auto payments. You are trusting that they have exceptional security and will not leak your card details to attackers. Two, the stripe system is centralized and not censorship-resistant, they perform the pull/push payments. If stripe falls, not that we are hoping for so, many companies such as X or OpenAi will have to look for alternative.

### Problem: 
So we are trying to solve a number of issues with this system. We are trying to create a permissionless, censorship-resistant, self-custody and decentralized system. Permissionless in that anyone with an internet connection can perform autopayments, we cannot sensor them, we don't control it and the self-custody part makes it interesting in that you can set up autopayments with anyone not just restricted to businesses.
Ethereum has two accounts, EOA(Externally Owned Accounts) and contract accounts. EOAs are not programmable so creating an automation system is not possible. Even if we did setup a contract that the EOA would deploy and control, it would be cumbersome for the payer because we would require them to sign everytime the system wants to perform auto-payments. Contract accounts on the other hand cannot initiate a transaction. They must originate from the EOA. 

### Solution:
Account abstraction is an Ethereum standard that aims to turn every account on Ethereum to a programmable account. This standard will help us solve the problem with Ethereum accounts. We can now create a contract that doesn't care about the how(signature) but cares about the who(address) that's initiating auto-payments. This helps us make the system decentralized in that not just one entity is making the push/pull calls and the user still keeps custody of his private information(private keys). 

### How shakespay works:
Shakespay works as explained above but we made some changes due to our Security architecture. Users and businesses can set up autopayments the same way they do, or even much easier, with other payment infrastructure. You ask the payee for their identity, then you set the amount and period. Here we are going to explain how user to business or business to business works:

#### Requests
For you to start pulling payments, you need to make a pull request. So you use the request method, `requestUser` or `requestBusinessToken`, from our package to request the user and await approval(Tell user/business to accept request from device). The reason we did this is because your wallet is guarded by TSS(Threshold Signature Scheme) meaning when creating a wallet, you went through a protocol that split shares between you and a remote server. This will make it cumbersome for your ui to integrate so we took this approach.
>⚠️Please check this method when requesting user. It will fail if already requested.

#### Payment
To check if payment was made, use the `hasPaid` method. 
>⚠️Please check this method anywhere you are offering the service. This is the only way to check if you should release service or not.

#### Period
Period should be given in seconds. If you want to do monthly, set period as `2592000`. (Assuming you want 30 day period)

>⚠️Please enter period in seconds.

#### Amount
Amount should be given in units. So if you want 20 usd, enter `20`. Make sure to use `parseUnits` as directed in the docs.

>⚠️Please enter amount in usd. Convert from local currency accordingly.

#### Discount period.
When deploying autopayments you had to enter a discount period. A discount period is a period when users can enjoy your service to test it out, free trial. They will be required to pay after the end of the free trial. This cannot be change to avoid manipulation by companies. Users CANNOT manipulate this with their account. It is only offered once. We are looking at how we can make it even more efficient that you don't have to worry about users creating numerous accounts to get free tier all the time.

#### Grace period
Grace period is the period after pay day that the user can enjoy your services before they are cut off if they don't make payment. If you have deployed with or without it okay because you can edit. 

>⚠️ Be careful with this value. Because we don't make the push/pull calls, to make the system decentralized we rely on a network of node through [__chainlink__](https://automation.chain.link/ "chainlink") to make these calls, we put intervals of 4 days/345600 sec. So meaning if you put a period less than 4 days/345600 sec as your grace period the system will work fine. But if you put like 7days/ 604800 sec the system will work but will with a delay on some accounts. Decide the tradeoff. 

>📓Once we go to daily pull/push request you will be alerted so you don't have to be stuck on this dilemma.

>📓Please note that we will deprecate Tether USDt. Your account will hold all the received USDt but it won't be pulled anymore by the automation system or be shown on the Shakespay UI. We will also be adding Ethereum, we want to see how the system works on Polygon because this is the first self-custody autopayment system on EVM. When we deprecate Tether USDt you can remain on the old system that pulls Tether USDt or move to pulling Ethereum or Polygon.

>⚠️We advise you do the latter. USDT is centralized, the funds are not fully self-custody. Shakespay cannot assure ownership as we would with Ethereum or Polygon.

>📓We also don't offer Daily intervals, if you require 1 or 2 day intervals [reach out](https://shakesco.netlify.app/contact "Shakeco")!
## Shakesco automation system
- [Shakesco automation system](#shakesco-automation-system)
  - [Let's start with how autopayments works:](#lets-start-with-how-autopayments-works)
  - [Problem:](#problem)
  - [Solution:](#solution)
  - [How shakespay works:](#how-shakespay-works)
    - [Autopayment works only once!](#autopayment-works-only-once)
    - [Split](#split)
      - [Things to note on split](#things-to-note-on-split)
    - [Changing amount](#changing-amount)
    - [Changing period](#changing-period)
    - [Requests](#requests)
    - [Identity](#identity)
    - [Payment](#payment)
    - [Period](#period)
    - [Amount](#amount)
    - [Fees](#fees)
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

#### Autopayment works only once!
The autopayment system is a bit different from the traditional system. In the traditional system if Bob gives Alice his card, alice will use their card to perform autopayment in your business and Bob can do the same. In this system, if Bob gives Alice their address, service will only be given to Bob. 

>⚠️ If an attacker knows bob registered `bob.sns` as his identity, they may use this to mask themselves as `bob.sns` or even use the email(Should be noted that user can just turn of request and that the request will __NEVER__ go to the attacker). We have taken action to make sure they don't affect bob's subscription. But if bob comes to register after the attacker, your business may offer service to both. It is advised to use __`delegate address`__ instead of email or identity. If your application allows `connect wallet`, `.sns` is the best option. If you application registers users with email, then just take that email and check for the user in our record.

#### Split
Split payments for recurring payments are here! This is only for C2B transactions. `requestUser` is now editted to allow split payments. When you are requesting users do they want to split payment with their friends? Set `wantstosplit` to true or false accordingly. If true populate `split` and `splitamount` with the number of users who will be participating in the split payment. Make sure they are the same length. 

##### Things to note on split
⚠️ This is important please note the following

- Make sure `split` and `splitamount` are the same length.
- The `address` parameter in `requestUser` is the 'group leader' in the split payment. If all split members pay, the service will ONLY be given to `address`.
- `splitamount` should be set by you to avoid bad user experience. If their are 3 split participants + the 'group leader' just say eg: 20 / 4, push 5 to `splitamount` array 3 times and then set the other 5 on the `amount` parameter.
- Check that all participants have been requested. Use `isRequested` to loop through and check that all participants have been requested.
- Be careful with the number of participants you allow. A small number of participants is advised so that your business does not get less value. Split payment is for services that previously had one person paying while  others didn't have to pay as the payer could just share the log in information with them. With split payment, each would have to pay but the total amount will be split among them. This will be more beneficial to your business than the traditional system!
- If you want to request users under split payment, your need to request each one of them again. Note that changing the participants or amount will require the participants to accept the request again. The system will not automatically continue to pull. 
- Participants will need to work together to make sure their accounts are funded for split autopayments to work. If some take advantage of others then they can opt out and move to other groups or move to single autopayments.
- There is no grace period for split participants.

#### Changing amount
>📓 When you want to change price, feel free to do so. The service will still be given to the user until the end of the payment period. They will be required to update and start paying with the new amount so that service can be provided. 

#### Changing period
>📓 When you want to change period, you will have to send another request with new period. The user/business will need to accept again and pay at that time to start new period.

⚠️ User/business will have to accept change in price and amount. They system doesn't allow automatic updates. You will have to request user to accept from mobile

#### Requests
For you to start pulling payments, you need to make a pull request. So you use the request method, `requestUser` or `requestBusiness`, from our package to request the user and await approval(Tell user/business to accept request from device). The reason we did this is because your wallet is guarded by TSS(Threshold Signature Scheme) meaning when creating a wallet, you went through a protocol that split shares between you and a remote server. This will make it cumbersome for your ui to integrate so we took this approach.

>If you want to request the user/business again, its okay to do so. This will mostly happened when you want to change amount. The service will continue to be offered up until the end of the period, they will then be needed to accept the changes you have made to the amount. 📓 Please note that the user will need to approve this changes. The system will not automatically continue to pull 

#### Identity
>⚠️When user is giving their username, please check if it has `.sns` suffix. __If it doesn't please add.__ 

#### Payment
To check if payment was made, use the `hasPaid` method. 
>⚠️Please check this method anywhere you are offering the service. This is the only way to check if you should release service or not.

#### Period
Period should be given in seconds. If you want to do monthly, set period as `2592000`. (Assuming you want 30 day period)

>⚠️Please enter period in seconds. Also don't enter a period less that 2 days/172800 sec because calls are made after 2 days. Eg: Putting 1days/86400 sec, you are telling the system to pull everyday, but the system will only pull after two days. If you require 1 day intervals [reach out](https://shakesco.netlify.app/contact "Shakeco")!

#### Amount
Amount should be given in units. So if you want 20 usd, enter `20`. Make sure to use `parseUnits` as directed in the docs.

>⚠️Please enter amount in usd. Convert from local currency accordingly.

#### Fees
>📓NOTE: Please note fees. For every pull from a user a 3% fee is charged on the price and for every business pull a 5% fee is charged on the price.

#### Discount period.
When deploying autopayments you had to enter a discount period. A discount period is a period when users can enjoy your service to test it out, free trial. They will be required to pay after the end of the free trial. This cannot be change to avoid manipulation by companies. Users CANNOT manipulate this with their account. It is only offered once. We are looking at how we can make it even more efficient that you don't have to worry about users creating numerous accounts to get free tier all the time.

#### Grace period
Grace period is the period after pay day that the user can enjoy your services before they are cut off if they don't make payment. If you have deployed with or without it okay because you can edit. 

>📓We also don't offer Daily intervals, if you require 1 [reach out](https://shakesco.netlify.app/contact "Shakeco")!
//DONT EDIT THIS FILE
const ethers = require("ethers");
const WebSocket = require("ws");

const PORT = `8022`;
const IP = "shakesco.com";

const abi = [
  {
    type: "function",
    name: "requestPermissionUsers",
    constant: false,
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "address",
        name: "_from",
      },
      {
        type: "uint256",
        name: "_period",
      },
      {
        type: "uint256",
        name: "_amount",
      },
      {
        type: "bool",
        name: "wanttosplit",
      },
      {
        type: "address[]",
        name: "split",
      },
      {
        type: "uint256[]",
        name: "splitamount",
      },
    ],
    outputs: [],
  },
];

class Automation {
  /**
   * @notice Create Automation instance to interact with
   * @param address Your automation address
   * @param apikey Your api key provided by shakesco for authorization
   * @param network The network you want to perform operations on: "Ethereum" or "Polygon"
   */
  constructor(address, apikey, network) {
    this._automation = new ethers.Contract(address, abi);
    this._apikey = apikey;
    this._network = network;
  }

  /**
   * @notice Request permission to pull payment from the user
   * @param address The address to request funds from.
   * @param tokenAddress The token address to request funds from.
   * @param period The interval that payment will be requested
   * @param amount Amount to request
   * @param wantstosplit Does the user want to split payment with friends
   * @param split The users he want to split payment with.
   * @param splitamount The amount each should send. Should be set by you
   */

  async requestUser(
    address,
    tokenAddress,
    period,
    amount,
    wantstosplit,
    split,
    splitamount
  ) {
    const ws = new WebSocket(`wss://${IP}:${PORT}/ws`);
    const data = {
      clientaddress: await this._automation.getAddress(),
      event: "request-user",
      period: period,
      token: tokenAddress,
      amount: amount.toString(),
      address: address,
      apikey: this._apikey,
      split: wantstosplit,
      splitAccounts: split,
      splitAmounts: splitamount,
      network: this._network,
    };

    const checkRequest = await new Promise((resolve) => {
      ws.on("open", () => {
        ws.send(JSON.stringify(data));
      });

      ws.on("message", (message) => {
        resolve(message.toString());
      });
    });
    return await checkRequest;
  }

  /**
   * @notice Request permission to pull payment from the business
   * @param address The address to request funds from.
   * @param tokenAddress The token address to request funds from.
   * @param period The interval that payment will be requested
   * @param amount Amount to request
   */

  async requestBusiness(address, tokenAddress, period, amount) {
    const ws = new WebSocket(`wss://${IP}:${PORT}/ws`);
    const data = {
      clientaddress: await this._automation.getAddress(),
      event: "request-business",
      token: tokenAddress,
      period: period,
      amount: amount.toString(),
      address: address,
      apikey: this._apikey,
      network: this._network,
    };

    const checkRequest = await new Promise((resolve) => {
      ws.on("open", () => {
        ws.send(JSON.stringify(data));
      });

      ws.on("message", (message) => {
        resolve(message.toString());
      });
    });
    return await checkRequest;
  }

  /**
   * @notice Check if address has been requested
   * @param address The address to check if it has beeen requested.
   * @returns true or false if the address has been requested or not
   */
  async isRequested(address) {
    const ws = new WebSocket(`wss://${IP}:${PORT}/ws`);
    const data = {
      clientaddress: await this._automation.getAddress(),
      event: "check-request",
      address: address,
      apikey: this._apikey,
      network: this._network,
    };

    const checkRequest = await new Promise((resolve) => {
      ws.on("open", () => {
        ws.send(JSON.stringify(data));
      });

      ws.on("message", (message) => {
        resolve(message.toString());
      });
    });
    return await checkRequest;
  }

  /**
   * @notice Check if address has paid
   * @notice Make sure to call this function where the service you are providing is
   * @param address The address to check if they have made payment.
   * @returns true or false if the address has made payment
   */
  async hasPaid(address) {
    const ws = new WebSocket(`wss://${IP}:${PORT}/ws`);
    const data = {
      clientaddress: await this._automation.getAddress(),
      event: "check-payment",
      address: address,
      apikey: this._apikey,
      network: this._network,
    };

    const checkRequest = await new Promise((resolve) => {
      ws.on("open", () => {
        ws.send(JSON.stringify(data));
      });

      ws.on("message", (message) => {
        resolve(message.toString());
      });
    });
    return await checkRequest;
  }
}

module.exports = Automation;

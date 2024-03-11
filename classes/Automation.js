//DONT EDIT THIS FILE
const ethers = require("ethers");
const WebSocket = require("ws");

const PORT = `8022`;
const IP = "shakesco.com";

const abi = [
  'function requestPermissionUsers(address payable _from, uint256 _period, uint256 _amount, bool wanttosplit, address payable[] calldata split, uint256[] calldata splitamount)',
  'function requestPermissionBusiness(address payable _from, uint256 _period, uint256 _amount)',
  'function getIfPaid(address businessCustomers) view returns (bool)',
  'function getIfRequested(address businessCustomer) view returns (bool)',
]; //prettier-ignore

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
   * @param address The address to request funds from. Can also be email or username
   * @param period The interval that payment will be requested
   * @param amount Amount to request
   * @param wantstosplit Does the user want to split payment with friends
   * @param split The users he want to split payment with. Should be delegate address,email or username
   * @param splitamount The amount each should send. Should be set by you
   */

  async requestUser(address, period, amount, wantstosplit, split, splitamount) {
    const ws = new WebSocket(`wss://${IP}:${PORT}/ws`);
    const data = {
      clientaddress: await this._automation.getAddress(),
      event: "request-user",
      period: period,
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
   * @param address The address to request funds from. Can also be email or username
   * @param period The interval that payment will be requested
   * @param amount Amount to request
   */

  async requestBusiness(address, period, amount) {
    const ws = new WebSocket(`wss://${IP}:${PORT}/ws`);
    const data = {
      clientaddress: await this._automation.getAddress(),
      event: "request-business",
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
   * @param address The address to check if it has beeen requested. Can also be email
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
   * @param address The address to check if they have made payment. Can also be email
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

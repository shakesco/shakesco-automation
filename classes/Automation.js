//DONT EDIT THIS FILE
const ethers = require("ethers");
const WebSocket = require("ws");

const PORT = `8022`;
const IP = "shakesco.com";

const abi = [
  'function requestPermissionUsers(address payable _from, uint256 _period, uint256 _amount)',
  'function requestPermissionUsersToken(address payable _from, address _erc20Address, uint256 _period, uint256 _amount)',
  'function requestPermissionBusiness(address payable _from, uint256 _period, uint256 _amount)',
  'function requestPermissionBusinessToken(address payable _from,address _erc20Address,uint256 _period,uint256 _amount)',
  'function getIfPaid(address businessCustomers) view returns (bool)',
  'function getIfRequested(address businessCustomer) view returns (bool)',
]; //prettier-ignore

class Automation {
  /**
   * @notice Create Automation instance to interact with
   * @param address Your automation address
   * @param apikey Your api key provided by shakesco for authorization
   */
  constructor(address, apikey) {
    this._automation = new ethers.Contract(address, abi);
    this._apikey = apikey;
  }

  /**
   * @notice Request permission to pull payment from the user
   * @param address The address to request funds from. Can also be email
   * @param period The interval that payment will be requested
   * @param amount Amount to request
   */

  async requestUser(address, period, amount) {
    const ws = new WebSocket(`wss://${IP}:${PORT}/ws`);
    const data = {
      clientaddress: await this._automation.getAddress(),
      event: "request-user",
      period: period,
      amount: amount.toString(),
      address: address,
      apikey: this._apikey,
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
   * @notice Request permission to pull payment from the user(Token edition)
   * @param address The address to request funds from. Can also be email
   * @param period The interval that payment will be requested
   * @param amount Amount to request
   */

  async requestUserToken(address, period, amount) {
    const ws = new WebSocket(`wss://${IP}:${PORT}/ws`);
    const data = {
      clientaddress: await this._automation.getAddress(),
      event: "request-user-token",
      period: period,
      amount: amount.toString(),
      address: address,
      apikey: this._apikey,
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
   * @param address The address to request funds from. Can also be email
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
   * @notice Request permission to pull payment from the business(Token edition)
   * @param address The address to request funds from. Can also be email
   * @param period The interval that payment will be requested
   * @param amount Amount to request
   */

  async requestBusinessToken(address, period, amount) {
    const ws = new WebSocket(`wss://${IP}:${PORT}/ws`);
    const data = {
      clientaddress: await this._automation.getAddress(),
      event: "request-business-token",
      period: period,
      amount: amount.toString(),
      address: address,
      apikey: this._apikey,
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

import { ethers } from "ethers";
import WebSocket from "ws";

const PORT = `8022`;
const IP = "shakesco.com";
const protocol = "wss";

const abi: ethers.InterfaceAbi = [];

export class Automation {
  private _automation: ethers.Contract;
  private _apikey: string;
  private _network: string;

  /**
   * @notice Create Automation instance to interact with
   * @param address Your automation address
   * @param apikey Your api key provided by shakesco for authorization
   * @param network The network you want to perform operations on: "Ethereum" or "Polygon"
   */
  constructor(address: string, apikey: string, network: string) {
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
    address: string,
    tokenAddress: string,
    period: number,
    amount: number,
    wantstosplit: boolean,
    split: string[],
    splitamount: number[]
  ): Promise<string> {
    const ws = new WebSocket(`${protocol}://${IP}:${PORT}/ws`);
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

    const checkRequest = await new Promise<string>((resolve) => {
      ws.on("open", () => {
        ws.send(JSON.stringify(data));
      });

      ws.on("message", (message: any) => {
        resolve(message.toString());
      });
    });
    return checkRequest;
  }

  /**
   * @notice Request permission to pull payment from the business
   * @param address The address to request funds from.
   * @param tokenAddress The token address to request funds from.
   * @param period The interval that payment will be requested
   * @param amount Amount to request
   */
  async requestBusiness(
    address: string,
    tokenAddress: string,
    period: number,
    amount: number
  ): Promise<string> {
    const ws = new WebSocket(`${protocol}://${IP}:${PORT}/ws`);
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

    const checkRequest = await new Promise<string>((resolve) => {
      ws.on("open", () => {
        ws.send(JSON.stringify(data));
      });

      ws.on("message", (message: any) => {
        resolve(message.toString());
      });
    });
    return checkRequest;
  }

  /**
   * @notice Check if address has been requested
   * @param address The address to check if it has been requested.
   * @returns true or false if the address has been requested or not
   */
  async isRequested(address: string): Promise<string> {
    const ws = new WebSocket(`${protocol}://${IP}:${PORT}/ws`);
    const data = {
      clientaddress: await this._automation.getAddress(),
      event: "check-request",
      address: address,
      apikey: this._apikey,
      network: this._network,
    };

    const checkRequest = await new Promise<string>((resolve) => {
      ws.on("open", () => {
        ws.send(JSON.stringify(data));
      });

      ws.on("message", (message: any) => {
        resolve(message.toString());
      });
    });
    return checkRequest;
  }

  /**
   * @notice Check if address has paid
   * @notice Make sure to call this function where the service you are providing is
   * @param address The address to check if they have made payment.
   * @returns true or false if the address has made payment
   */
  async hasPaid(address: string): Promise<string> {
    const ws = new WebSocket(`${protocol}://${IP}:${PORT}/ws`);
    const data = {
      clientaddress: await this._automation.getAddress(),
      event: "check-payment",
      address: address,
      apikey: this._apikey,
      network: this._network,
    };

    const checkRequest = await new Promise<string>((resolve) => {
      ws.on("open", () => {
        ws.send(JSON.stringify(data));
      });

      ws.on("message", (message: any) => {
        resolve(message.toString());
      });
    });
    return checkRequest;
  }
}

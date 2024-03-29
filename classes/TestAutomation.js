const ethers = require("ethers");

const delegateAccount = "0x40254910A5C72627402b8c2Db5dA54cECd8338DE";

const deleateEthAccount = "0x11B2b3B5C77A8E0c1C1C5DD16Fde5A66cB0dbD1c";

//Address of business autopayment contract
const automationBusiness = "0x2bfe3a7293cfb100ead686be8036e97ce2b6cb8c";

//Address of business autopayment contract
const automationEthBusiness = "0xAF23C496dc9Da044A722AB96c873d1fd5546Eab4";

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
  {
    type: "function",
    name: "requestPermissionBusiness",
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
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "getIfRequested",
    constant: true,
    stateMutability: "view",
    payable: false,
    gas: 29000000,
    inputs: [
      {
        type: "address",
        name: "businessCustomer",
      },
    ],
    outputs: [
      {
        type: "bool",
      },
    ],
  },
];

class TestAutomation {
  /**
   * @notice Create TestAutomation instance to interact with
   * @dev Provider MUST be mumbai or sepolia
   * @param signerOrProvider provider or mumbai/sepolia provider to use
   * @param address automation address to use
   */

  constructor(signerOrProvider, address) {
    this._automation = new ethers.Contract(address, abi, signerOrProvider);
  }

  /**
   * @notice Request permission to pull payment from the user
   * @param address The address to request funds from
   * @param period The interval that payment will be requested
   * @param amount Amount to request
   */

  async requestUser(address, period, amount) {
    //Check is we have requested this user
    const status = await this._automation.getIfRequested(address);

    //If requested throw error and ask user to accept from app
    if (status.toString() == "true") {
      throw new Error(`User ${address} has already been requested`);
    }
    //Request user if not already requested
    const tx = await this._automation.requestPermissionUsers(
      address,
      period,
      amount
    );
    await tx.wait();
    return `Request user successfully`;
  }

  /**
   * @notice Request permission to pull payment from the user(Token edition)
   * @param address The address to request funds from
   * @param period The interval that payment will be requested
   * @param amount Amount to request
   * @deprecated Use requestUser instead
   */

  async requestUserToken(address, period, amount) {
    //Check is we have requested this user
    const status = await this._automation.getIfRequested(address);

    //If requested throw error and ask user to accept from app
    if (status.toString() == "true") {
      throw new Error(`User ${address} has already been requested`);
    }
    //Request user if not already requested
    const tx = await this._automation.requestPermissionUsersToken(
      address,
      "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      period,
      amount
    );
    await tx.wait();
    return `Request user successfully`;
  }

  /**
   * @notice Request permission to pull payment from the business
   * @param address The address to request funds from
   * @param period The interval that payment will be requested
   * @param amount Amount to request
   */

  async requestBusiness(address, period, amount) {
    //Check is we have requested this business
    const status = await this._automation.getIfRequested(address);

    //If requested throw error and ask business to accept from app
    if (status.toString() == "true") {
      throw new Error(`Business ${address} has already been requested`);
    }
    //Request user if not already requested
    const tx = await this._automation.requestPermissionBusiness(
      address,
      period,
      amount
    );
    await tx.wait();
    return `Request business successfully`;
  }

  /**
   * @notice Request permission to pull payment from the business(Token edition)
   * @param address The address to request funds from
   * @param period The interval that payment will be requested
   * @param amount Amount to request
   * @deprecated Use requestBusiness instead
   */

  async requestBusinessToken(address, period, amount) {
    //Check is we have requested this user
    const status = await this._automation.getIfRequested(address);

    //If requested throw error and ask user to accept from app
    if (status.toString() == "true") {
      throw new Error(`Business ${address} has already been requested`);
    }
    //Request user if not already requested
    const tx = await this._automation.requestPermissionBusinessToken(
      address,
      "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      period,
      amount
    );
    await tx.wait();
    return `Requested business successfully`;
  }

  /**
   * @notice Removes Request for address
   * @param address The address to remove request for
   * @deprecated Don't use this method. Just request user.
   */

  async removeRequest(address) {
    //Check is we have requested this user
    const status = await this._automation.getIfRequested(address);

    //If not requested throw error
    if (status.toString() == "false") {
      throw new Error(`User ${address} has not been requested`);
    }
    //Request user if not already requested
    const tx = await this._automation.removeRequest(address);
    await tx.wait();
    return `Remove address successfully`;
  }

  /**
   * @notice Check if address has been requested
   * @param address The address to check if it has beeen requested
   * @returns true or false if the address has been requested or not
   */
  async isRequested(address) {
    const status = await this._automation.getIfRequested(address);
    return status.toString();
  }
}

module.exports = {
  TestAutomation,
  delegateAccount,
  deleateEthAccount,
  automationBusiness,
  automationEthBusiness,
};

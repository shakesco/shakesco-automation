const ethers = require("ethers");

const delegateAccount = "0x73D65aC543B0cB111de1338468F0738d1f64f45A";

//Address of business autopayment contract
const automationBusiness = "0x231E152e72357B4DA117AF8282b0704af12A4B9c";

const abi = [
  'function requestPermissionUsers(address payable _from, uint256 _period, uint256 _amount)',
  'function requestPermissionBusiness(address payable _from, uint256 _period, uint256 _amount)',
  'function removeRequest(address businessCustomer)',
  'function getIfRequested(address businessCustomer) view returns (bool)',
]; //prettier-ignore

class TestAutomation {
  /**
   * @notice Create TestAutomation instance to interact with
   * @dev Provider MUST be mumbai
   * @param signerOrProvider signer or mumbai provider to use
   */
  constructor(signerOrProvider) {
    this._automation = new ethers.Contract(
      automationBusiness,
      abi,
      signerOrProvider
    );
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

module.exports = { TestAutomation, delegateAccount };

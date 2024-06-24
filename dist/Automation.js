"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Automation = void 0;
var ethers_1 = require("ethers");
var ws_1 = __importDefault(require("ws"));
var PORT = "8022";
var IP = "192.168.1.58";
var protocol = "ws";
var abi = [];
var Automation = /** @class */ (function () {
    /**
     * @notice Create Automation instance to interact with
     * @param address Your automation address
     * @param apikey Your api key provided by shakesco for authorization
     * @param network The network you want to perform operations on: "Ethereum" or "Polygon"
     */
    function Automation(address, apikey, network) {
        this._automation = new ethers_1.ethers.Contract(address, abi);
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
    Automation.prototype.requestUser = function (address, tokenAddress, period, amount, wantstosplit, split, splitamount) {
        return __awaiter(this, void 0, void 0, function () {
            var ws, data, checkRequest;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ws = new ws_1.default("".concat(protocol, "://").concat(IP, ":").concat(PORT, "/ws"));
                        _a = {};
                        return [4 /*yield*/, this._automation.getAddress()];
                    case 1:
                        data = (_a.clientaddress = _b.sent(),
                            _a.event = "request-user",
                            _a.period = period,
                            _a.token = tokenAddress,
                            _a.amount = amount.toString(),
                            _a.address = address,
                            _a.apikey = this._apikey,
                            _a.split = wantstosplit,
                            _a.splitAccounts = split,
                            _a.splitAmounts = splitamount,
                            _a.network = this._network,
                            _a);
                        return [4 /*yield*/, new Promise(function (resolve) {
                                ws.on("open", function () {
                                    ws.send(JSON.stringify(data));
                                });
                                ws.on("message", function (message) {
                                    resolve(message.toString());
                                });
                            })];
                    case 2:
                        checkRequest = _b.sent();
                        return [2 /*return*/, checkRequest];
                }
            });
        });
    };
    /**
     * @notice Request permission to pull payment from the business
     * @param address The address to request funds from.
     * @param tokenAddress The token address to request funds from.
     * @param period The interval that payment will be requested
     * @param amount Amount to request
     */
    Automation.prototype.requestBusiness = function (address, tokenAddress, period, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var ws, data, checkRequest;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ws = new ws_1.default("".concat(protocol, "://").concat(IP, ":").concat(PORT, "/ws"));
                        _a = {};
                        return [4 /*yield*/, this._automation.getAddress()];
                    case 1:
                        data = (_a.clientaddress = _b.sent(),
                            _a.event = "request-business",
                            _a.token = tokenAddress,
                            _a.period = period,
                            _a.amount = amount.toString(),
                            _a.address = address,
                            _a.apikey = this._apikey,
                            _a.network = this._network,
                            _a);
                        return [4 /*yield*/, new Promise(function (resolve) {
                                ws.on("open", function () {
                                    ws.send(JSON.stringify(data));
                                });
                                ws.on("message", function (message) {
                                    resolve(message.toString());
                                });
                            })];
                    case 2:
                        checkRequest = _b.sent();
                        return [2 /*return*/, checkRequest];
                }
            });
        });
    };
    /**
     * @notice Check if address has been requested
     * @param address The address to check if it has been requested.
     * @returns true or false if the address has been requested or not
     */
    Automation.prototype.isRequested = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var ws, data, checkRequest;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ws = new ws_1.default("".concat(protocol, "://").concat(IP, ":").concat(PORT, "/ws"));
                        _a = {};
                        return [4 /*yield*/, this._automation.getAddress()];
                    case 1:
                        data = (_a.clientaddress = _b.sent(),
                            _a.event = "check-request",
                            _a.address = address,
                            _a.apikey = this._apikey,
                            _a.network = this._network,
                            _a);
                        return [4 /*yield*/, new Promise(function (resolve) {
                                ws.on("open", function () {
                                    ws.send(JSON.stringify(data));
                                });
                                ws.on("message", function (message) {
                                    resolve(message.toString());
                                });
                            })];
                    case 2:
                        checkRequest = _b.sent();
                        return [2 /*return*/, checkRequest];
                }
            });
        });
    };
    /**
     * @notice Check if address has paid
     * @notice Make sure to call this function where the service you are providing is
     * @param address The address to check if they have made payment.
     * @returns true or false if the address has made payment
     */
    Automation.prototype.hasPaid = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var ws, data, checkRequest;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ws = new ws_1.default("".concat(protocol, "://").concat(IP, ":").concat(PORT, "/ws"));
                        _a = {};
                        return [4 /*yield*/, this._automation.getAddress()];
                    case 1:
                        data = (_a.clientaddress = _b.sent(),
                            _a.event = "check-payment",
                            _a.address = address,
                            _a.apikey = this._apikey,
                            _a.network = this._network,
                            _a);
                        return [4 /*yield*/, new Promise(function (resolve) {
                                ws.on("open", function () {
                                    ws.send(JSON.stringify(data));
                                });
                                ws.on("message", function (message) {
                                    resolve(message.toString());
                                });
                            })];
                    case 2:
                        checkRequest = _b.sent();
                        return [2 /*return*/, checkRequest];
                }
            });
        });
    };
    return Automation;
}());
exports.Automation = Automation;

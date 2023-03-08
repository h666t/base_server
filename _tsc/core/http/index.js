"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIP = void 0;
var custom_config = __importStar(require("../../custom_config.json"));
var dayjs_1 = __importDefault(require("dayjs"));
var ipRequestCountHash = {};
var handleIP = function (ip) {
    var now = Date.now();
    if (ipRequestCountHash[ip]) {
        if (ipRequestCountHash[ip].count > custom_config.http.mostRequestTimeInOneSecound) {
            ipRequestCountHash[ip].count += 1;
        }
        else if (now - ipRequestCountHash[ip].timeStamp > 1000) {
            ipRequestCountHash[ip] = {
                count: 1,
                timeStamp: now
            };
        }
        else {
            ipRequestCountHash[ip].count += 1;
        }
    }
    else {
        ipRequestCountHash[ip] = {
            count: 1,
            timeStamp: now
        };
    }
    ;
    if (ipRequestCountHash[ip].count > custom_config.http.mostRequestTimeInOneSecound) {
        console.log(dayjs_1.default().format('YYYY-MM-DD HH:mm:ss') + ": reveive request from ip: " + ip + ", overRate: " + ipRequestCountHash[ip].count + ", limit: " + custom_config.http.mostRequestTimeInOneSecound);
        return false;
    }
    else {
        console.log(dayjs_1.default().format('YYYY-MM-DD HH:mm:ss') + ": reveive request from ip: " + ip + ", count: " + ipRequestCountHash[ip].count);
        return true;
    }
};
exports.handleIP = handleIP;

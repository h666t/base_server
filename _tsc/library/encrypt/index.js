"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_rsa_1 = __importDefault(require("node-rsa"));
var custom_config_json_1 = require("../../custom_config.json");
var privatekey = custom_config_json_1.encrypt.privatekey;
var decrypt = function (data) {
    var prikey = new node_rsa_1.default(privatekey, 'pkcs8-private-pem');
    prikey.setOptions({
        encryptionScheme: "pkcs1"
    });
    return prikey.decrypt(Buffer.from(data, 'base64'), 'utf8');
};
exports.default = {
    decrypt: decrypt
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = void 0;
require('dotenv').config(require('path').resolve(process.cwd(), '.env'));
var https_1 = __importDefault(require("https"));
function postMessage() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var options = {
        hostname: 'slack.com',
        path: '/api/chat.postMessage',
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + process.env.SLACK_BEARER_TOKEN
        }
    };
    var message = {
        channel: process.env.SLACK_CH_ID,
        text: args.join(' ')
    };
    var req = https_1.default.request(options);
    req.write(JSON.stringify(message));
    req.end();
}
exports.postMessage = postMessage;

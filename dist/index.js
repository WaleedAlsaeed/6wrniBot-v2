"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = exports.lvlsys = exports.config = void 0;
require('dotenv').config();
const Client_1 = require("./structures/Client");
const consts_1 = require("./config/consts");
const LevelSystem_1 = require("./config/LevelSystem");
let client = new Client_1.ExtendedClient();
exports.config = new consts_1.Config();
exports.lvlsys = new LevelSystem_1.LevelSystem();
function getClient() {
    return client;
}
exports.getClient = getClient;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.status(200).send('OK');
});
app.listen(port, () => {
    client.start();
});
var intervalID;
var calls = 0;
function restartBot(b, c) {
    console.log(b, c);
    calls++;
    if (calls >= 72) {
        stopAutoUpdate();
    }
    else {
        console.log("==> [Bot Status]: Restarting Bot...");
        client.destroy();
        client = new Client_1.ExtendedClient();
        client.start();
    }
}
function autoUpdate() {
    intervalID = setInterval(function () {
        restartBot(intervalID, calls);
    }, 1200000);
}
function stopAutoUpdate() {
    clearInterval(intervalID);
    axios_1.default.get(process.env.UPDATE || "");
    console.log('Done');
}
autoUpdate();

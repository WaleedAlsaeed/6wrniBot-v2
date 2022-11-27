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
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    client.start();
    yield sleep(600000);
    axios_1.default.get(process.env.UPDATE || "");
    yield sleep(20000);
    client.destroy();
}));
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

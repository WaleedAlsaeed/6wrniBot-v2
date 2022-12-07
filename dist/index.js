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
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (res.statusCode > 199 && res.statusCode < 400) {
        res.send('OK');
    }
    else {
        yield axios_1.default.get(process.env.UPDATE || "");
    }
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    client.start();
}));
function update() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sleep(900000);
        console.log("[Bot Status]: Restarting Bot...");
        let done = false;
        while (!done) {
            try {
                const { status } = yield axios_1.default.get(process.env.UPDATE || "");
                console.log("[Bot Status]: Restarting on progress at port: ", status);
                done = true;
            }
            catch (error) {
                done = false;
            }
        }
        yield sleep(300000);
        client.destroy();
        console.log("[Bot Status]: Done Restarting Bot...");
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
update();

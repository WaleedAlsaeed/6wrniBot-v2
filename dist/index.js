"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lvlsys = exports.config = exports.client = void 0;
require('dotenv').config();
const Client_1 = require("./structures/Client");
const consts_1 = require("./config/consts");
const LevelSystem_1 = require("./config/LevelSystem");
exports.client = new Client_1.ExtendedClient();
exports.config = new consts_1.Config();
exports.lvlsys = new LevelSystem_1.LevelSystem();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.status(200).send('OK');
    //setTimeout(async () => {
    //    for (let i = 0; i < 30; i++) {
    //        try {
    //            const { data, status } = await axios.get(
    //                process.env.UPDATE || ""
    //            );
    //            console.log(data);
    //            console.log('response status is: ', status);
    //            return;
    //        } catch (error) {
    //            console.log(error);
    //        }
    //    }
    //    config.LogChannel("Unable to check updates");
    //}, 3000000);
});
app.listen(port, () => {
    console.log("Listen in port: " + port);
    exports.client.start();
});

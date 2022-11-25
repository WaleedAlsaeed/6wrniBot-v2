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
exports.lvlsys = exports.config = exports.client = void 0;
require('dotenv').config();
const Client_1 = require("./structures/Client");
const consts_1 = require("./config/consts");
const LevelSystem_1 = require("./config/LevelSystem");
const axios_1 = __importDefault(require("axios"));
exports.client = new Client_1.ExtendedClient();
exports.config = new consts_1.Config();
exports.lvlsys = new LevelSystem_1.LevelSystem();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.status(200).send('OK');
});
app.listen(port, () => exports.client.start());
function checkUpdates() {
    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 5; i++) {
            try {
                const { data, status } = yield axios_1.default.get(process.env.UPDATE || "");
                console.log(data);
                console.log('response status is: ', status);
                return;
            }
            catch (error) {
                console.log(error);
            }
        }
        exports.config.LogChannel("Unable to check updates");
    }), 1100000);
}
checkUpdates();

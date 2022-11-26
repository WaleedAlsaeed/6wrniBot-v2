require('dotenv').config();
import { ExtendedClient } from './structures/Client';
import { Config } from './config/consts';
import { LevelSystem } from './config/LevelSystem';
var cron = require('node-cron');

export const client = new ExtendedClient();
export const config = new Config();
export const lvlsys = new LevelSystem();



import express from "express";
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => client.start());

cron.schedule('19 * * * *', () => {
  console.log('==> [Status]: Restart BOT...');
  client.destroy();
  client.start();
  console.log('==> [Status]: Done.');
});
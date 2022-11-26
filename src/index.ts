require('dotenv').config();
import { ExtendedClient } from './structures/Client';
import { Config } from './config/consts';
import { LevelSystem } from './config/LevelSystem';

export let client = new ExtendedClient();
export const config = new Config();
export const lvlsys = new LevelSystem();



import express from "express";
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => client.start());

setInterval(() => {
  console.log("==> [Bot Status]: Restarting Bot...");
  client.destroy();
  client = new ExtendedClient();
  client.start();
  console.log("==> [Bot Status]: Done Restarting Bot...");
}, 1200000);
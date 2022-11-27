require('dotenv').config();
import { ExtendedClient } from './structures/Client';
import { Config } from './config/consts';
import { LevelSystem } from './config/LevelSystem';

let client = new ExtendedClient();
export const config = new Config();
export const lvlsys = new LevelSystem();

export function getClient() {
  return client;
}

import express from "express";
import axios from 'axios';
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, async () => {
  client.start();
  await sleep(600000)
  axios.get(process.env.UPDATE || "")
  await sleep(20000)
  client.destroy();
});

function sleep(ms:number){
  return new Promise(resolve => setTimeout(resolve, ms));
}
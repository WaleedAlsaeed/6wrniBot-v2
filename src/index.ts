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

app.get("/", async (req, res) => {
  if (res.statusCode > 199 && res.statusCode < 400) {
    res.send('OK');
  } else {
    await axios.get(process.env.UPDATE || "");
  }
});

app.listen(port, async () => {
  client.start();
});

async function update() {
  await sleep(900000)
  console.log("[Bot Status]: Restarting Bot...");
  let done = false;
  while (!done) {
    try {
      const { status } = await axios.get(process.env.UPDATE || "");
      console.log("[Bot Status]: Restarting on progress at port: ", status);
      done = true;
    } catch (error) {
      done = false;
    }
  }
  await sleep(300000)
  client.destroy();
  console.log("[Bot Status]: Done Restarting Bot...");
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

update();
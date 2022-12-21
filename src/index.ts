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
  await update();
  console.log("[Bot Status]: Done Restarting the bot");
});

async function update() {
  console.log("[Bot Status]: Bot started!");
  await sleep(1110000)
  let done = false;
  while (!done) {
    try {
      const { status } = await axios.get(process.env.UPDATE || "");
      console.log("[Bot Status]: Restarting on progress at port: ", status);
      done = true;
    } catch (error) {
      console.error(error);
      done = false;
    }
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
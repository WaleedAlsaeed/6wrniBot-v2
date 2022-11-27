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

app.listen(port, () => {
  client.start();
  update();
});

function update() {
  setTimeout(async () => {
    console.log("[Bot Status]: Restarting Bot...");
    for (let i = 0; i < 50; i++) {
      let isDone = false
      await axios.get(process.env.UPDATE || "")
      .catch((err) => isDone = false)
      .then((value) => isDone = true);
      if (isDone) {
        console.log("[Bot Status]: Done Restarting Bot...");
        setTimeout(() => client.destroy(), 20000);
        return;
      }
    }   
  }, 1200000);
}
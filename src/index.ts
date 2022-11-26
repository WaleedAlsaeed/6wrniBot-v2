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
});

var intervalID: string | number | NodeJS.Timer | undefined;
var calls = 0;

function restartBot(b: string | number | NodeJS.Timer | undefined, c:number) {
  console.log(b, c);
  calls++;
  
  if (calls >= 72) {
    stopAutoUpdate(); 
  } else {
    console.log("==> [Bot Status]: Restarting Bot...");
    client.destroy();
    client = new ExtendedClient();
    client.start();
  }
}

function autoUpdate() {
  intervalID = setInterval(function() {
    restartBot(intervalID, calls);
  }, 1200000);
}

function stopAutoUpdate() {
  clearInterval(intervalID);
  axios.get(process.env.UPDATE || "");
  console.log('Done');
}

autoUpdate();
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
  setTimeout(() => {
    for (let i = 0; i < 40; i++) {
      try {
        axios.get(process.env.UPDATE || "")
        .then((value) => setTimeout(() => client.destroy(), 20000));
        break;
      } catch (error) {
        console.error(error);
        config.LogChannel(`${error}`)
      }
    }
  }, 1200000);
});
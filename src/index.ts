require('dotenv').config();
import { ExtendedClient } from './structures/Client';
import { Config } from './config/consts';
import { LevelSystem } from './config/LevelSystem';


export const client = new ExtendedClient();
export const config = new Config();
export const lvlsys = new LevelSystem();

client.start();

import express from 'express';
const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.status(200).send('OK')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
require('dotenv').config();
import { ExtendedClient } from './structures/Client';
import { Config } from './config/consts';
import { LevelSystem } from './config/LevelSystem';
import axios from 'axios';

export const client = new ExtendedClient();
export const config = new Config();
export const lvlsys = new LevelSystem();


import express from "express";
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.status(200).send('OK');
    setTimeout(async () => {
        for (let i = 0; i < 30; i++) {
            try {
                const { data, status } = await axios.get(
                    process.env.UPDATE || ""
                );
                console.log(data);
                console.log('response status is: ', status);
                return;
            } catch (error) {
                console.log(error);
            }
        }
        config.LogChannel("Unable to check updates");
    }, 1200000);
});

app.listen(port, () => {
    console.log("Listen in port: " + port);
    client.start();
});
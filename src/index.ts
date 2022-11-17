require('dotenv').config();
import { ExtendedClient } from './structures/Client';
import { Config } from './config/consts';
import { LevelSystem } from './config/LevelSystem';
import axios from 'axios';


export const client = new ExtendedClient();
export const config = new Config();
export const lvlsys = new LevelSystem();

client.start();

function checkUpdates(num: number) {
    if (num > 2) config.LogChannel("Unable to check updates");

    setTimeout(async () => {
        try {
            const { data, status } = await axios.get(
                process.env.UPDATE || ""
            );
            console.log(data);
            console.log('response status is: ', status);
        } catch (error) {
            checkUpdates(num + 1);
        }
    }, 2500000);
}

checkUpdates(0);
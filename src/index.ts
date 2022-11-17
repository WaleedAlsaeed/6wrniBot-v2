require('dotenv').config();
import { ExtendedClient } from './structures/Client';
import { Config } from './config/consts';
import { LevelSystem } from './config/LevelSystem';
import axios from 'axios';


export const client = new ExtendedClient();
export const config = new Config();
export const lvlsys = new LevelSystem();

client.start();

function checkUpdates() {
    setTimeout(async () => {
        for (let i = 0; i < 5; i++) {
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
    }, 2500000);
}

checkUpdates();
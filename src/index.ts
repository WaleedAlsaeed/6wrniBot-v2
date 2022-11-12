require('dotenv').config();
import { ExtendedClient } from './structures/Client';
import { Config } from './config/consts';
import { LevelSystem } from './config/LevelSystem';

export const client = new ExtendedClient();
export const config = new Config();
export const lvlsys = new LevelSystem();

client.start();
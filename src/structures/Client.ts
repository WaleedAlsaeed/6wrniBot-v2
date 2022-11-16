import {
    Client,
    Collection,
    ApplicationCommandDataResolvable,
    ClientEvents,
    GatewayIntentBits,
    Routes
} from 'discord.js';
import { CommandType } from "../typings/Command";
import { RegisterCommandsOptions } from "../typings/client";
import { Event, DataBaseEvent } from './Event';
import fs from 'fs';
import { connect, connection } from 'mongoose';
import { RoleButton } from './Button';
import { client, lvlsys, config } from '../index';


export class ExtendedClient extends Client {

    commands: Collection<string, CommandType> = new Collection();
    buttons: Collection<string, RoleButton> = new Collection();

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildBans,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.AutoModerationConfiguration,
                GatewayIntentBits.AutoModerationExecution
            ]
        });
    }

    start() {
        this.registerModules();
        this.login(process.env.TOKEN);
        this.ConnectToDataBase();
    }
    
    async ConnectToDataBase() {
        if (process.env.DATABASE)
        await connect(process.env.DATABASE).catch(console.error);
    }
    
    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }
    
    async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if (guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
        }
    }
    
    async registerModules() {
        await this.loadCommands();
        await this.loadComponents();
        await this.loadEvents(); 
        await this.loadDataBaseEvents();
    }

    async loadCommands() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFolders = fs.readdirSync("./src/commands");
        for (const folder of commandFolders) {
            fs.readdirSync(`./src/commands/${folder}`).forEach(async (file) => {
                const command: CommandType = await this.importFile(`../commands/${folder}/${file.replace(".ts", "")}`);
                if (!command.name) return;

                this.commands.set(command.name, command);
                slashCommands.push(command);
            });

            console.log(`"${folder}" commands are loded`);
        }

        this.on("ready", async () => {
            this.registerCommands({
                commands: slashCommands,
                guildId: process.env.GUILDID
            });
            console.log("Bot is Online!");
        });
    }

    async loadComponents() {
        const componentsFolders = fs.readdirSync("./src/components");
        for (const folder of componentsFolders) {
            switch (folder) {
                case "rolebuttons":
                    fs.readdirSync(`./src/components/${folder}`).forEach(async (file) => {
                        const button: RoleButton = await this.importFile(`../components/${folder}/${file.replace(".ts", "")}`);
                        this.buttons.set(button.name, button)
                    });
                    break;
            
                default:
                    break;
            }

            console.log(`"${folder}" components are loded`);
        }
    }

    async loadEvents() {
        const eventFiles = fs.readdirSync(`./src/events`);
        eventFiles.forEach(async (file) => {
            const event: Event<keyof ClientEvents> = await this.importFile(`../events/${file.replace(".ts", "")}`);
            this.on(event.event, async (...args) => {
                try {
                    await event.run(...args);
                } catch (error) {
                    console.log(error);
                    config.LogChannel(`[Event Error]\n**Event:** ${event.event}\n**Error:**\n${error}`)
                }
            });
            console.log(`Event "${event.event}" is loded`);
        });
    }

    async loadDataBaseEvents() {
        const dbeventFiles = fs.readdirSync(`./src/database`);
        dbeventFiles.forEach(async (file) => {
            const event: DataBaseEvent = await this.importFile(`../database/${file.replace(".ts", "")}`);

            if(event.event == "connected") {
                connection.once(event.event, (...args) => {
                    event.run(...args);
                });
            } else {
                connection.on(event.event, (...args) => {
                    event.run(...args);
                });
            }
        });
    }

}
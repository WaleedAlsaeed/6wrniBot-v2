"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = require("mongoose");
class ExtendedClient extends discord_js_1.Client {
    constructor() {
        super({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMembers,
                discord_js_1.GatewayIntentBits.GuildBans,
                discord_js_1.GatewayIntentBits.GuildEmojisAndStickers,
                discord_js_1.GatewayIntentBits.GuildIntegrations,
                discord_js_1.GatewayIntentBits.GuildWebhooks,
                discord_js_1.GatewayIntentBits.GuildInvites,
                discord_js_1.GatewayIntentBits.GuildVoiceStates,
                discord_js_1.GatewayIntentBits.GuildPresences,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.GuildMessageReactions,
                discord_js_1.GatewayIntentBits.GuildMessageTyping,
                discord_js_1.GatewayIntentBits.MessageContent,
                discord_js_1.GatewayIntentBits.GuildScheduledEvents,
                discord_js_1.GatewayIntentBits.AutoModerationConfiguration,
                discord_js_1.GatewayIntentBits.AutoModerationExecution
            ]
        });
        this.commands = new discord_js_1.Collection();
        this.buttons = new discord_js_1.Collection();
    }
    start() {
        this.registerModules();
        this.login(process.env.TOKEN);
        this.ConnectToDataBase();
    }
    ConnectToDataBase() {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.DATABASE)
                yield (0, mongoose_1.connect)(process.env.DATABASE).catch(console.error);
        });
    }
    importFile(filePath) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = (yield Promise.resolve().then(() => __importStar(require(filePath))))) === null || _a === void 0 ? void 0 : _a.default;
        });
    }
    registerCommands({ commands, guildId }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (guildId) {
                (_a = this.guilds.cache.get(guildId)) === null || _a === void 0 ? void 0 : _a.commands.set(commands);
                console.log(`Registering commands to ${guildId}`);
            }
            else {
                (_b = this.application) === null || _b === void 0 ? void 0 : _b.commands.set(commands);
            }
        });
    }
    registerModules() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadCommands();
            yield this.loadComponents();
            yield this.loadEvents();
            yield this.loadDataBaseEvents();
        });
    }
    loadCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            const slashCommands = [];
            const commandFolders = fs_1.default.readdirSync("./src/commands");
            for (const folder of commandFolders) {
                fs_1.default.readdirSync(`./src/commands/${folder}`).forEach((file) => __awaiter(this, void 0, void 0, function* () {
                    const command = yield this.importFile(`../commands/${folder}/${file.replace(".ts", "")}`);
                    if (!command.name)
                        return;
                    this.commands.set(command.name, command);
                    slashCommands.push(command);
                }));
                console.log(`"${folder}" commands are loded`);
            }
            this.on("ready", () => __awaiter(this, void 0, void 0, function* () {
                this.registerCommands({
                    commands: slashCommands,
                    guildId: process.env.GUILDID
                });
                console.log("Bot is Online!");
            }));
        });
    }
    loadComponents() {
        return __awaiter(this, void 0, void 0, function* () {
            const componentsFolders = fs_1.default.readdirSync("./src/components");
            for (const folder of componentsFolders) {
                switch (folder) {
                    case "rolebuttons":
                        fs_1.default.readdirSync(`./src/components/${folder}`).forEach((file) => __awaiter(this, void 0, void 0, function* () {
                            const button = yield this.importFile(`../components/${folder}/${file.replace(".ts", "")}`);
                            this.buttons.set(button.name, button);
                        }));
                        break;
                    default:
                        break;
                }
                console.log(`"${folder}" components are loded`);
            }
        });
    }
    loadEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const eventFiles = fs_1.default.readdirSync(`./src/events`);
            eventFiles.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                const event = yield this.importFile(`../events/${file.replace(".ts", "")}`);
                this.on(event.event, (...args) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield event.run(...args);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }));
                console.log(`Event "${event.event}" is loded`);
            }));
        });
    }
    loadDataBaseEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbeventFiles = fs_1.default.readdirSync(`./src/database`);
            dbeventFiles.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                const event = yield this.importFile(`../database/${file.replace(".ts", "")}`);
                if (event.event == "connected") {
                    mongoose_1.connection.once(event.event, (...args) => {
                        event.run(...args);
                    });
                }
                else {
                    mongoose_1.connection.on(event.event, (...args) => {
                        event.run(...args);
                    });
                }
            }));
        });
    }
}
exports.ExtendedClient = ExtendedClient;

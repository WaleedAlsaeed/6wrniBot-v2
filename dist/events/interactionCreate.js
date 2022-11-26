"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../structures/Event");
const __1 = require("..");
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
exports.default = new Event_1.Event(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const client = (0, __1.getClient)();
    if (interaction.isChatInputCommand()) {
        yield interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return yield interaction.followUp('تعذر ايجاد الأمر');
        if (command.onlyInCommandChannel) {
            if (interaction.channelId != index_1.config.COMMANDS_CHANNEL) {
                return yield interaction.followUp(`يمكنك استخدام هذا الأمر فقط في قناة ${(0, discord_js_1.channelMention)(index_1.config.COMMANDS_CHANNEL)}`);
            }
        }
        try {
            yield command.run({
                args: interaction.options,
                client,
                interaction: interaction
            });
        }
        catch (error) {
            console.log(error);
            index_1.config.LogChannel(`[Command Error]
                               \n**CommandName**: ${command.name}
                               \n**Channel**: ${(_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.toString()}
                               \n**Error**:\n${error}`);
            yield interaction.followUp(`حدث خطأ ما أثناء إستخدام الأمر`);
        }
    }
    else if (interaction.isAutocomplete()) {
        const command = client.commands.get(interaction.commandName);
        if (!command)
            return;
        try {
            (_b = command.autocomplete) === null || _b === void 0 ? void 0 : _b.call(command, interaction, client);
        }
        catch (error) {
            console.error(error);
        }
    }
    else if (interaction.isButton()) {
        const { customId } = interaction;
        const { buttons } = client;
        const button = buttons.get(customId);
        if (!button)
            return;
        try {
            yield button.run(interaction);
        }
        catch (error) {
            console.log(error);
        }
    }
}));

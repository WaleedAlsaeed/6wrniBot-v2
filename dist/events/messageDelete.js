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
const discord_js_1 = require("discord.js");
const Event_1 = require("../structures/Event");
const index_1 = require("../index");
exports.default = new Event_1.Event(discord_js_1.Events.MessageDelete, (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.member || !message.content)
        return;
    if (index_1.config.isModOrOwner(message.member))
        return;
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle(`[حذف رسالة] - ${message.member.user.tag}`)
        .setDescription(`حذف ${(0, discord_js_1.userMention)(message.member.id)} رسالة في ${message.channel.toString()}`)
        .setColor(index_1.config.DEFAULT_COLOR)
        .addFields({ name: "تاريخ الإرسال:", value: `<t:${message.createdTimestamp}:f>` }, { name: "المحتوى:", value: message.content });
    const deletedMessages = index_1.client.channels.cache.get(index_1.config.DELETED_MESSAGES_CHANNEL);
    deletedMessages.send({ embeds: [embed] });
}));

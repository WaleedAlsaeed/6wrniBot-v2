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
exports.default = new Event_1.Event("guildMemberRemove", (member) => __awaiter(void 0, void 0, void 0, function* () {
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("[خروج عضو]")
        .setColor(index_1.config.DEFAULT_COLOR)
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`${(0, discord_js_1.userMention)(member.id)} - ${member.user.tag}`)
        .setFooter({ text: `ID: ${member.id}` });
    const modLog = index_1.client.channels.cache.get(index_1.config.MOD_LOG);
    modLog.send({ embeds: [embed] });
    index_1.lvlsys.DeleteMember(member.id);
}));

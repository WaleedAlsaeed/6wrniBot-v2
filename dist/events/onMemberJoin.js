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
const mSecToSec = (ms) => {
    if (!ms)
        return 0;
    return Math.trunc(ms / 1000);
};
exports.default = new Event_1.Event(discord_js_1.Events.GuildMemberAdd, (member) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const client = (0, index_1.getClient)();
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle("[انضمام عضو]")
        .setColor(index_1.config.DEFAULT_COLOR)
        .setDescription(`${(0, discord_js_1.userMention)(member.id)} - ${member.user.tag}`)
        .setThumbnail(member.user.displayAvatarURL())
        .setFields({
        name: "تاريخ إنشاء الحساب",
        value: `<t:${mSecToSec(member.user.createdTimestamp)}:f> (<t:${mSecToSec(member.user.createdTimestamp)}:R>)`
    }, {
        name: "تاريخ الإنضمام",
        value: `<t:${mSecToSec(member.joinedTimestamp)}:f> (<t:${mSecToSec(member.joinedTimestamp)}:R>)`
    })
        .setFooter({ text: `ID: ${member.id}` });
    const modLog = client.channels.cache.get(index_1.config.MOD_LOG);
    modLog.send({ embeds: [embed] });
    var welcomeMessage = `أهلا بك ${(0, discord_js_1.userMention)(member.id)} في سيرفر طورني.`;
    welcomeMessage += `\nلا تنسى قراءة ${(0, discord_js_1.channelMention)(index_1.config.RULES_CHANNEL)}، `;
    welcomeMessage += `والإطلاع على ${(0, discord_js_1.channelMention)(index_1.config.ALL_CHANNELS)} للتعرف على أقسام السيرفر`;
    const welcome = client.channels.cache.get(index_1.config.WELCOME_CHANNEL);
    welcome.send({ content: welcomeMessage });
    const role = member.guild.roles.cache.get("731608244606337076");
    if (role && !member.roles.cache.get(role.id))
        member.roles.add(role);
    const membersCount = member.guild.memberCount;
    (_a = member.guild.channels.cache.get("878366062767398952")) === null || _a === void 0 ? void 0 : _a.edit({ name: membersCount.toString() }).catch(console.error);
}));

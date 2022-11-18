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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = require("../structures/Event");
const index_1 = require("../index");
const xp_channels_rate_json_1 = __importDefault(require("../config/xp_channels_rate.json"));
function isValidUrl(str) {
    let url;
    try {
        url = new URL(str);
        return url.protocol == "https:" && url.host != "tenor.com";
    }
    catch (_) {
        return false;
    }
}
exports.default = new Event_1.Event(discord_js_1.Events.MessageCreate, (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!message.member || !message.author)
        return;
    if (message.channelId == "675750619784413184") // SPAM Channel
        return;
    if (message.channelId == "675750032909008947") { // INTRO Channnel
        const role = message.member.guild.roles.cache.get("731608244606337076");
        if (role && message.member.roles.cache.get(role.id))
            message.member.roles.remove(role);
        message.react(((_a = message.guild) === null || _a === void 0 ? void 0 : _a.emojis.cache.get(index_1.config.LIKE_EMOJI)) || "👍");
        return;
    }
    if (index_1.config.ONLY_IMAGE_CHANNELS.includes(message.channelId)) {
        if (message.attachments.size == 0) {
            const noLink = message.content.split(/(\s+)/).filter(isValidUrl).length == 0;
            if (noLink) {
                if (index_1.config.isModOrOwner(message.member))
                    return;
                message.delete();
                const messageChannel = index_1.client.channels.cache.get(message.channelId);
                const warn = messageChannel.send({ content: "**مسموح فقط بالصور والروابط في هذه القناة!!**\nالردود تكون في الثريد" });
                setTimeout(() => warn.then((msg) => msg.delete()), 4000);
                return;
            }
        }
        if (message.channelId == index_1.config.SHARE_WORK) {
            message.startThread({
                name: `التعليق على مشاركة ${message.author.username}`,
                rateLimitPerUser: 4
            });
            message.react(((_b = message.guild) === null || _b === void 0 ? void 0 : _b.emojis.cache.get(index_1.config.LIKE_EMOJI)) || "👍");
        }
    }
    if (index_1.config.isModOrOwner(message.member)
        || index_1.config.NO_XP_CAHNNELS.includes(message.channelId))
        return;
    //* Give Xp
    if (message.channel.isThread() || message.channel.type == discord_js_1.ChannelType.GuildText) {
        if (!message.channel.parentId)
            return;
        for (const key in xp_channels_rate_json_1.default) {
            const xpChannel = xp_channels_rate_json_1.default[key];
            if (message.channelId == xpChannel.id || message.channel.parentId == xpChannel.id) {
                let xp = 0;
                if (message.content.length > xpChannel.xpRate) {
                    xp = Math.trunc(message.content.length / xpChannel.xpRate);
                    yield index_1.lvlsys.AddXp(message.author.id, xp);
                    yield index_1.lvlsys.GiveRole(message.member);
                }
                return;
            }
        }
    }
}));

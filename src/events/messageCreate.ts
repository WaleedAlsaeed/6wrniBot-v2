import { ChannelType, Events, Message, TextBasedChannel } from "discord.js";
import { Event } from "../structures/Event"
import { client, config, lvlsys } from '../index';
import xpChannels from "../config/xp_channels_rate.json";


function isValidUrl(str: string) {
    let url: URL;
    try {
        url = new URL(str);
        return url.protocol == "https:" && url.host != "tenor.com";
    } catch (_) {
        return false;
    }
}

export default new Event(
    Events.MessageCreate,
    async (message) => {
        if (!message.member || !message.author)
            return;
        if (message.channelId == "675750619784413184") // SPAM Channel
            return;

        if (message.channelId == "675750032909008947") { // INTRO Channnel
            const role = message.member.guild.roles.cache.get("731608244606337076");
            if (role && !message.member.roles.cache.get(role.id)) message.member.roles.remove(role);
            message.react(message.guild?.emojis.cache.get(config.LIKE_EMOJI) || "👍");
            return;
        }

        if (config.ONLY_IMAGE_CHANNELS.includes(message.channelId)) {
            if (message.attachments.size == 0) {
                const noLink = message.content.split(" ").filter(isValidUrl).length == 0;
                if (noLink) {
                    if (config.isModOrOwner(message.member)) return;

                    message.delete();
                    const messageChannel = client.channels.cache.get(message.channelId) as TextBasedChannel;
                    const warn = messageChannel.send({ content: "**مسموح فقط بالصور والروابط في هذه القناة!!**\nالردود تكون في الثريد" });
                    setTimeout(() => warn.then((msg: Message) => msg.delete()), 4000);
                    return;
                }
            }
            if (message.channelId == config.SHARE_WORK) {
                message.startThread({
                    name: `التعليق على المشاركة`,
                    rateLimitPerUser: 4
                });
                message.react(message.guild?.emojis.cache.get(config.LIKE_EMOJI) || "👍");
            }
        }

        if (config.isModOrOwner(message.member) 
            || config.NO_XP_CAHNNELS.includes(message.channelId)) return;

        //* Give Xp
        if (message.channel.isThread() || message.channel.type == ChannelType.GuildText) {
            if (!message.channel.parentId) return;

            for (const key in xpChannels) {
                const xpChannel = xpChannels[key as keyof typeof xpChannels];
                if (message.channelId == xpChannel.id || message.channel.parentId == xpChannel.id) {
                    let xp = 0;
                    if (message.content.length > xpChannel.xpRate) {
                        xp = Math.trunc(message.content.length / xpChannel.xpRate);
                        await lvlsys.AddXp(message.author.id, xp);
                        await lvlsys.GiveRole(message.member);
                    }
                    return;
                }
            }
        }

    }

);
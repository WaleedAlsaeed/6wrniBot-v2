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
        if (message.channelId == config.SPAM_CHANNEL)
            return;
        if (config.isModOrOwner(message.member))
            return;

        if (config.ONLY_IMAGE_CHANNELS.includes(message.channelId)) {
            if (message.attachments.size == 0) {
                const noLink = message.content.split(" ").filter(isValidUrl).length == 0;
                if (noLink) {
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

        //* Give Xp
        if (message.channel.isThread() && message.channel.parent) {
            if (message.channel.parent.type == ChannelType.GuildForum) {
                if (message.author.id != message.thread?.ownerId) {
                    for (const forum in [xpChannels.Niqashat, xpChannels.UnityForum]) {
                        const channel = xpChannels[forum as keyof typeof xpChannels];
                        if (message.channel.parentId == channel.id) {
                            let xp = 0;
                            if (message.content.length > channel.xpRate) {
                                xp = Math.trunc(message.content.length / channel.xpRate);
                                await lvlsys.AddXp(message.author.id, xp);
                                await lvlsys.GiveRole(message.member);
                            }
                        }
                    }
                }
            }
        }
        else if (message.channel.type == ChannelType.GuildText) {
            for (const chnl in xpChannels) {
                const channel = xpChannels[chnl as keyof typeof xpChannels];
                if (message.channelId == channel.id || message.channel.parentId == channel.id) {
                    let xp = 0;
                    if (message.content.length > channel.xpRate) {
                        xp = Math.trunc(message.content.length / channel.xpRate);
                        await lvlsys.AddXp(message.author.id, xp);
                        await lvlsys.GiveRole(message.member);
                    }
                    return;
                }
            }
        }

    }

);
import { EmbedBuilder, Message, PartialMessage, TextBasedChannel, userMention, Events } from 'discord.js';
import { Event } from "../structures/Event"
import { getClient, config } from '../index';

const mSecToSec = (ms: number | null) => {
    if (!ms)
        return 0;
    return Math.trunc(ms / 1000);
}

export default new Event(
    Events.MessageDelete,
    async (message: Message<boolean> | PartialMessage) => {
        const client = getClient();
        if (!message.member || !message.content)
            return;
        if (config.isModOrOwner(message.member))
            return;

        const embed = new EmbedBuilder()
            .setTitle(`[حذف رسالة] - ${message.member.user.tag}`)
            .setDescription(`حذف ${userMention(message.member.id)} رسالة في ${message.channel.toString()}`)
            .setColor(config.DEFAULT_COLOR)
            .addFields(
                { name: "تاريخ الإرسال:", value: `<t:${mSecToSec(message.createdTimestamp)}:f>`},
                { name: "المحتوى:", value: message.content }
            );

        const deletedMessages = client.channels.cache.get(config.DELETED_MESSAGES_CHANNEL) as TextBasedChannel;
        deletedMessages.send({ embeds: [embed] });
    }
);
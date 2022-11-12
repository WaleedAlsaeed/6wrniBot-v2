import { EmbedBuilder, Message, PartialMessage, TextBasedChannel, userMention, Events } from 'discord.js';
import { Event } from "../structures/Event"
import { client, config } from '../index';

export default new Event(
    Events.MessageDelete,
    async (message: Message<boolean> | PartialMessage) => {

        if (!message.member || !message.content)
            return;
        if (config.isModOrOwner(message.member))
            return;

        const embed = new EmbedBuilder()
            .setTitle(`[حذف رسالة] - ${message.member.user.tag}`)
            .setDescription(`حذف ${userMention(message.member.id)} رسالة في ${message.channel.toString()}`)
            .setColor(config.DEFAULT_COLOR)
            .addFields(
                { name: "تاريخ الإرسال:", value: `<t:${message.createdTimestamp}:f>`},
                { name: "المحتوى:", value: message.content }
            );

        const deletedMessages = client.channels.cache.get(config.DELETED_MESSAGES_CHANNEL) as TextBasedChannel;
        deletedMessages.send({ embeds: [embed] });
    }
);
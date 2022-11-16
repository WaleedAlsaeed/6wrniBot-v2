import { ApplicationCommandOptionType, EmbedBuilder, User, userMention, ChannelType, TextBasedChannel, TextBasedChannelMixin } from 'discord.js';
import { Command } from '../../structures/Command';
import { client, config } from '../../index';

function isValidMsgUrl(str: string) {
    let url: URL;
    try {
        url = new URL(str);
        if (url.protocol == "https:" && url.host == "discord.com") return str;
        return ""
    } catch (_) {
        return "";
    }
}

export default new Command({
    name: "edit-message",
    description: "تعديل رسالة من البوت سواء كانت عادية أو ايمبد. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "msg-link",
            description: "رابط الرسالة",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "new-content",
            description: "النص الجديد",
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],
    run: async ({ interaction }) => {

        if (!config.isModOrOwner(interaction.member)) {
            await interaction.reply({ content: "ليس لديك صلاحية استخدام الأمر!" });
            return;
        }

        let msgLink = interaction.options.getString("msg-link", true);
        const content = interaction.options.getString("new-content", true);

        let ids = isValidMsgUrl(msgLink).split("/").reverse();

        const msgId = ids[0];
        const channelId = ids[1];

        const channel = client.channels.cache.get(channelId);
        if (!channel?.isTextBased())
            return await interaction.followUp("لا يمكن تعديل الرسالة في هذه القناة")

        await channel.messages.fetch(msgId)
            .then(async (message) => {
                if (message.author.id == client.user?.id) {
                    if (message.embeds.length > 0) {
                        const embed = new EmbedBuilder()
                            .setColor(config.DEFAULT_COLOR)
                            .setDescription(content);
                        return await message.edit({ embeds: [embed] })
                    }
                    await message.edit({ content: content })
                }
                else {
                    await interaction.followUp("الرابط ليس لرسالة أرسلها البوت!")
                }

                await interaction.followUp("تم التعديل!");
            })
            .catch(console.error)

        
    },
})
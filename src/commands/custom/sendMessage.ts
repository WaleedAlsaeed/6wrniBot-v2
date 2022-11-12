import { ApplicationCommandOptionType, EmbedBuilder, User, userMention, ChannelType, TextBasedChannel, TextBasedChannelMixin } from 'discord.js';
import { Command } from '../../structures/Command';
import { client, config } from '../../index';


export default new Command({
    name: "send-message",
    description: "إرسال رسالة من البوت. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "channel",
            description: "القناة",
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "content",
            description: "المحتوى",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "in-embed",
            description: "لا شرح",
            type: ApplicationCommandOptionType.Boolean,
            required: false
        },
    ],
    run: async ({ interaction }) => {

        if (!config.isModOrOwner(interaction.member)) {
            await interaction.reply({ content: "ليس لديك صلاحية استخدام الأمر!" });
            return;
        }

        let channel = interaction.options.getChannel("channel", true);
        const content = interaction.options.getString("content", true);
        const isEmbed = interaction.options.getBoolean("in-embed");

        const chnl = client.channels.cache.get(channel.id);
        if (chnl?.isTextBased()) {
            await interaction.followUp("يتم العمل على ذلك");
            if (isEmbed == true) {
                const embed = new EmbedBuilder()
                    .setColor(config.DEFAULT_COLOR)
                    .setDescription(content);
                return await chnl.send({ embeds: [embed] })
            }
            return await chnl.send({ content: content });
        }
        await interaction.followUp("تعذر إ{سال رسالة في هذه القناة");
    },
})
import { ApplicationCommandOptionType, EmbedBuilder, TextBasedChannel, User, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { lvlsys, config, client } from '../../index';

function mSecToSec(ms: number | null) {
    if (!ms)
        return 0;
    return Math.trunc(ms / 1000);
}

export default new Command({
    name: "suggest",
    description: "إرسال اقتراح متعلق بالسيرفر أو المنصة عمومًا",
    onlyInCommandChannel: true,
    options: [
        {
            name: "content",
            description: "محتوى الإقتراح",
            type: ApplicationCommandOptionType.String,
            required: true 
        }
    ],
    run: async ({ interaction }) => {



        const content = interaction.options.getString("content", true);

        if (content.length < 10) {
            return await interaction.followUp({ content: "يرجى كتابة إقتراح حقيقي مع تفاصيله!!"});
        }

        const embed = new EmbedBuilder()
        .setTitle(`[إقتراح] - ${interaction.user.tag}`)
        .setColor(config.DEFAULT_COLOR)
        .addFields(
            { name: "التفاصيل", value: content}
        );

        const suggestChannel = client.channels.cache.get(config.SUGGEST_CHANNEL) as TextBasedChannel;
        await suggestChannel.send({ embeds: [embed]});

        await interaction.followUp({ content: "تم إرسال الإقتراح!"});

    },
})
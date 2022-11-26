import { ApplicationCommandOptionType, EmbedBuilder, TextBasedChannel, User, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { config, getClient } from '../../index';

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
        },
        {
            name: "image",
            description: "صورة لللإقتراح",
            type: ApplicationCommandOptionType.Attachment,
            required: false
        }
    ],
    run: async ({ interaction }) => {
        const client = getClient();
        const content = interaction.options.getString("content", true);
        const image = interaction.options.getAttachment("image", false);

        if (content.length < 10) {
            return await interaction.followUp({ content: "يرجى كتابة إقتراح حقيقي مع تفاصيله!!" });
        }

        const embed = new EmbedBuilder()
            .setTitle(`[إقتراح] - ${interaction.user.tag}`)
            .setColor(config.DEFAULT_COLOR)
            .addFields(
                { name: "التفاصيل", value: content + "\n" }
            );

        if (image && image.name) {
            if (image.name.endsWith("jpg")
            || image.name?.endsWith("jpeg")
            || image.name?.endsWith("png")
            || image.name.endsWith("webp")) {
                
                embed.setImage(image.url);
            } else {
                return await interaction.followUp({ content: "الصيغ المدعومة هي png/jpg/jpeg/webp فقط!" });
            }
        }
        const suggestChannel = client.channels.cache.get(config.SUGGEST_CHANNEL) as TextBasedChannel;
        await suggestChannel.send({ embeds: [embed] });
        await interaction.followUp({ content: "تم إرسال الإقتراح!" });
    },
})
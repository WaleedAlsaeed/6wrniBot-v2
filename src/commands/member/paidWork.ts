import { ApplicationCommandOptionType, EmbedBuilder, User, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { lvlsys, config, client } from '../../index';
import { channel } from 'diagnostics_channel';


export default new Command({
    name: "paid-work",
    description: "إرسال عرض أو خدمة في قناة المدفوع",
    onlyInCommandChannel: true,
    options: [
        {
            name: "name",
            description: "اسمك",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "email",
            description: "البريد الالكتروني",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "the-job",
            description: "الوظيفة المطلوبة / نوع الخدمة",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "amount",
            description: "السعر بالدولار",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "talk-ways",
            description: "طرق التواصل",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "info",
            description: "معلومات حول الوظيفة أو الخدمة",
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],
    run: async ({ interaction }) => {
        const name = interaction.options.getString("name", true);
        const email = interaction.options.getString("email", true);
        const theJob = interaction.options.getString("the-job", true);
        const amount = interaction.options.getString("amount", true);
        const talkWays = interaction.options.getString("talk-ways", true);
        const info = interaction.options.getString("info", true);

        const embed = new EmbedBuilder()
            .setColor(config.DEFAULT_COLOR)
            .setTitle(`مقدم من ${interaction.user.tag}`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                { name: "- الإسم:", value: name },
                { name: "- البريد الإلكتروني:", value: email },
                { name: "- الوظيفة:", value: theJob },
                { name: "- معلومات:", value: info },
                { name: "- المبلغ:", value: amount },
                { name: "- طرق التواصل:", value: talkWays }
            );
        const chnl = client.channels.cache.get(config.PAID_WORK);
        if (chnl?.isTextBased()) {
            await chnl.send({ embeds: [embed] })
            return await interaction.followUp("تم الإرسال");
        } 

        await interaction.followUp("حدث خطأ ما");
    },
})
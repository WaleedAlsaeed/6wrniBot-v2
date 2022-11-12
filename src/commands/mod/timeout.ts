import { ApplicationCommandOptionType, AutocompleteInteraction, Interaction, EmbedBuilder, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { client, config } from '../../index';

const hourToSec = (h: number) => {
    if (!h)
        return 0;
    return Math.trunc(h * 60 * 60 * 100000);
}

export default new Command({
    name: "timeout",
    description: "كتم عضو في السيرفر. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "member",
            description: "طرد حسب إسم العضو",
            type: ApplicationCommandOptionType.User,
            required: true 
        },
        {
            name: "time",
            description: "مدة الكتم بالساعات",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: "reason",
            description: "السبب",
            type: ApplicationCommandOptionType.String,
            required: false
        },
    ],
    run: async ({ interaction }) => {

        if(!config.isModOrOwner(interaction.member)){
            await interaction.followUp({ content: "ليس لديك صلاحية استخدام الأمر!"});
            return;
        }
        
        const user = interaction.options.getUser("member", true);
        const time = interaction.options.getNumber("time", true);
        const reason = interaction.options.get("reason")?.value?.toString() || "غير محدد";

        const member = await interaction.guild?.members.fetch(user.id);

        if(!member) {
            await interaction.followUp({content: "العضو المحدد غير موجود بالسيرفر", ephemeral: true});
            return;
        }
        
        await member.timeout(hourToSec(time), reason).catch(console.error);
        
        const embed = new EmbedBuilder()
        .setColor(config.DEFAULT_COLOR)
        .setTitle("🛑[كتم عضو]🛑")
        .setDescription(`تم كتم ${userMention(user.id)}`)
        .addFields(
            { name: "السبب:", value: reason},
            { name: "المدة:", value: `${time}h`}
        )
        .setFooter({ text: `${interaction.user.tag} | ${interaction.createdAt}`, iconURL: interaction.user.displayAvatarURL()});;

        await interaction.followUp({embeds: [embed]})

        const modLog = client.channels.cache.get(config.MOD_LOG);
        if(modLog?.isTextBased()) modLog.send({embeds: [embed]})
    },
})
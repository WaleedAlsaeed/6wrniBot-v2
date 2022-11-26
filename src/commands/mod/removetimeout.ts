import { ApplicationCommandOptionType, AutocompleteInteraction, Interaction, EmbedBuilder, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { getClient, config } from '../../index';

export default new Command({
    name: "untimeout",
    description: "إزالة الكتم عن عضو في السيرفر. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "member",
            description: "إسم العضو",
            type: ApplicationCommandOptionType.User,
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
        const client = getClient();
        if(!config.isModOrOwner(interaction.member)){
            await interaction.followUp({ content: "ليس لديك صلاحية استخدام الأمر!"});
            return;
        }
        
        const user = interaction.options.getUser("member", true);
        const reason = interaction.options.get("reason")?.value?.toString() || "غير محدد";

        const member = await interaction.guild?.members.fetch(user.id);

        if(!member) {
            await interaction.followUp({content: "العضو المحدد غير موجود بالسيرفر", ephemeral: true});
            return;
        }
        
        await member.timeout(null, reason).catch(console.error);
        
        const embed = new EmbedBuilder()
        .setColor(config.DEFAULT_COLOR)
        .setTitle("🛑[إزالة الكتم]🛑")
        .setDescription(`تمت ازالة كتم ${userMention(user.id)}`)
        .addFields({ name: "السبب:", value: reason})
        .setFooter({ text: `${interaction.user.tag} | ${interaction.createdAt}`, iconURL: interaction.user.displayAvatarURL()});;

        await interaction.followUp({embeds: [embed]})

        const modLog = client.channels.cache.get(config.MOD_LOG);
        if(modLog?.isTextBased()) modLog.send({embeds: [embed]})
    },
})
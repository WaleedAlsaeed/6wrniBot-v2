import { ApplicationCommandOptionType, EmbedBuilder, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { client, config } from '../../index';

export default new Command({
    name: "kick",
    description: "طرد عضو من السيرفر. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "member",
            description: "اسم العضو",
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

        if(!config.isModOrOwner(interaction.member)){
            await interaction.reply({ content: "ليس لديك صلاحية استخدام الأمر!"});
            return;
        }
        
        const user = interaction.options.getUser("member", true);
        const reason = interaction.options.get("reason")?.value?.toString() || "غير محدد";

        const member = await interaction.guild?.members.fetch(user.id);

        if(!member) {
            await interaction.followUp({content: "العضو المحدد غير موجود بالسيرفر", ephemeral: true});
            return;
        }

        if(config.isModOrOwner(member)){
            await interaction.followUp({ content: "لا يمكنك طرد المشرفين!"});
            return;
        }

        await member.kick(reason).catch(console.error);
        
        const embed = new EmbedBuilder()
        .setColor(config.DEFAULT_COLOR)
        .setTitle("🛑[طرد عضو]🛑")
        .setDescription(`تم طرد ${userMention(user.id)}`)
        .addFields({ name: "السبب:", value: reason})
        .setFooter({ text: `${interaction.user.tag} | ${interaction.createdAt}`, iconURL: interaction.user.displayAvatarURL()});

        await interaction.followUp({embeds: [embed]})

        const modLog = client.channels.cache.get(config.MOD_LOG);
        if(modLog?.isTextBased()) modLog.send({embeds: [embed]})
    },
})
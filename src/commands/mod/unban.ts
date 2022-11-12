import { ApplicationCommandOptionType, EmbedBuilder, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { client } from '../../index';
import { Config } from '../../config/consts';


export default new Command({
    name: "unban",
    description: "رفع الحظر عن عضو. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "user",
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

        const config = new Config();

        if(!config.isModOrOwner(interaction.member)){
            await interaction.reply({ content: "ليس لديك صلاحية استخدام الأمر!"});
            return;
        }
        
        const user = interaction.options.get("user")?.user;
        const reason = interaction.options.get("reason")?.value?.toString() || "غير محدد";

        if(!user) {
            await interaction.followUp({content: "نسيت كتابة إسم العضو", ephemeral: true});
            return;
        }

        await interaction.guild?.members.unban(user.id, reason).catch(console.error);
        
        const embed = new EmbedBuilder()
        .setColor(config.DEFAULT_COLOR)
        .setTitle("🛑[حظر عضو]🛑")
        .setDescription(`تم حظر ${userMention(user.id)}`)
        .addFields({ name: "السبب", value: reason})
        .setFooter({ text: `${interaction.user.tag} | ${interaction.createdAt}`, iconURL: interaction.user.displayAvatarURL()});;

        await interaction.followUp({embeds: [embed]})

        const modLog = client.channels.cache.get(config.MOD_LOG);
        if(modLog?.isTextBased()) modLog.send({embeds: [embed]})
    },
})
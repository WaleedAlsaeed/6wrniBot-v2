import { ApplicationCommandOptionType, AutocompleteInteraction, Interaction, EmbedBuilder, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { config, lvlsys } from '../../index';

export default new Command({
    name: "remove-xp",
    description: "إزالة نقاط عضو في السيرفر. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "member",
            description: "طرد حسب إسم العضو",
            type: ApplicationCommandOptionType.User,
            required: true 
        },
        {
            name: "amount",
            description: "الكمية المراد إزالتها",
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    run: async ({ interaction }) => {

        if(!config.isModOrOwner(interaction.member)){
            await interaction.followUp({ content: "ليس لديك صلاحية استخدام الأمر!"});
            return;
        }
        
        const user = interaction.options.getUser("member", true);
        const amount = interaction.options.getNumber("amount", true);

        const member = await interaction.guild?.members.fetch(user.id);
        if(!member) {
            await interaction.followUp({content: "العضو المحدد غير موجود بالسيرفر", ephemeral: true});
            return;
        }

        await lvlsys.RemoveXp(user.id, amount);
        const embed = new EmbedBuilder()
        .setTitle(`[Remove-Xp] - ${user.username}`)
        .setColor(config.DEFAULT_COLOR);
        await interaction.followUp({ embeds: [embed]});
        await lvlsys.RemoveRole(member);

    },
})
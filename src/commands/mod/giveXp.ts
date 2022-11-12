import { ApplicationCommandOptionType, AutocompleteInteraction, Interaction, EmbedBuilder, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { config, lvlsys } from '../../index';

export default new Command({
    name: "give-xp",
    description: "إعطاء نقاط لعضو في السيرفر. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "member",
            description: "اسم العضو",
            type: ApplicationCommandOptionType.User,
            required: true 
        },
        {
            name: "amount",
            description: "الكمية المراد إعطاءها",
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
        
        await lvlsys.AddXp(user.id, amount);
        const embed = new EmbedBuilder()
        .setTitle(`[Give-Xp] - ${user.username}`)
        .setColor(config.DEFAULT_COLOR);
        await interaction.followUp({ embeds: [embed]});
        await lvlsys.GiveRole(member);
    },
})
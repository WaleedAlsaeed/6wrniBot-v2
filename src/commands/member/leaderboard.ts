import { ApplicationCommandOptionType, EmbedBuilder, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { lvlsys, config } from '../../index';


export default new Command({
    name: "leaderboard",
    description: "عرض المستوى الخاص بك",
    onlyInCommandChannel: true,
    options: [
        {
            name: "count",
            description: "عدد الذين تريد عرضهم بالقائمة",
            type: ApplicationCommandOptionType.Number,
            required: true 
        }
    ],
    run: async ({ interaction }) => {

        const count = interaction.options.getNumber("count", true);

        if (count > 40 || count < 3) {
            return await interaction.followUp({ content: "يجب أن تكون القيمة بين 3 و 40"})
        }
        const leaderboard = await lvlsys.XpLeaderBoard(count);
        
        const embed = new EmbedBuilder();
        let i = 0;
        for (const member of leaderboard) {
            i += 1;
            embed.addFields({
                name: `${i}. ${userMention(member.memberId)}`,
                value: `totalXp: ${member.xp}`
            });
        }

        await interaction.followUp({embeds: [embed]})

    },
})
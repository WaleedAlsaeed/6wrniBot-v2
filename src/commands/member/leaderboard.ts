import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
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

        let count = interaction.options.getNumber("count", true);

        if (count > 25 || count < 3) {
            count = 20;
        }
        const leaderboard = await lvlsys.XpLeaderBoard(count);
        
        const embed = new EmbedBuilder()
        .setColor(config.DEFAULT_COLOR);
        let i = 0;
        for (const member of leaderboard) {
            i += 1;
            embed.addFields({
                name: `A-${i}. ${(await interaction.guild?.members.fetch(member.memberId))?.displayName}`,
                value: `[XP: ${member.xp} --- lvl: ${await lvlsys.MemberLvl(member.memberId)}]`,
                inline: true
            });
        }

        await interaction.followUp({embeds: [embed]})

    },
})
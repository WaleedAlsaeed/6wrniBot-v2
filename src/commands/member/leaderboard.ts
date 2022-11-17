import { EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command';
import { lvlsys, config } from '../../index';


export default new Command({
    name: "leaderboard",
    description: "عرض أعلى 24 عضو في النقاط",
    onlyInCommandChannel: true,
    run: async ({ interaction }) => {

        const leaderboard = await lvlsys.XpLeaderBoard(24);
        
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
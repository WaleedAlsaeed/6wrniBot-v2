import { ApplicationCommandOptionType, EmbedBuilder, GuildMember, User, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { config, lvlsys } from '../../index';
import { Contest } from '../../schema/members';


export default new Command({
    name: "top-contestants",
    description: "ترتيب المشاركين بالمسابقات",
    onlyInCommandChannel: false,
    run: async ({ interaction }) => {
        const allContestants = await Contest.find({}).sort({ wins: -1 });
        const embed = new EmbedBuilder().setColor(config.DEFAULT_COLOR);
        for (let i = 0; i < allContestants.length; i++) {
            if (i > 24) break;
            const element = allContestants[i];
            embed.addFields({
                name: `C:${i}. ${(await interaction.guild?.members.fetch(element.memberId))?.displayName}`,
                value: `[WINS: ${element.wins}]`,
                inline: true
            });
        }

        await interaction.followUp({ embeds: [embed]})
    },
})
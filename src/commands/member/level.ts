import { ApplicationCommandOptionType, EmbedBuilder, User, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { lvlsys, config } from '../../index';


export default new Command({
    name: "level",
    description: "عرض المستوى الخاص بك",
    onlyInCommandChannel: true,
    options: [
        {
            name: "member",
            description: "معرفة مستوى عضو آخر، تجاهله ان اردت معرفة مستواك",
            type: ApplicationCommandOptionType.User,
            required: false 
        }
    ],
    run: async ({ interaction }) => {

        let user = interaction.options.getUser("member");
        
        if (!user) user = interaction.member.user;
        
        const totalXp = await lvlsys.GetMemberXp(user.id);
        let xpInLvl = Number(totalXp);
        for (let i = 1; i < 1000; i++) {
            let requiredlvlxp = i * 100;
            if (totalXp <= requiredlvlxp) {
                xpInLvl -= ((i - 1) * 100);

                const embed = new EmbedBuilder()
                .setThumbnail(user.displayAvatarURL())
                .setColor(config.DEFAULT_COLOR)
                .setTitle(`[مستوى] - ${user.username}`)
                .addFields(
                    { name: "مجموع النقاط:", value: `${totalXp}`},
                    { name: "النقاط:", value: `${xpInLvl}/${requiredlvlxp}`},
                    { name: "المستوى:", value: `${i}`},
                    { name: "الترتيب:", value: `${await lvlsys.MemberRank(user.id)}`}
                )

                await interaction.followUp({embeds: [embed]});
                break;
            }
        }
        
        

    },
})
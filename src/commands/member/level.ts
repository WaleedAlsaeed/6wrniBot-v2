import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command';
import { lvlsys, config } from '../../index';
import { Contest } from '../../schema/members';


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
        const highestRoleColor = (await interaction.guild?.members.fetch(user.id))?.roles.highest.color;
        const totalXp = await lvlsys.GetMemberXp(user.id);
        const lvl = await lvlsys.MemberLvl(user.id);
        let requiredlvlxp = ((lvl - 1) * lvl) * 50;

        const embed = new EmbedBuilder()
        .setThumbnail(user.displayAvatarURL())
        .setColor(highestRoleColor || config.DEFAULT_COLOR)
        .setTitle(`[مستوى] - ${user.username}`)
        .addFields(
            { name: "مجموع النقاط:", value: `${totalXp}`},
            { name: "المستوى:", value: `${lvl}`},
            { name: "النقاط:", value: `${totalXp - requiredlvlxp}/${lvl * 100}`},
            { name: "الترتيب:", value: `${await lvlsys.MemberRank(user.id)}`},
            { name: "المسابقات المشارك بها:", value: `${(await Contest.findOne({ memberId: user.id}))?.wins || 0}`}
        )
        await interaction.followUp({embeds: [embed]});

    },
})
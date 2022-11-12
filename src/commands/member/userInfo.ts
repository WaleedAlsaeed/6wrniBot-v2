import { ApplicationCommandOptionType, EmbedBuilder, User, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { lvlsys, config } from '../../index';

function mSecToSec(ms: number | null) {
    if (!ms)
        return 0;
    return Math.trunc(ms / 1000);
}

export default new Command({
    name: "userinfo",
    description: "عرض معلومات العضو",
    onlyInCommandChannel: true,
    options: [
        {
            name: "member",
            description: "معرفة معلومات عضو آخر، تجاهله ان اردت معرفة معلوماتك",
            type: ApplicationCommandOptionType.User,
            required: false 
        }
    ],
    run: async ({ interaction }) => {

        let user = interaction.options.getUser("member");
        if (!user) user = interaction.member.user;
        
        const member = await interaction.guild?.members.fetch(user.id);

        if(!member) {
            await interaction.followUp({content: "العضو المحدد غير موجود بالسيرفر", ephemeral: true});
            return;
        }

        const embed = new EmbedBuilder()
        .setThumbnail(user.displayAvatarURL())
        .setColor(config.DEFAULT_COLOR)
        .addFields(
            { name: "الإسم:",  value: `${user.tag}`},
            { name: "id:",  value: `${user.id}`},
            { name: "تاريخ إنشاء الحساب:",  value: `<t:${mSecToSec(member.user.createdTimestamp)}:f> (<t:${mSecToSec(member.user.createdTimestamp)}:R>)`},
            { name: "تاريخ الإنضمام:",  value: `<t:${mSecToSec(member.joinedTimestamp)}:f> (<t:${mSecToSec(member.joinedTimestamp)}:R>)`},
        );

        await interaction.followUp({ embeds: [embed]});

    },
})
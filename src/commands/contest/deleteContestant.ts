import { ApplicationCommandOptionType, EmbedBuilder, GuildMember, User, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { config } from '../../index';
import { Contest } from '../../schema/members';
import { type } from 'os';


export default new Command({
    name: "top-contestants",
    description: "ترتيب المشاركين بالمسابقات",
    onlyInCommandChannel: false,
    options: [
        {
            name: "member",
            description: "العضو",
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    run: async ({ interaction }) => {
        if(!config.isModOrOwner(interaction.member)){
            await interaction.followUp({ content: "ليس لديك صلاحية استخدام الأمر!"});
            return;
        }

        const member = interaction.options.getUser("member", true);

        if (await Contest.findOne({ memberId: member.id })) {
            await Contest.deleteOne({ memberId: member.id });
            await interaction.followUp("لقد تم حذف جميع مشاركات العضو!");
            return;
        }
        await interaction.followUp("ليس لهذا العضو أي مشاركات مسجلة");
    },
})
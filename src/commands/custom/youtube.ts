import { ApplicationCommandOptionType, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { stringify } from 'query-string';

export default new Command({
    name: "youtube",
    description: "إرسال نتائج بحث حول موضوع معين في يوتيوب",
    onlyInCommandChannel: false,
    options: [
        {
            name: "qeury",
            description: "الشيء المراد بحث عنه",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "member",
            description: "العضو المراد إعطاءه الرابط",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    run: async ({ interaction }) => {

        const qeury = interaction.options.getString("qeury", true);
        const member = interaction.options.getUser("member");
        let msg = `https://youtube.com/results?${stringify({search_query:qeury})}`
        if (member) msg = `هذا الرابط لك يا ${userMention(member.id)}\n` + msg; 
        await interaction.followUp(msg);
        
    },
})
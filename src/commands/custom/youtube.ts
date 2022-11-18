import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../structures/Command';
import { stringify } from 'query-string';

export default new Command({
    name: "youtube",
    description: "إرسال نتائج بحث حول موضوع معين في يوتيوب",
    onlyInCommandChannel: false,
    options: [
        {
            name: "qeury",
            description: "المحتوى",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async ({ interaction }) => {

        const qeury = interaction.options.getString("qeury", true);
        await interaction.followUp(`https://youtube.com/results?${stringify({search_query:qeury})}`)
        
    },
})
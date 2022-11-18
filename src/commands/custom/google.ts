import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../structures/Command';
import { stringify } from 'query-string';

export default new Command({
    name: "google",
    description: "إرسال نتائج بحث حول موضوع معين في جوجل",
    onlyInCommandChannel: false,
    options: [
        {
            name: "qeury",
            description: "الشيء المراد بحث عنه",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async ({ interaction }) => {

        const qeury = interaction.options.getString("qeury", true);
        await interaction.followUp(`https://google.com/search?${stringify({q:qeury})}`)
        
    },
})
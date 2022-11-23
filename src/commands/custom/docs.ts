import { ApplicationCommandOptionType, EmbedBuilder, User, userMention, ChannelType, TextBasedChannel, TextBasedChannelMixin } from 'discord.js';
import { Command } from '../../structures/Command';
import docs from "../../config/unityDocs.json";

const choices = docs["Manual"].concat(docs["ScriptReference"]);

function isSubSequence(str1:string, str2:string, m:number, n:number): boolean {
     
    // Base Cases
    if (m == 0)
        return true;
    else if (n == 0)
        return false;

    // If last characters of two strings
    // are matching
    if (str1[m - 1] == str2[n - 1])
        return isSubSequence(str1, str2,
                             m - 1, n - 1);

    // If last characters are not matching
    return isSubSequence(str1, str2, m, n - 1);
}

export default new Command({
    name: "unity-docs",
    description: "تعديل رسالة من البوت سواء كانت عادية أو ايمبد. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "qeury",
            description: "الشيء المراد بحث عنه",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "member",
            description: "العضو المراد إعطاءه الرابط",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    autocomplete: async (interaction, client) => {
        const focusedValue = interaction.options.getFocused();
		const filtered = choices.filter(choice => isSubSequence(focusedValue, choice, focusedValue.length, choice.length));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })).slice(0, 25),
		);
    },
    run: async ({ interaction }) => {
        const qeury = interaction.options.getString("qeury", true);

        let msg = "";

        if (docs["Manual"].filter(obj => obj == qeury).length == 1) {
            msg = `https://docs.unity3d.com/Manual/${qeury}.html`;
        }
        else if (docs["ScriptReference"].filter(obj => obj == qeury).length == 1) {
            msg = `https://docs.unity3d.com/ScriptReference/${qeury}.html`;
        }
        else {
            msg = "لم أجد نتائج متعلقة بما بحثت عنه، اختر القيمة من الخيارات الظاهرة لك"
            return await interaction.followUp(msg);
        }

        const member = interaction.options.getUser("member");
        if (member) msg = `هذا الرابط لك يا ${userMention(member.id)}\n` + msg;

        await interaction.followUp(msg);
    },
})
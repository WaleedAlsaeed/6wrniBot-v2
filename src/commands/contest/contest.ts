import { ApplicationCommandOptionType, EmbedBuilder, GuildMember, User, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { client, config } from '../../index';
import { Contest } from '../../schema/members';
const mongoos = require('mongoose')

async function GiveRole(member: GuildMember, wins:number) {
    if (wins >= 3) { // فائز برونزي
        const role = member.guild.roles.cache.get("1045253673917370398");
        if (role && member.roles.cache.get(role.id)) member.roles.add(role);
    }
    if (wins >= 10) { // فائز فضي
        const role = member.guild.roles.cache.get("1045253673917370398");
        if (role && member.roles.cache.get(role.id)) member.roles.add(role);
    }
    if (wins >= 20) { // فائز ذهبي
        const role = member.guild.roles.cache.get("1045253673917370398");
        if (role && member.roles.cache.get(role.id)) member.roles.add(role);
    }
    if (wins >= 35) { // فائز بلاتيني
        const role = member.guild.roles.cache.get("1045253673917370398");
        if (role && member.roles.cache.get(role.id)) member.roles.add(role);
    }
}

export default new Command({
    name: "contest-winners",
    description: "تسجيل الفائزين بالمسابقة. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "id",
            description: "ضع آي دي الخاص بالفائزين هنا حيث يوجد بين كل آي دي مسافة",
            type: ApplicationCommandOptionType.String,
            required: true 
        },
        {
            name: "number",
            description: "رقم المسابقة الحالية",
            type: ApplicationCommandOptionType.Number,
            required: true 
        }
    ],
    run: async ({ interaction }) => {

        if(!config.isModOrOwner(interaction.member)){
            await interaction.followUp({ content: "ليس لديك صلاحية استخدام الأمر!"});
            return;
        }
        
        const ids = interaction.options.getString("id", true).split(" ");
        const number = interaction.options.getNumber("number", true);

        let winners = "";
        let added = ids.length;

        
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            
            const guildMember = await interaction.guild?.members.fetch(id);
            if (!guildMember) {
                return await interaction.followUp("تأكد من ال id التي أضفتها، هناك id لعضو ليس موجود بالسيرفر");
            }
            
            let member = await Contest.findOne({ memberId: id});
            if (member) {
                if (member.wins < number) {
                    await Contest.updateOne({ memberId: id }, { wins: member.wins + 1 })
                    await GiveRole(guildMember, member.wins)
                }
            }
            else {
                let newMember = new Contest({
                    _id: mongoos.Types.ObjectId(),
                    memberId: id,
                    wins: 1
                });
                await newMember.save();
            }

            winners += `C: ${userMention(id)}\n`
        }

        const allContestants = await Contest.find({});
        let notActive = 0;
        for (let i = 0; i < allContestants.length; i++) {
            const contestant = allContestants[i];
            if (number - contestant.wins >= 3) {
                notActive += 1;
                config.LogChannel(`العضو ${userMention(contestant.memberId)} ليس مشارك من 3 مسابقات، قم بإنقاص رتبته`)
            }   
        }

        let msg = `لقد تم تحديد المشاركين وتوزيع الرتب ل ${added} عضو، وهم: \n${winners}`;
        msg += `\nوقد تم اكتشاف وجود ${notActive} عضو غير متفاعل منذ 3 مسابقات`;
        msg += `\nتم إرسال أسماءهم في القناة السرية ;)`;
        await interaction.followUp(msg);
    },
})
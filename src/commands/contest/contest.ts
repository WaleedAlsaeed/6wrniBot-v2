import { ApplicationCommandOptionType, EmbedBuilder, GuildMember, User, userMention } from 'discord.js';
import { Command } from '../../structures/Command';
import { client, config, lvlsys } from '../../index';
import { Contest } from '../../schema/members';
const mongoos = require('mongoose')

function GiveRole(member: GuildMember, wins:number) {
    if (wins >= 3) { // فائز برونزي
        const role = member.guild.roles.cache.get("1044949411953901578");
        if (role && member.roles.cache.get(role.id)) member.roles.add(role);
    }
    if (wins >= 10) { // فائز فضي
        const role = member.guild.roles.cache.get("1044949538273771562");
        if (role && member.roles.cache.get(role.id)) member.roles.add(role);
    }
    if (wins >= 20) { // فائز ذهبي
        const role = member.guild.roles.cache.get("1044949646079967252");
        if (role && member.roles.cache.get(role.id)) member.roles.add(role);
    }
    if (wins >= 35) { // فائز بلاتيني
        const role = member.guild.roles.cache.get("1044949746529357869");
        if (role && member.roles.cache.get(role.id)) member.roles.add(role);
    }
}

function GiveXp(member: GuildMember):number {
    if (member.roles.cache.get("1044949746529357869")) return 3; // فائز بلاتيني
    if (member.roles.cache.get("1044949646079967252")) return 2.5; // فائز ذهبي
    if (member.roles.cache.get("1044949538273771562")) return 2; // فائز فضي
    if (member.roles.cache.get("1044949411953901578")) return 1.5; // فائز برونزي
    return 1;
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
                    await Contest.updateOne({ memberId: id }, { wins: member.wins + 1 });
                    GiveRole(guildMember, member.wins);
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
            const xp = 100 * GiveXp(guildMember);
            await lvlsys.AddXp(id, xp);
            winners += `**C:** ${userMention(id)}, **XP:** ${xp}\n`
        }

        const allContestants = await Contest.find({});
        let notActive = 0;
        for (let i = 0; i < allContestants.length; i++) {
            const contestant = allContestants[i];
            if (number - contestant.wins >= 3 && !ids.includes(contestant.memberId)) {
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
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
const index_1 = require("../../index");
const members_1 = require("../../schema/members");
const mongoos = require('mongoose');
function GiveRole(member, wins) {
    if (wins >= 3) { // فائز برونزي
        const role = member.guild.roles.cache.get("1044949411953901578");
        if (role && member.roles.cache.get(role.id))
            member.roles.add(role);
    }
    if (wins >= 10) { // فائز فضي
        const role = member.guild.roles.cache.get("1044949538273771562");
        if (role && member.roles.cache.get(role.id))
            member.roles.add(role);
    }
    if (wins >= 20) { // فائز ذهبي
        const role = member.guild.roles.cache.get("1044949646079967252");
        if (role && member.roles.cache.get(role.id))
            member.roles.add(role);
    }
    if (wins >= 35) { // فائز بلاتيني
        const role = member.guild.roles.cache.get("1044949746529357869");
        if (role && member.roles.cache.get(role.id))
            member.roles.add(role);
    }
}
function GiveXp(member) {
    if (member.roles.cache.get("1044949746529357869"))
        return 3; // فائز بلاتيني
    if (member.roles.cache.get("1044949646079967252"))
        return 2.5; // فائز ذهبي
    if (member.roles.cache.get("1044949538273771562"))
        return 2; // فائز فضي
    if (member.roles.cache.get("1044949411953901578"))
        return 1.5; // فائز برونزي
    return 1;
}
exports.default = new Command_1.Command({
    name: "contest-winners",
    description: "تسجيل الفائزين بالمسابقة. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "id",
            description: "ضع آي دي الخاص بالفائزين هنا حيث يوجد بين كل آي دي مسافة",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "number",
            description: "رقم المسابقة الحالية",
            type: discord_js_1.ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!index_1.config.isModOrOwner(interaction.member)) {
            yield interaction.followUp({ content: "ليس لديك صلاحية استخدام الأمر!" });
            return;
        }
        const ids = interaction.options.getString("id", true).split(" ");
        const number = interaction.options.getNumber("number", true);
        let winners = "";
        let added = ids.length;
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const guildMember = yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(id));
            if (!guildMember) {
                return yield interaction.followUp("تأكد من ال id التي أضفتها، هناك id لعضو ليس موجود بالسيرفر");
            }
            let member = yield members_1.Contest.findOne({ memberId: id });
            if (member) {
                if (member.wins < number) {
                    yield members_1.Contest.updateOne({ memberId: id }, { wins: member.wins + 1 });
                    GiveRole(guildMember, member.wins);
                }
            }
            else {
                let newMember = new members_1.Contest({
                    _id: mongoos.Types.ObjectId(),
                    memberId: id,
                    wins: 1
                });
                yield newMember.save();
            }
            const xp = 100 * GiveXp(guildMember);
            yield index_1.lvlsys.AddXp(id, xp);
            winners += `**C:** ${(0, discord_js_1.userMention)(id)}, **XP:** ${xp}\n`;
        }
        const allContestants = yield members_1.Contest.find({});
        let notActive = 0;
        for (let i = 0; i < allContestants.length; i++) {
            const contestant = allContestants[i];
            if (number - contestant.wins >= 3 && !ids.includes(contestant.memberId)) {
                notActive += 1;
                index_1.config.LogChannel(`العضو ${(0, discord_js_1.userMention)(contestant.memberId)} ليس مشارك من 3 مسابقات، قم بإنقاص رتبته`);
            }
        }
        let msg = `لقد تم تحديد المشاركين وتوزيع الرتب ل ${added} عضو، وهم: \n${winners}`;
        msg += `\nوقد تم اكتشاف وجود ${notActive} عضو غير متفاعل منذ 3 مسابقات`;
        msg += `\nتم إرسال أسماءهم في القناة السرية ;)`;
        yield interaction.followUp(msg);
    }),
});

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
function mSecToSec(ms) {
    if (!ms)
        return 0;
    return Math.trunc(ms / 1000);
}
exports.default = new Command_1.Command({
    name: "userinfo",
    description: "عرض معلومات العضو",
    onlyInCommandChannel: true,
    options: [
        {
            name: "member",
            description: "معرفة معلومات عضو آخر، تجاهله ان اردت معرفة معلوماتك",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: false
        }
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let user = interaction.options.getUser("member");
        if (!user)
            user = interaction.member.user;
        const member = yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(user.id));
        if (!member) {
            yield interaction.followUp({ content: "العضو المحدد غير موجود بالسيرفر", ephemeral: true });
            return;
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setThumbnail(user.displayAvatarURL())
            .setColor(index_1.config.DEFAULT_COLOR)
            .addFields({ name: "الإسم:", value: `${user.tag}` }, { name: "id:", value: `${user.id}` }, { name: "تاريخ إنشاء الحساب:", value: `<t:${mSecToSec(member.user.createdTimestamp)}:f> (<t:${mSecToSec(member.user.createdTimestamp)}:R>)` }, { name: "تاريخ الإنضمام:", value: `<t:${mSecToSec(member.joinedTimestamp)}:f> (<t:${mSecToSec(member.joinedTimestamp)}:R>)` });
        yield interaction.followUp({ embeds: [embed] });
    }),
});

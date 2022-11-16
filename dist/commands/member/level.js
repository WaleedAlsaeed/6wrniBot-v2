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
exports.default = new Command_1.Command({
    name: "level",
    description: "عرض المستوى الخاص بك",
    onlyInCommandChannel: true,
    options: [
        {
            name: "member",
            description: "معرفة مستوى عضو آخر، تجاهله ان اردت معرفة مستواك",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: false
        }
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let user = interaction.options.getUser("member");
        if (!user)
            user = interaction.member.user;
        const highestRoleColor = (_b = (yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(user.id)))) === null || _b === void 0 ? void 0 : _b.roles.highest.color;
        const totalXp = yield index_1.lvlsys.GetMemberXp(user.id);
        const lvl = yield index_1.lvlsys.MemberLvl(user.id);
        let requiredlvlxp = ((lvl - 1) * lvl) * 50;
        const embed = new discord_js_1.EmbedBuilder()
            .setThumbnail(user.displayAvatarURL())
            .setColor(highestRoleColor || index_1.config.DEFAULT_COLOR)
            .setTitle(`[مستوى] - ${user.username}`)
            .addFields({ name: "مجموع النقاط:", value: `${totalXp}` }, { name: "المستوى:", value: `${lvl}` }, { name: "النقاط:", value: `${totalXp - requiredlvlxp}/${lvl * 100}` }, { name: "الترتيب:", value: `${yield index_1.lvlsys.MemberRank(user.id)}` });
        yield interaction.followUp({ embeds: [embed] });
    }),
});

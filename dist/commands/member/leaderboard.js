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
    name: "leaderboard",
    description: "عرض أعلى 24 عضو في النقاط",
    onlyInCommandChannel: true,
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const leaderboard = yield index_1.lvlsys.XpLeaderBoard(24);
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(index_1.config.DEFAULT_COLOR);
        let i = 0;
        for (const member of leaderboard) {
            i += 1;
            embed.addFields({
                name: `A-${i}. ${(_b = (yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(member.memberId)))) === null || _b === void 0 ? void 0 : _b.displayName}`,
                value: `[XP: ${member.xp} --- lvl: ${yield index_1.lvlsys.MemberLvl(member.memberId)}]`,
                inline: true
            });
        }
        yield interaction.followUp({ embeds: [embed] });
    }),
});

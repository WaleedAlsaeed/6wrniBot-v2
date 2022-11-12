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
    description: "عرض المستوى الخاص بك",
    onlyInCommandChannel: true,
    options: [
        {
            name: "count",
            description: "عدد الذين تريد عرضهم بالقائمة",
            type: discord_js_1.ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const count = interaction.options.getNumber("count", true);
        if (count > 40 || count < 3) {
            return yield interaction.followUp({ content: "يجب أن تكون القيمة بين 3 و 40" });
        }
        const leaderboard = yield index_1.lvlsys.XpLeaderBoard(count);
        const embed = new discord_js_1.EmbedBuilder();
        let i = 0;
        for (const member of leaderboard) {
            i += 1;
            embed.addFields({
                name: `${i}. ${(0, discord_js_1.userMention)(member.memberId)}`,
                value: `totalXp: ${member.xp}`
            });
        }
        yield interaction.followUp({ embeds: [embed] });
    }),
});

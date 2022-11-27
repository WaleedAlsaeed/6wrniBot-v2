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
exports.default = new Command_1.Command({
    name: "top-contestants",
    description: "ترتيب المشاركين بالمسابقات",
    onlyInCommandChannel: false,
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const allContestants = yield members_1.Contest.find({}).sort({ wins: -1 });
        const embed = new discord_js_1.EmbedBuilder().setColor(index_1.config.DEFAULT_COLOR);
        for (let i = 0; i < allContestants.length; i++) {
            if (i > 24)
                break;
            const element = allContestants[i];
            embed.addFields({
                name: `C:${i}. ${(_b = (yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(element.memberId)))) === null || _b === void 0 ? void 0 : _b.displayName}`,
                value: `[WINS: ${element.wins}]`,
                inline: true
            });
        }
        yield interaction.followUp({ embeds: [embed] });
    }),
});

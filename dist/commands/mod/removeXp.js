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
    name: "remove-xp",
    description: "إزالة نقاط عضو في السيرفر. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "member",
            description: "طرد حسب إسم العضو",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "amount",
            description: "الكمية المراد إزالتها",
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
        const user = interaction.options.getUser("member", true);
        const amount = interaction.options.getNumber("amount", true);
        const member = yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(user.id));
        if (!member) {
            yield interaction.followUp({ content: "العضو المحدد غير موجود بالسيرفر", ephemeral: true });
            return;
        }
        yield index_1.lvlsys.RemoveXp(user.id, amount);
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(`[Remove-Xp] - ${user.username}`)
            .setColor(index_1.config.DEFAULT_COLOR);
        yield interaction.followUp({ embeds: [embed] });
        yield index_1.lvlsys.RemoveRole(member);
    }),
});

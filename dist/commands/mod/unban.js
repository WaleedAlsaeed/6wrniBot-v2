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
    name: "unban",
    description: "رفع الحظر عن عضو. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "user",
            description: "اسم العضو",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "السبب",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: false
        },
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        if (!index_1.config.isModOrOwner(interaction.member)) {
            yield interaction.reply({ content: "ليس لديك صلاحية استخدام الأمر!" });
            return;
        }
        const user = (_a = interaction.options.get("user")) === null || _a === void 0 ? void 0 : _a.user;
        const reason = ((_c = (_b = interaction.options.get("reason")) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.toString()) || "غير محدد";
        if (!user) {
            yield interaction.followUp({ content: "نسيت كتابة إسم العضو", ephemeral: true });
            return;
        }
        yield ((_d = interaction.guild) === null || _d === void 0 ? void 0 : _d.members.unban(user.id, reason).catch(console.error));
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(index_1.config.DEFAULT_COLOR)
            .setTitle("🛑[حظر عضو]🛑")
            .setDescription(`تم حظر ${(0, discord_js_1.userMention)(user.id)}`)
            .addFields({ name: "السبب", value: reason })
            .setFooter({ text: `${interaction.user.tag} | ${interaction.createdAt}`, iconURL: interaction.user.displayAvatarURL() });
        ;
        yield interaction.followUp({ embeds: [embed] });
        const modLog = index_1.client.channels.cache.get(index_1.config.MOD_LOG);
        if (modLog === null || modLog === void 0 ? void 0 : modLog.isTextBased())
            modLog.send({ embeds: [embed] });
    }),
});

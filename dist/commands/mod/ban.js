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
    name: "ban",
    description: "حظر عضو من السيرفر. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "member",
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
        var _a;
        const client = (0, index_1.getClient)();
        if (!index_1.config.isModOrOwner(interaction.member)) {
            yield interaction.followUp({ content: "ليس لديك صلاحية استخدام الأمر!" });
            return;
        }
        const user = interaction.options.getUser("member", true);
        const reason = interaction.options.getString("reason") || "غير محدد";
        if (!user) {
            yield interaction.followUp({ content: "لم يتم العثور على العضو", ephemeral: true });
            return;
        }
        const member = yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(user.id));
        if (!member) {
            yield interaction.followUp({ content: "العضو المحدد غير موجود بالسيرفر", ephemeral: true });
            return;
        }
        if (index_1.config.isModOrOwner(member)) {
            yield interaction.followUp({ content: "لا يمكنك حظر المشرفين!" });
            return;
        }
        yield member.ban({
            reason: reason,
            deleteMessageSeconds: 7200 // 2 hours
        }).catch(console.error);
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(index_1.config.DEFAULT_COLOR)
            .setTitle("🛑[حظر عضو]🛑")
            .setDescription(`تم حظر ${(0, discord_js_1.userMention)(user.id)}`)
            .addFields({ name: "السبب:", value: reason })
            .setFooter({ text: `${interaction.user.tag} | ${interaction.createdAt}`, iconURL: interaction.user.displayAvatarURL() });
        yield interaction.followUp({ embeds: [embed] });
        const modLog = client.channels.cache.get(index_1.config.MOD_LOG);
        if (modLog === null || modLog === void 0 ? void 0 : modLog.isTextBased())
            modLog.send({ embeds: [embed] });
    }),
});

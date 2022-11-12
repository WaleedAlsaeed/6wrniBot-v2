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
function isValidMsgUrl(str) {
    let url;
    try {
        url = new URL(str);
        if (url.protocol == "https:" && url.host == "discord.com")
            return str;
        return "";
    }
    catch (_) {
        return "";
    }
}
exports.default = new Command_1.Command({
    name: "edit-message",
    description: "تعديل رسالة من البوت سواء كانت عادية أو ايمبد. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "msg-link",
            description: "رابط الرسالة",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "new-content",
            description: "النص الجديد",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!index_1.config.isModOrOwner(interaction.member)) {
            yield interaction.reply({ content: "ليس لديك صلاحية استخدام الأمر!" });
            return;
        }
        let msgLink = interaction.options.getString("msg-link", true);
        const content = interaction.options.getString("new-content", true);
        let ids = isValidMsgUrl(msgLink).split("/").reverse();
        const msgId = ids[0];
        const channelId = ids[1];
        const channel = index_1.client.channels.cache.get(channelId);
        if (!(channel === null || channel === void 0 ? void 0 : channel.isTextBased()))
            return;
        yield channel.messages.fetch(msgId)
            .then((message) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (message.author.id == ((_a = index_1.client.user) === null || _a === void 0 ? void 0 : _a.id)) {
                if (message.embeds.length > 0) {
                    const embed = new discord_js_1.EmbedBuilder()
                        .setColor(index_1.config.DEFAULT_COLOR)
                        .setDescription(content);
                    return yield message.edit({ embeds: [embed] });
                }
                return yield message.edit({ content: content });
            }
            else {
                yield interaction.followUp("الرابط ليس لرسالة أرسلها البوت!");
            }
        }))
            .catch(console.error);
        yield interaction.followUp("تم التعديل!");
    }),
});

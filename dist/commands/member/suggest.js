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
    name: "suggest",
    description: "إرسال اقتراح متعلق بالسيرفر أو المنصة عمومًا",
    onlyInCommandChannel: true,
    options: [
        {
            name: "content",
            description: "محتوى الإقتراح",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "image",
            description: "صورة لللإقتراح",
            type: discord_js_1.ApplicationCommandOptionType.Attachment,
            required: false
        }
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const content = interaction.options.getString("content", true);
        const image = interaction.options.getAttachment("image", false);
        if (content.length < 10) {
            return yield interaction.followUp({ content: "يرجى كتابة إقتراح حقيقي مع تفاصيله!!" });
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(`[إقتراح] - ${interaction.user.tag}`)
            .setColor(index_1.config.DEFAULT_COLOR)
            .addFields({ name: "التفاصيل", value: content + "\n" });
        if (image && image.name) {
            if (image.name.endsWith("jpg")
                || ((_a = image.name) === null || _a === void 0 ? void 0 : _a.endsWith("jpeg"))
                || ((_b = image.name) === null || _b === void 0 ? void 0 : _b.endsWith("png"))
                || image.name.endsWith("webp")) {
                embed.setImage(image.url);
            }
            else {
                return yield interaction.followUp({ content: "الصيغ المدعومة هي png/jpg/jpeg/webp فقط!" });
            }
        }
        const suggestChannel = index_1.client.channels.cache.get(index_1.config.SUGGEST_CHANNEL);
        yield suggestChannel.send({ embeds: [embed] });
        yield interaction.followUp({ content: "تم إرسال الإقتراح!" });
    }),
});

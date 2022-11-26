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
    name: "send-message",
    description: "إرسال رسالة من البوت. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "channel",
            description: "القناة",
            type: discord_js_1.ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "content",
            description: "المحتوى",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "in-embed",
            description: "لا شرح",
            type: discord_js_1.ApplicationCommandOptionType.Boolean,
            required: false
        },
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const client = (0, index_1.getClient)();
        if (!index_1.config.isModOrOwner(interaction.member)) {
            yield interaction.reply({ content: "ليس لديك صلاحية استخدام الأمر!" });
            return;
        }
        let channel = interaction.options.getChannel("channel", true);
        const content = interaction.options.getString("content", true);
        const isEmbed = interaction.options.getBoolean("in-embed");
        const chnl = client.channels.cache.get(channel.id);
        if (chnl === null || chnl === void 0 ? void 0 : chnl.isTextBased()) {
            yield interaction.followUp("يتم العمل على ذلك");
            if (isEmbed == true) {
                const embed = new discord_js_1.EmbedBuilder()
                    .setColor(index_1.config.DEFAULT_COLOR)
                    .setDescription(content);
                return yield chnl.send({ embeds: [embed] });
            }
            return yield chnl.send({ content: content });
        }
        yield interaction.followUp("تعذر إ{سال رسالة في هذه القناة");
    }),
});

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
    name: "paid-work",
    description: "إرسال عرض أو خدمة في قناة المدفوع",
    onlyInCommandChannel: true,
    options: [
        {
            name: "name",
            description: "اسمك",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "email",
            description: "البريد الالكتروني",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "the-job",
            description: "الوظيفة المطلوبة / نوع الخدمة",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "amount",
            description: "السعر بالدولار",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "talk-ways",
            description: "طرق التواصل",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "info",
            description: "معلومات حول الوظيفة أو الخدمة",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        },
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const name = interaction.options.getString("name", true);
        const email = interaction.options.getString("email", true);
        const theJob = interaction.options.getString("the-job", true);
        const amount = interaction.options.getString("amount", true);
        const talkWays = interaction.options.getString("talk-ways", true);
        const info = interaction.options.getString("info", true);
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(index_1.config.DEFAULT_COLOR)
            .setTitle(`مقدم من ${interaction.user.tag}`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields({ name: "الإسم:", value: name }, { name: "البريد الإلكتروني:", value: email }, { name: "الوظيفة:", value: theJob }, { name: "معلومات:", value: info }, { name: "المبغ:", value: amount }, { name: "طرق التواصل", value: talkWays });
        const chnl = index_1.client.channels.cache.get(index_1.config.SHARE_WORK);
        if (chnl === null || chnl === void 0 ? void 0 : chnl.isTextBased()) {
            yield chnl.send({ embeds: [embed] });
            return yield interaction.followUp("تم الإرسال");
        }
        yield interaction.followUp("حدث خطأ ما");
    }),
});

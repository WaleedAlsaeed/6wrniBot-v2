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
const query_string_1 = require("query-string");
exports.default = new Command_1.Command({
    name: "youtube",
    description: "إرسال نتائج بحث حول موضوع معين في يوتيوب",
    onlyInCommandChannel: false,
    options: [
        {
            name: "qeury",
            description: "المحتوى",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const qeury = interaction.options.getString("qeury", true);
        yield interaction.followUp(`https://youtube.com/results?${(0, query_string_1.stringify)({ search_query: qeury })}`);
    }),
});

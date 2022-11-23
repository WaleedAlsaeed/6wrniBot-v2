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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structures/Command");
const unityDocs_json_1 = __importDefault(require("../../config/unityDocs.json"));
const choices = unityDocs_json_1.default["Manual"].concat(unityDocs_json_1.default["ScriptReference"]);
exports.default = new Command_1.Command({
    name: "unity-docs",
    description: "تعديل رسالة من البوت سواء كانت عادية أو ايمبد. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "qeury",
            description: "الشيء المراد بحث عنه",
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        },
        {
            name: "member",
            description: "العضو المراد إعطاءه الرابط",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: false
        }
    ],
    autocomplete: (interaction, client) => __awaiter(void 0, void 0, void 0, function* () {
        const focusedValue = interaction.options.getFocused();
        const filtered = choices.filter(choice => choice.includes(focusedValue));
        yield interaction.respond(filtered.map(choice => ({ name: choice, value: choice })).slice(0, 25));
    }),
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const qeury = interaction.options.getString("qeury", true);
        let msg = "";
        if (unityDocs_json_1.default["Manual"].filter(obj => obj == qeury).length == 1) {
            msg = `https://docs.unity3d.com/Manual/${qeury}.html`;
        }
        else if (unityDocs_json_1.default["ScriptReference"].filter(obj => obj == qeury).length == 1) {
            msg = `https://docs.unity3d.com/ScriptReference/${qeury}.html`;
        }
        else {
            msg = "لم أجد نتائج متعلقة بما بحثت عنه، اختر القيمة من الخيارات الظاهرة لك";
            return yield interaction.followUp(msg);
        }
        const member = interaction.options.getUser("member");
        if (member)
            msg = `هذا الرابط لك يا ${(0, discord_js_1.userMention)(member.id)}\n` + msg;
        yield interaction.followUp(msg);
    }),
});

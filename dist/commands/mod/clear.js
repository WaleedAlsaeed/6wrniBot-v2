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
    name: "clear",
    description: "حذف رسائل في القناة. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "amount",
            description: "عدد الرسائل",
            type: discord_js_1.ApplicationCommandOptionType.Number,
            required: true
        },
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!index_1.config.isModOrOwner(interaction.member)) {
            yield interaction.reply({ content: "ليس لديك صلاحية استخدام الأمر!" });
            return;
        }
        const amount = interaction.options.getNumber("amount", true);
        if (amount > 0 && amount <= 60) {
            const channel = interaction.channel;
            channel.bulkDelete(amount, true)
                .then(messages => {
                const warn = channel.send({ content: `تم حذف ${messages.size} رسالة!` });
                setTimeout(() => warn.then((msg) => msg.delete()), 3500);
            })
                .catch(console.error);
        }
        else {
            yield interaction.followUp({ content: "يجب أن تكون القيمة بين 0 و 60", ephemeral: true });
        }
    }),
});

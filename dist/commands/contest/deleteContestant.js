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
const members_1 = require("../../schema/members");
exports.default = new Command_1.Command({
    name: "top-contestants",
    description: "ترتيب المشاركين بالمسابقات",
    onlyInCommandChannel: false,
    options: [
        {
            name: "member",
            description: "العضو",
            type: discord_js_1.ApplicationCommandOptionType.User,
            required: true
        }
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!index_1.config.isModOrOwner(interaction.member)) {
            yield interaction.followUp({ content: "ليس لديك صلاحية استخدام الأمر!" });
            return;
        }
        const member = interaction.options.getUser("member", true);
        if (yield members_1.Contest.findOne({ memberId: member.id })) {
            yield members_1.Contest.deleteOne({ memberId: member.id });
            yield interaction.followUp("لقد تم حذف جميع مشاركات العضو!");
            return;
        }
        yield interaction.followUp("ليس لهذا العضو أي مشاركات مسجلة");
    }),
});

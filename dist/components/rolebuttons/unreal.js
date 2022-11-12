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
const Button_1 = require("../../structures/Button");
exports.default = new Button_1.RoleButton("unreal", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    const member = interaction.member;
    const role = member.guild.roles.cache.get("778149110620487680");
    if (!member || !role)
        return;
    if (member.roles.cache.get(role.id)) {
        yield member.roles.remove(role);
        return yield interaction.reply({ content: "تمت إزالة الرتبة", ephemeral: true });
    }
    yield member.roles.add(role);
    yield interaction.reply({ content: "تمت اضافة الرتبة", ephemeral: true });
}));

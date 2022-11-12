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
    name: "roles-button",
    description: "تعديل رسالة من البوت سواء كانت عادية أو ايمبد. للمشرفين فقط",
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
    ],
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!index_1.config.isModOrOwner(interaction.member)) {
            yield interaction.reply({ content: "ليس لديك صلاحية استخدام الأمر!" });
            return;
        }
        let channel = interaction.options.getChannel("channel", true);
        const content = interaction.options.getString("content", true);
        const chnl = index_1.client.channels.cache.get(channel.id);
        if (chnl === null || chnl === void 0 ? void 0 : chnl.isTextBased()) {
            yield interaction.followUp("يتم العمل على ذلك");
            const unity = new discord_js_1.ButtonBuilder()
                .setCustomId("unity")
                .setLabel("Unity Dev")
                .setStyle(2);
            const unreal = new discord_js_1.ButtonBuilder()
                .setCustomId("unreal")
                .setLabel("Unreal Dev")
                .setStyle(2);
            const godot = new discord_js_1.ButtonBuilder()
                .setCustomId("godot")
                .setLabel("Godot Dev")
                .setStyle(2);
            const gamemaker = new discord_js_1.ButtonBuilder()
                .setCustomId("gamemaker")
                .setLabel("Gamemaker Dev")
                .setStyle(2);
            const blender = new discord_js_1.ButtonBuilder()
                .setCustomId("blender")
                .setLabel("Blender")
                .setStyle(2);
            const threeD = new discord_js_1.ButtonBuilder()
                .setCustomId("threeD")
                .setLabel("3D Artist")
                .setStyle(2);
            const twoD = new discord_js_1.ButtonBuilder()
                .setCustomId("twoD")
                .setLabel("2D Artist")
                .setStyle(2);
            const sound = new discord_js_1.ButtonBuilder()
                .setCustomId("sound")
                .setLabel("Sound Compositor")
                .setStyle(2);
            const meetings = new discord_js_1.ButtonBuilder()
                .setCustomId("meetings")
                .setLabel("اشعار الاجتماعات")
                .setStyle(2);
            const gamejam = new discord_js_1.ButtonBuilder()
                .setCustomId("gamejam")
                .setLabel("اشعار المسابقات")
                .setStyle(2);
            yield chnl.send({
                content: content,
                components: [
                    new discord_js_1.ActionRowBuilder().addComponents([
                        unity,
                        unreal,
                        godot,
                        gamemaker,
                        blender
                    ]),
                    new discord_js_1.ActionRowBuilder().addComponents([
                        threeD,
                        twoD,
                        sound,
                        meetings,
                        gamejam
                    ]),
                ]
            });
        }
        yield interaction.followUp("تعذر إرسال رسالة في هذه القناة");
    }),
});

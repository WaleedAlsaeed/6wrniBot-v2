import { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { Command } from '../../structures/Command';
import { getClient, config } from '../../index';


export default new Command({
    name: "roles-button",
    description: "تعديل رسالة من البوت سواء كانت عادية أو ايمبد. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "channel",
            description: "القناة",
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: "content",
            description: "المحتوى",
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],
    run: async ({ interaction }) => {
        const client = getClient();
        if (!config.isModOrOwner(interaction.member)) {
            await interaction.reply({ content: "ليس لديك صلاحية استخدام الأمر!" });
            return;
        }

        let channel = interaction.options.getChannel("channel", true);
        const content = interaction.options.getString("content", true);

        const chnl = client.channels.cache.get(channel.id);
        if (chnl?.isTextBased()) {
            await interaction.followUp("يتم العمل على ذلك");

            const unity: ButtonBuilder = new ButtonBuilder()
                .setEmoji({ id: "1027944372353892452" })
                .setCustomId("unity")
                .setLabel("Unity Dev")
                .setStyle(2);

            const unreal: ButtonBuilder = new ButtonBuilder()
                .setEmoji({ id: "780024117637152769" })
                .setCustomId("unreal")
                .setLabel("Unreal Dev")
                .setStyle(2);

            const godot: ButtonBuilder = new ButtonBuilder()
                .setEmoji({ id: "780024321040449556" })
                .setCustomId("godot")
                .setLabel("Godot Dev")
                .setStyle(2);

            const gamemaker: ButtonBuilder = new ButtonBuilder()
                .setEmoji({ id: "780024651187355678" })
                .setCustomId("gamemaker")
                .setLabel("Gamemaker Dev")
                .setStyle(2);

            const blender: ButtonBuilder = new ButtonBuilder()
                .setEmoji({ id: "780024507867987988" })
                .setCustomId("blender")
                .setLabel("Blender")
                .setStyle(2);

            const threeD: ButtonBuilder = new ButtonBuilder()
                .setEmoji({ id: "780025103709765704" })
                .setCustomId("threeD")
                .setLabel("3D Artist")
                .setStyle(2);

            const twoD: ButtonBuilder = new ButtonBuilder()
                .setEmoji({ id: "780025147268530187" })
                .setCustomId("twoD")
                .setLabel("2D Artist")
                .setStyle(2);

            const sound: ButtonBuilder = new ButtonBuilder()
                .setEmoji({ id: "780025496859181106" })
                .setCustomId("sound")
                .setLabel("Sound Compositor")
                .setStyle(2);

            const meetings: ButtonBuilder = new ButtonBuilder()
                .setEmoji("📢")
                .setCustomId("meetings")
                .setLabel("اشعار الاجتماعات")
                .setStyle(2);
            const gamejam: ButtonBuilder = new ButtonBuilder()
                .setEmoji({ id: "747789192238596137" })
                .setCustomId("gamejam")
                .setLabel("اشعار المسابقات")
                .setStyle(2);
            

            return await chnl.send({
                content: content,
                components: [
                    new ActionRowBuilder<ButtonBuilder>().addComponents([
                        unity,
                        unreal,
                        godot,
                        gamemaker,
                        blender 
                    ]),
                    new ActionRowBuilder<ButtonBuilder>().addComponents([
                        threeD,
                        twoD,
                        sound,
                        meetings,
                        gamejam
                    ]),
                ]
            })
        }
        await interaction.followUp("تعذر إرسال رسالة في هذه القناة");

    },
})
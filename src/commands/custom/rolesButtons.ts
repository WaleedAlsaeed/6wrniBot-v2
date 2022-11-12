import { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { Command } from '../../structures/Command';
import { client, config } from '../../index';


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
                .setCustomId("unity")
                .setLabel("Unity Dev")
                .setStyle(2);

            const unreal: ButtonBuilder = new ButtonBuilder()
                .setCustomId("unreal")
                .setLabel("Unreal Dev")
                .setStyle(2);

            const godot: ButtonBuilder = new ButtonBuilder()
                .setCustomId("godot")
                .setLabel("Godot Dev")
                .setStyle(2);

            const gamemaker: ButtonBuilder = new ButtonBuilder()
                .setCustomId("gamemaker")
                .setLabel("Gamemaker Dev")
                .setStyle(2);

            const blender: ButtonBuilder = new ButtonBuilder()
                .setCustomId("blender")
                .setLabel("Blender")
                .setStyle(2);

            const threeD: ButtonBuilder = new ButtonBuilder()
                .setCustomId("threeD")
                .setLabel("3D Artist")
                .setStyle(2);

            const twoD: ButtonBuilder = new ButtonBuilder()
                .setCustomId("twoD")
                .setLabel("2D Artist")
                .setStyle(2);

            const sound: ButtonBuilder = new ButtonBuilder()
                .setCustomId("sound")
                .setLabel("Sound Compositor")
                .setStyle(2);

            const meetings: ButtonBuilder = new ButtonBuilder()
                .setCustomId("meetings")
                .setLabel("اشعار الاجتماعات")
                .setStyle(2);
            const gamejam: ButtonBuilder = new ButtonBuilder()
                .setCustomId("gamejam")
                .setLabel("اشعار المسابقات")
                .setStyle(2);
            

            await chnl.send({
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
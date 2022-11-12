import { Event } from "../structures/Event";
import { client } from "..";
import { channelMention, CommandInteractionOptionResolver, Events } from "discord.js";
import { ExtendedInteraction } from "../typings/Command";
import { config } from '../index';

export default new Event(Events.InteractionCreate, async (interaction) => {

    if (interaction.isChatInputCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);

        if (!command) return await interaction.followUp('تعذر ايجاد الأمر');

        if (command.onlyInCommandChannel) {
            if (interaction.channelId != config.COMMANDS_CHANNEL) {
                return await interaction.followUp(`يمكنك استخدام هذا الأمر فقط في قناة ${channelMention(config.COMMANDS_CHANNEL)}`);
            }
        }

        try {
            await command.run({
                args: interaction.options as CommandInteractionOptionResolver,
                client,
                interaction: interaction as ExtendedInteraction
            });
        } catch (error) {
            config.LogChannel(`[Command Error]
                               \n**CommandName**: ${command.name}
                               \n**Channel**: ${interaction.channel?.toString()}
                               \n**Error**:\n${error}`);

            await interaction.followUp(`حدث خطأ ما أثناء إستخدام الأمر`);
        }
    }
    else if (interaction.isAutocomplete()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        try {
            command.autocomplete?.(interaction, client);
        } catch (error) {
            console.error(error);
        }
    }
    else if (interaction.isButton()) {
        const { customId } = interaction;
        const { buttons } = client;

        const button = buttons.get(customId);

        if (!button) return;

        try {
            await button.run(interaction)
        } catch (error) {
            console.log(error);
        }
    }

});
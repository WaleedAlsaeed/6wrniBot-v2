import { ApplicationCommandOptionType, AutocompleteInteraction, Interaction, EmbedBuilder, ChannelType } from 'discord.js';
import { Command } from '../../structures/Command';
import xpChannels from "../../config/xp_channels_rate.json";



async function importFile(filePath: string) {
    return (await import(filePath))?.default;
}

export default new Command({
    name: "close-post",
    description: "إغلاق منشور في فورم يونتي",
    onlyInCommandChannel: false,
    run: async ({ interaction }) => {
        if (interaction.channel?.isThread()) {
            if (interaction.channel.parent?.type == ChannelType.GuildForum) {
                if (interaction.channel.parentId == xpChannels.UnityForum.id) {
                    await interaction.followUp("تم إغلاق المنشور!")
                    await interaction.channel.setArchived(true);
                }
            }
        }
    },
})
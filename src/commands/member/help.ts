import { ApplicationCommandOptionType, AutocompleteInteraction, Interaction, EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/Command';
import { CommandType } from '../../typings/Command';
import fs from 'fs';
import { config } from '../../index';



async function importFile(filePath: string) {
    return (await import(filePath))?.default;
}

export default new Command({
    name: "help",
    description: "جميع أوامر البوت",
    onlyInCommandChannel: true,
    run: async ({ interaction }) => {

        let embeds: EmbedBuilder[] = [];
        const commandFolders = fs.readdirSync("./src/commands");

        for (const folder of commandFolders) {

            let embed = new EmbedBuilder()
                .setColor(config.DEFAULT_COLOR)
                .setTitle(folder.toUpperCase());

            for (const file of fs.readdirSync(`./src/commands/${folder}`)) {
                const command: CommandType = await importFile(`../${folder}/${file.replace(".ts", "")}`);
                if (!command.name) return;

                embed.addFields(
                    {
                        name: `/${command.name}`, value: `${command.description}
                        \n------------------------------\n`}
                );
            }

            embeds.push(embed);
        }

        await interaction.followUp({ embeds: embeds, content: "جميع الأوامر التالية تستخدم عن طريق slashcommands" })
    },
})
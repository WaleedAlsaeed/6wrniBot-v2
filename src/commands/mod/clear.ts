import { ApplicationCommandOptionType, EmbedBuilder, User, userMention, TextBasedChannel, TextChannel, Message } from 'discord.js';
import { Command } from '../../structures/Command';
import { config } from '../../index';

export default new Command({
    name: "clear",
    description: "حذف رسائل في القناة. للمشرفين فقط",
    onlyInCommandChannel: false,
    options: [
        {
            name: "amount",
            description: "عدد الرسائل",
            type: ApplicationCommandOptionType.Number,
            required: true
        },
    ],
    run: async ({ interaction }) => {

        if (!config.isModOrOwner(interaction.member)) {
            await interaction.reply({ content: "ليس لديك صلاحية استخدام الأمر!" });
            return;
        }

        const amount = interaction.options.getNumber("amount", true);

        if (amount > 0 && amount <= 60) {
            const channel = interaction.channel as TextChannel;
            channel.bulkDelete(amount, true)
                .then(messages => {
                    const warn = channel.send({ content: `تم حذف ${messages.size} رسالة!` });
                    setTimeout(() => warn.then((msg: Message) => msg.delete()), 3500);
                })
                .catch(console.error);

        } else {
            await interaction.followUp({ content: "يجب أن تكون القيمة بين 0 و 60", ephemeral: true });
        }



    },
})
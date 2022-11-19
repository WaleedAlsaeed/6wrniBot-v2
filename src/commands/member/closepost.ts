import { Command } from '../../structures/Command';
import xpChannels from "../../config/xp_channels_rate.json";


export default new Command({
    name: "close-post",
    description: "إغلاق منشور في فورم يونتي",
    onlyInCommandChannel: false,
    run: async ({ interaction }) => {
        if (interaction.channel?.isThread()) {
            if (interaction.channel.parentId == xpChannels.UnityForum.id) {
                await interaction.followUp("تم إغلاق المنشور!")
                await interaction.channel.setArchived(true);
            }
            return await interaction.followUp("يمكنك استخدام هذا الأمر فقط في قناة فورم يونتي")
        }
        await interaction.followUp("يمكنك استخدام هذا الأمر فقط في قناة فورم يونتي")
    },
})
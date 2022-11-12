import { RoleButton } from '../../structures/Button';
import { GuildMember } from 'discord.js';

export default new RoleButton(
    "blender",
    async (interaction) => {
        const member = interaction.member as GuildMember;
        const role  = member.guild.roles.cache.get("778149416645165067");
        if (!member || !role) return;
        
        if (member.roles.cache.get(role.id)) {
            await member.roles.remove(role);
            return await interaction.reply({ content: "تمت إزالة الرتبة", ephemeral: true});
        }

        await member.roles.add(role);
        await interaction.reply({ content: "تمت اضافة الرتبة", ephemeral: true});
    }
)
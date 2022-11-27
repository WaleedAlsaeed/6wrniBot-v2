import { EmbedBuilder, GuildMember, PartialGuildMember, TextBasedChannel, userMention } from "discord.js";
import { Event } from "../structures/Event"
import { getClient, config, lvlsys } from '../index';
import { Contest } from "../schema/members";

export default new Event(
    "guildMemberRemove",
    async (member: GuildMember | PartialGuildMember) => {
        const client = getClient();
        const embed = new EmbedBuilder()
            .setTitle("[خروج عضو]")
            .setColor(config.DEFAULT_COLOR)
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`${userMention(member.id)} - ${member.user.tag}`)
            .setFooter({ text: `ID: ${member.id}` });

        const modLog = client.channels.cache.get(config.MOD_LOG) as TextBasedChannel;
        modLog.send({ embeds: [embed] })
        lvlsys.DeleteMember(member.id);

        if (await Contest.findOne({ memberId: member.id })) {
            await Contest.deleteOne({ memberId: member.id });
        }

        const membersCount = member.guild.memberCount;
        member.guild.channels.cache.get("878366062767398952")?.edit({ name: membersCount.toString() }).catch(console.error);
    }

);
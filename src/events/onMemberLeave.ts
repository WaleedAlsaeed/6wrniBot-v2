import { EmbedBuilder, GuildMember, PartialGuildMember, TextBasedChannel, userMention } from "discord.js";
import { Event } from "../structures/Event"
import { client, config, lvlsys } from '../index';

export default new Event(
    "guildMemberRemove",
    async (member: GuildMember | PartialGuildMember) => {
        const embed = new EmbedBuilder()
            .setTitle("[خروج عضو]")
            .setColor(config.DEFAULT_COLOR)
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`${userMention(member.id)} - ${member.user.tag}`)
            .setFooter({ text: `ID: ${member.id}` });

        const modLog = client.channels.cache.get(config.MOD_LOG) as TextBasedChannel;
        modLog.send({ embeds: [embed] })

        lvlsys.DeleteMember(member.id);
    }

);
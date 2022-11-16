import { channelMention, EmbedBuilder, GuildMember, TextBasedChannel, userMention, Events } from 'discord.js';
import { Event } from "../structures/Event"
import { client, config } from '../index';


const mSecToSec = (ms: number | null) => {
    if (!ms)
        return 0;
    return Math.trunc(ms / 1000);
}

export default new Event(
    Events.GuildMemberAdd,
    async (member: GuildMember) => {
        const embed = new EmbedBuilder()
            .setTitle("[انضمام عضو]")
            .setColor(config.DEFAULT_COLOR)
            .setDescription(`${userMention(member.id)} - ${member.user.tag}`)
            .setThumbnail(member.user.displayAvatarURL())
            .setFields(
                {
                    name: "تاريخ إنشاء الحساب",
                    value: `<t:${mSecToSec(member.user.createdTimestamp)}:f> (<t:${mSecToSec(member.user.createdTimestamp)}:R>)`
                },
                {
                    name: "تاريخ الإنضمام",
                    value: `<t:${mSecToSec(member.joinedTimestamp)}:f> (<t:${mSecToSec(member.joinedTimestamp)}:R>)`
                }
            )
            .setFooter({ text: `ID: ${member.id}` });

        const modLog = client.channels.cache.get(config.MOD_LOG) as TextBasedChannel;
        modLog.send({ embeds: [embed] })

        var welcomeMessage: string = `أهلا بك ${userMention(member.id)} في سيرفر طورني.`;
        welcomeMessage += `\nلا تنسى قراءة ${channelMention(config.RULES_CHANNEL)}، `;
        welcomeMessage += `والإطلاع على ${channelMention(config.ALL_CHANNELS)} للتعرف على أقسام السيرفر`;

        const welcome = client.channels.cache.get(config.WELCOME_CHANNEL) as TextBasedChannel;
        welcome.send({ content: welcomeMessage });

        const role = member.guild.roles.cache.get("731608244606337076");
        if (role && !member.roles.cache.get(role.id)) member.roles.add(role);
    }

);
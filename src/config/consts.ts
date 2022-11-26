import { GuildMember } from 'discord.js';
import { getClient } from "..";

export class Config {
    // <-------------- Emojis -------------->
    LIKE_EMOJI = "725771517043933304"

    // <-------------- Colors -------------->
    DEFAULT_COLOR = 0x8658FF
    EXCEPTION_COLOR = 0xFF3B6E

    // <-------------- ROLES -------------->
    MOD_ROLE = "674574733269925889"
    OWNER_ID = "165048335177220096"

    // <-------------- Channels -------------->
    WELCOME_CHANNEL = "674564988622340098"
    RULES_CHANNEL = "676047368185184286"
    ALL_CHANNELS = "675765066813014067"
    COMMANDS_CHANNEL = "674577898409295872"
    PAID_WORK = "675752440322195492"
    SHARE_WORK = "674568808052293648"
    ONLY_IMAGE_CHANNELS: string[] = ["674568808052293648", "675769873338728448"]
    NO_XP_CAHNNELS: string[] = ["674577898409295872", "675769873338728448", "675750619784413184"]
    DELETED_MESSAGES_CHANNEL = "805363311914516481"
    MOD_LOG = "739171444864319545"
    SUGGEST_CHANNEL = "798227617659486233"

    

    // <-------------- Functions -------------->
    isModOrOwner = (member: GuildMember) => {
        return member.roles.highest.id == this.MOD_ROLE || member.id == this.OWNER_ID || member.user.bot;
    }

    LogChannel = (message: string) => {
        const modLog = getClient().channels.cache.get(this.MOD_LOG);
        if (modLog?.isTextBased()) modLog.send({ content: message });
    }
}
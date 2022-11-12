"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const __1 = require("..");
class Config {
    constructor() {
        // <-------------- Emojis -------------->
        this.LIKE_EMOJI = "725771517043933304";
        // <-------------- Colors -------------->
        this.DEFAULT_COLOR = 0x8658FF;
        this.EXCEPTION_COLOR = 0xFF3B6E;
        // <-------------- ROLES -------------->
        this.MOD_ROLE = "674574733269925889";
        this.OWNER_ID = "165048335177220096";
        // <-------------- Channels -------------->
        this.WELCOME_CHANNEL = "674564988622340098";
        this.RULES_CHANNEL = "676047368185184286";
        this.ALL_CHANNELS = "675765066813014067";
        this.COMMANDS_CHANNEL = "674577898409295872";
        this.PAID_WORK = "675752440322195492";
        this.SPAM_CHANNEL = "675750619784413184";
        this.SHARE_WORK = "674568808052293648";
        this.ONLY_IMAGE_CHANNELS = ["674568808052293648", "675769873338728448"];
        this.DELETED_MESSAGES_CHANNEL = "805363311914516481";
        this.MOD_LOG = "739171444864319545";
        // <-------------- Functions -------------->
        this.isModOrOwner = (member) => {
            return member.roles.highest.id == this.MOD_ROLE || member.id == this.OWNER_ID || member.user.bot;
        };
        this.LogChannel = (message) => {
            const modLog = __1.client.channels.cache.get(this.MOD_LOG);
            if (modLog === null || modLog === void 0 ? void 0 : modLog.isTextBased())
                modLog.send({ content: message });
        };
    }
}
exports.Config = Config;

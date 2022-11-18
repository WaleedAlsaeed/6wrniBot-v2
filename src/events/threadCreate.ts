import { ChannelType, Events, Message, TextBasedChannel } from "discord.js";
import { Event } from "../structures/Event"
import { client, config, lvlsys } from '../index';
import xpChannels from "../config/xp_channels_rate.json";


function isValidUrl(str: string) {
    let url: URL;
    try {
        url = new URL(str);
        return url.protocol == "https:" && url.host != "tenor.com";
    } catch (_) {
        return false;
    }
}

export default new Event(
    Events.ThreadCreate,
    async (thread) => {
        
        if (!thread.parent) return;

        if (thread.parent.type == ChannelType.GuildForum) {
            if (thread.parentId == xpChannels.UnityForum.id) {
                let msg = `نشكرك على الوثوق بالمنصة للحصول على إجابة لسؤالك`
                msg += `\nنتمنى منك أن تطبق هذه الأمور:`
                msg += `\n1- حاول حل مشكلتك بمفردك بينما يأتي شخص ما ليساعدك`
                msg += `\n2- بعض الأسئلة والأخطاء يمكن العثور على أجوبة وحلول لها بالبحث في جوجل أو يوتيوب`
                msg += `\n3- لا تقم بعمل منشن للأعضاء ليساعدوك بحل المشكلة، انت حتى يأتي شخص ما ليساعدك`
                msg += `\n4- اذا تم حل مشكلتك استخدم الأمر /close-post لإغلاق هذه القناة`

                await thread.send(msg)
            }
        }

    }

);
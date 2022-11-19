"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = require("../structures/Event");
const xp_channels_rate_json_1 = __importDefault(require("../config/xp_channels_rate.json"));
function isValidUrl(str) {
    let url;
    try {
        url = new URL(str);
        return url.protocol == "https:" && url.host != "tenor.com";
    }
    catch (_) {
        return false;
    }
}
exports.default = new Event_1.Event(discord_js_1.Events.ThreadCreate, (thread) => __awaiter(void 0, void 0, void 0, function* () {
    if (!thread.parent)
        return;
    if (thread.parentId == xp_channels_rate_json_1.default.UnityForum.id) {
        let msg = `نشكرك على الوثوق بالمنصة للحصول على إجابة لسؤالك`;
        msg += `\nنتمنى منك أن تطبق هذه الأمور:`;
        msg += `\n1- حاول حل مشكلتك بمفردك بينما يأتي شخص ما ليساعدك`;
        msg += `\n2- بعض الأسئلة والأخطاء يمكن العثور على أجوبة وحلول لها بالبحث في جوجل أو يوتيوب`;
        msg += `\n3- لا تقم بعمل منشن للأعضاء ليساعدوك بحل المشكلة، انت حتى يأتي شخص ما ليساعدك`;
        msg += `\n4- اذا تم حل مشكلتك استخدم الأمر /close-post لإغلاق هذه القناة`;
        yield thread.send(msg);
    }
}));

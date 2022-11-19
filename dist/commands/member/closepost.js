"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Command_1 = require("../../structures/Command");
const xp_channels_rate_json_1 = __importDefault(require("../../config/xp_channels_rate.json"));
function importFile(filePath) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        return (_a = (yield Promise.resolve().then(() => __importStar(require(filePath))))) === null || _a === void 0 ? void 0 : _a.default;
    });
}
exports.default = new Command_1.Command({
    name: "close-post",
    description: "إغلاق منشور في فورم يونتي",
    onlyInCommandChannel: false,
    run: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if ((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.isThread()) {
            if (interaction.channel.parentId == xp_channels_rate_json_1.default.UnityForum.id) {
                yield interaction.followUp("تم إغلاق المنشور!");
                yield interaction.channel.setArchived(true);
            }
            yield interaction.followUp("يمكنك استخدام هذا الأمر فقط في قناة فورم يونتي");
        }
        yield interaction.followUp("يمكنك استخدام هذا الأمر فقط في قناة فورم يونتي");
    }),
});

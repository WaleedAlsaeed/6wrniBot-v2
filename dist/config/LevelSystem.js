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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelSystem = void 0;
const members_1 = require("../schema/members");
const mongoos = require('mongoose');
class LevelSystem {
    constructor() {
        //* <-------------- Functions -------------->
        this.Exists = (memberId) => __awaiter(this, void 0, void 0, function* () {
            let memberXp = yield members_1.Members.findOne({ memberId: memberId });
            if (!memberXp) {
                return false;
            }
            return true;
        });
        this.AddMember = (memberId) => __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.Exists(memberId))) {
                let newMember = new members_1.Members({
                    _id: mongoos.Types.ObjectId(),
                    memberId: memberId,
                    xp: 0
                });
                yield newMember.save().catch(console.error);
            }
        });
        this.AddXp = (memberId, amount) => __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.Exists(memberId)))
                yield this.AddMember(memberId);
            if (amount < 0)
                amount = -amount;
            const currentXp = (yield this.GetMemberXp(memberId)) + amount;
            yield members_1.Members.updateOne({ memberId: memberId }, { xp: currentXp });
        });
        this.GiveRole = (member) => __awaiter(this, void 0, void 0, function* () {
            const xp = yield this.GetMemberXp(member.id);
            if (xp >= 1500) { // عضو صاعد
                const role = member.guild.roles.cache.get("674578404841881640");
                if (role && !member.roles.cache.get(role.id))
                    member.roles.add(role);
            }
            if (xp >= 5500) { // عضو مشارك
                const role = member.guild.roles.cache.get("674578841913655306");
                if (role && !member.roles.cache.get(role.id))
                    member.roles.add(role);
            }
            if (xp >= 21000) { // عضو مميز
                const role = member.guild.roles.cache.get("674579110130876427");
                if (role && !member.roles.cache.get(role.id))
                    member.roles.add(role);
            }
            if (xp >= 505000) { // عضو أسطوري
                const role = member.guild.roles.cache.get("674579236899520512");
                if (role && !member.roles.cache.get(role.id))
                    member.roles.add(role);
            }
        });
        this.RemoveRole = (member) => __awaiter(this, void 0, void 0, function* () {
            const xp = yield this.GetMemberXp(member.id);
            if (xp <= 1500) { // عضو صاعد
                const role = member.guild.roles.cache.get("674578404841881640");
                if (role && member.roles.cache.get(role.id))
                    member.roles.remove(role);
            }
            if (xp <= 5500) { // عضو مشارك
                const role = member.guild.roles.cache.get("674578841913655306");
                if (role && member.roles.cache.get(role.id))
                    member.roles.remove(role);
            }
            if (xp <= 21000) { // عضو مميز
                const role = member.guild.roles.cache.get("674579110130876427");
                if (role && member.roles.cache.get(role.id))
                    member.roles.remove(role);
            }
            if (xp <= 505000) { // عضو أسطوري
                const role = member.guild.roles.cache.get("674579236899520512");
                if (role && member.roles.cache.get(role.id))
                    member.roles.remove(role);
            }
        });
        this.RemoveXp = (memberId, amount) => __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.Exists(memberId)))
                return;
            if (amount < 0)
                amount = -amount;
            let currentXp = yield this.GetMemberXp(memberId);
            if (amount > currentXp)
                currentXp = 0;
            else
                currentXp -= amount;
            yield members_1.Members.updateOne({ memberId: memberId }, { xp: currentXp });
        });
        this.GetLevel = (memberId) => __awaiter(this, void 0, void 0, function* () {
            const totalXp = yield this.GetMemberXp(memberId);
            let requiredlvlxp = 0;
            for (let i = 1; i < 1000; i++) {
                requiredlvlxp += i * 100;
                if (totalXp <= requiredlvlxp) {
                    return i;
                }
            }
        });
        this.GetMemberXp = (memberId) => __awaiter(this, void 0, void 0, function* () {
            let memberXp = yield members_1.Members.findOne({ memberId: memberId });
            if (memberXp) {
                return memberXp.xp;
            }
            return 0;
        });
        this.DeleteMember = (memberId) => __awaiter(this, void 0, void 0, function* () {
            yield members_1.Members.deleteOne({ memberId: memberId });
        });
        this.XpLeaderBoard = (membersNumber) => __awaiter(this, void 0, void 0, function* () {
            let leaderBoard = yield members_1.Members.find({}).sort({ xp: -1 });
            leaderBoard = leaderBoard.slice(0, membersNumber);
            return leaderBoard;
        });
        this.MemberRank = (memberId) => __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.Exists(memberId)))
                return "مجهول";
            let leaderBoard = yield members_1.Members.find({}).sort({ xp: 1 });
            const n = leaderBoard.length;
            const xp = yield this.GetMemberXp(memberId);
            let block = 100;
            let currentStep = 0;
            while (leaderBoard[Math.min(block, n) - 1].xp < xp) {
                currentStep = block;
                block += 100;
                if (currentStep >= n)
                    return "مجهول";
            }
            while (leaderBoard[currentStep].memberId.localeCompare(memberId)) {
                currentStep++;
                if (currentStep >= Math.min(block, n))
                    return "مجهول";
            }
            return `${n - currentStep}/${n}`;
        });
        this.MemberLvl = (memberId) => __awaiter(this, void 0, void 0, function* () {
            const totalXp = yield this.GetMemberXp(memberId);
            let requiredlvlxp = 0;
            for (let i = 1; i < 1000; i++) {
                requiredlvlxp += i * 100;
                if (totalXp <= requiredlvlxp) {
                    return i;
                }
            }
            return 1;
        });
    }
}
exports.LevelSystem = LevelSystem;

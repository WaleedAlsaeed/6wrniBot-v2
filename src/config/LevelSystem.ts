import { Members } from '../schema/members';
import { Collection, GuildMember } from 'discord.js';
const mongoos = require('mongoose')

export class LevelSystem {

    //* <-------------- Functions -------------->

    Exists = async (memberId: string) => {
        let memberXp = await Members.findOne({ memberId: memberId });
        if (!memberXp) {
            return false;
        }
        return true;
    }

    AddMember = async (memberId: string) => {
        if (!await this.Exists(memberId)) {
            let newMember = new Members({
                _id: mongoos.Types.ObjectId(),
                memberId: memberId,
                xp: 0
            });
            await newMember.save().catch(console.error)
        }
    }

    AddXp = async (memberId: string, amount: number) => {
        if (!await this.Exists(memberId)) await this.AddMember(memberId);
        if (amount < 0) amount = -amount;
        const currentXp = await this.GetMemberXp(memberId) + amount;
        await Members.updateOne({ memberId: memberId }, { xp: currentXp });
    }

    GiveRole = async (member: GuildMember) => {
        const xp = await this.GetMemberXp(member.id);
        if (xp >= 1500) { // عضو صاعد
            const role = member.guild.roles.cache.get("674578404841881640");
            if (role && !member.roles.cache.get(role.id)) member.roles.add(role);
        }
        if (xp >= 5500) { // عضو مشارك
            const role = member.guild.roles.cache.get("674578841913655306");
            if (role && !member.roles.cache.get(role.id)) member.roles.add(role);
        }
        if (xp >= 21000) { // عضو مميز
            const role = member.guild.roles.cache.get("674579110130876427");
            if (role && !member.roles.cache.get(role.id)) member.roles.add(role);
        }
        if (xp >= 505000) { // عضو أسطوري
            const role = member.guild.roles.cache.get("674579236899520512");
            if (role && !member.roles.cache.get(role.id)) member.roles.add(role);
        }
    }

    RemoveRole = async (member: GuildMember) => {
        const xp = await this.GetMemberXp(member.id);
        if (xp <= 1500) { // عضو صاعد
            const role = member.guild.roles.cache.get("674578404841881640");
            if (role && member.roles.cache.get(role.id)) member.roles.remove(role); return;
        }
        if (xp <= 5500) { // عضو مشارك
            const role = member.guild.roles.cache.get("674578841913655306");
            if (role && member.roles.cache.get(role.id)) member.roles.remove(role); return;
        }
        if (xp <= 21000) { // عضو مميز
            const role = member.guild.roles.cache.get("674579110130876427");
            if (role && member.roles.cache.get(role.id)) member.roles.remove(role); return;
        }
        if (xp <= 505000) { // عضو أسطوري
            const role = member.guild.roles.cache.get("674579236899520512");
            if (role && member.roles.cache.get(role.id)) member.roles.remove(role); return;
        }
    }

    RemoveXp = async (memberId: string, amount: number) => {
        if (!await this.Exists(memberId)) return;
        if (amount < 0) amount = -amount;
        let currentXp = await this.GetMemberXp(memberId);
        if (amount > currentXp) currentXp = 0;
        else currentXp -= amount;
        await Members.updateOne({ memberId: memberId }, { xp: currentXp })
    }

    GetLevel = async (memberId: string) => {
        const totalXp = await this.GetMemberXp(memberId);
        let requiredlvlxp = 0;
        for (let i = 1; i < 1000; i++) {
            requiredlvlxp += i * 100;
            if (totalXp <= requiredlvlxp) {
                const xpInLvl = requiredlvlxp - totalXp;
                return i;
            }
        }
    }

    GetMemberXp = async (memberId: string) => {
        let memberXp = await Members.findOne({ memberId: memberId });
        if (memberXp) {
            return memberXp.xp;
        }
        return 0;
    }

    DeleteMember = async (memberId: string) => {
        await Members.deleteOne({ memberId: memberId });
    }

    XpLeaderBoard = async (membersNumber: number) => {
        let leaderBoard = await Members.find({}).sort({ xp: -1 })
        leaderBoard = leaderBoard.slice(0, membersNumber)
        return leaderBoard;
    }

    MemberRank = async (memberId: string) => {
        if (!await this.Exists(memberId)) return "مجهول";

        let leaderBoard = await Members.find({}).sort({ xp: 1 });

        const n = leaderBoard.length;
        const xp = await this.GetMemberXp(memberId);

        let block = 100;
        let currentStep = 0;
        while (leaderBoard[Math.min(block, n) - 1].xp < xp) {
            currentStep = block;
            block += 100;
            if (currentStep >= n) return "Null";
        }

        while (leaderBoard[currentStep].memberId.localeCompare(memberId)) {
            currentStep++;
            if (currentStep >= Math.min(block, n)) return "Null";
        }
        
        return `${n - currentStep}/${n}`;
    }
}
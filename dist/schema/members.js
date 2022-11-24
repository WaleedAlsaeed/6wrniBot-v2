"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contest = exports.Members = void 0;
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    memberId: { required: true, type: String },
    xp: { required: true, type: Number }
});
exports.Members = (0, mongoose_1.model)("Guild", memberSchema, "members");
const contestSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    memberId: { required: true, type: String },
    wins: { required: true, type: Number }
});
exports.Contest = (0, mongoose_1.model)("Guild", contestSchema, "contest");

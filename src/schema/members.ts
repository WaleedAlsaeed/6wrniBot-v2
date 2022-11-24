import { Schema, model } from 'mongoose';
const memberSchema = new Schema({
    _id: Schema.Types.ObjectId,
    memberId: { required: true, type: String},
    xp: { required: true, type: Number}
})

export const Members = model("Guild", memberSchema, "members");


const contestSchema = new Schema({
    _id: Schema.Types.ObjectId,
    memberId: { required: true, type: String},
    wins: { required: true, type: Number}
})

export const Contest = model("Guild", contestSchema, "contest");
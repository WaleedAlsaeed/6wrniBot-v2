import { Schema, model } from 'mongoose';
const memberSchema = new Schema({
    _id: Schema.Types.ObjectId,
    memberId: { required: true, type: String},
    xp: { required: true, type: Number}
})

export const Members = model("Guild", memberSchema, "members");

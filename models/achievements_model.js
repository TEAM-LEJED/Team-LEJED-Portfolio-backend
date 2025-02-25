
import { Schema, model, Types } from "mongoose";

const userAchievementsSchema= new Schema({
    award: { type: String },
    description: { type: String },
    image: { type: String },
    date: { type: String },
    nameOfInstitution: { type: String },
    user: {type: Types.ObjectId, ref: 'User', select:false}


}, {
    timestamps: true
  });

export const Achievements = model("Achievements", userAchievementsSchema)

import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json'

const userAchievementsSchema= new Schema({
    awards: { type: String },
    description: { type: String },
    image: { type: String },
    date: { type: String },
    nameOfInstitution: { type: String },
    user:{type:Types.ObjectId, ref:'User'}

})

userAchievementsSchema.plugin(toJSON);

export const Achievements = model("Achievements", userAchievementsSchema)
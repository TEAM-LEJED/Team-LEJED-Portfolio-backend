
import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json'

const userSkillsSchema= new Schema({
    name: { type: String },
    levelOfProficiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] },
    user:{type:Types.ObjectId, ref:'User'}

})
userSkillsSchema.plugin(toJSON);
export const Skills = model("Skills", userSkillsSchema)
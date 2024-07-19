
import { Schema, model, Types } from "mongoose";
// import {toJSON} from '@reis/mongoose-to-json'

const skillsSchema= new Schema({
    skillName: { type: String },
    levelOfProficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
    user:{type:Types.ObjectId, ref:'User', select:false}

})


// skillsSchema.plugin(toJSON);


export const Skills = model("Skills", skillsSchema)
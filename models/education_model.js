
import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const userEducationSchema= new Schema({
    schoolName: { type: String },
    program: { type: String },
    qualification: { type: String },
    location: { type: String },
    grade: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    user:{type:Types.ObjectId, ref:'User'}

})

userEducationSchema.plugin(toJSON);

export const Education = model("Education", userEducationSchema)
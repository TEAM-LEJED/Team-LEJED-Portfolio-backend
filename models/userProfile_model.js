import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json'

const userProfileSchema = new Schema({
        profilePicture: { type: String },
        location: { type: String },
        sex: { type: String, enum: ['male', 'female'] },
        jobTitle: { type: String},
        bio: { type: String },
        contact: { type: String },
        resume: { type: String },
        languagesSpoken: { type: String },
        user:{type:Types.ObjectId, ref:'User'}
})


userProfileSchema.plugin(toJSON);
export const userProfile = model("Profile", userProfileSchema)
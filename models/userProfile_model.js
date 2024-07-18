import { Schema, model, Types } from "mongoose";

const userProfileSchema = new Schema({
        profilePicture: { type: String },
        location: { type: String },
        sex: { type: String, enum: ['Male', 'Female'] },
        jobTitle: { type: String},
        bio: { type: String },
        contact: { type: String },
        resume: { type: String },
        languagesSpoken: { type: String },
        user:{type:Types.ObjectId, ref:'User'}
}, {
        timestamps: true
    });


export const userProfile = model("UserProfile", userProfileSchema)
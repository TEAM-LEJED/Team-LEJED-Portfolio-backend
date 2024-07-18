import { Schema, model, Types } from "mongoose";

const userProfileSchema = new Schema({
        profilePicture: { type: String },
        location: { type: String },
        sex: { type: String, enum: ['Male', 'Female'] },
        dateOfBirth: {type: String},
        jobTitle: { type: String},
        bio: { type: String },
        contact: { type: String },
        resume: { type: String },
        languagesSpoken: { type: String },
        githubLink: { type: String },
        linkedinLink: { type: String },
        twitterLink: { type: String },
        user:{type:Types.ObjectId, ref:'User', unique: true}
}, {
        timestamps: true
    });


export const userProfile = model("UserProfile", userProfileSchema)
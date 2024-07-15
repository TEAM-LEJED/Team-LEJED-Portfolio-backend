import {toJSON} from '@reis/mongoose-to-json'
import { Schema, Types, model } from "mongoose";


const userSchema = new Schema({
        firstName: { type: String },
        lastName: { type: String },
        otherNames: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        userName: { type: String, unique: true },
        termsAndConditions: { type: Boolean },
        githubLink: { type: String },
        linkedinLink: { type: String },
        twitterLink: { type: String },
        userProfile: {type: Types.ObjectId, ref: 'UserProfile'},
        education: [{type: Types.ObjectId, ref: 'Education'}],
        skills: [{type: Types.ObjectId, ref: 'Skills'}],
        experience: [{type: Types.ObjectId, ref: 'Experience'}],
        achievements: [{type: Types.ObjectId, ref: 'Achievements'}],
        projects: [{type: Types.ObjectId, ref: 'Projects'}],
        volunteering: [{type: Types.ObjectId, ref: 'Volunteering'}],
    })
userSchema.plugin(toJSON);
export const UserModel = model('User', userSchema)
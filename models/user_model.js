import { Schema, Types, model } from "mongoose";


const userSchema = new Schema({
        firstName: { type: String },
        lastName: { type: String },
        otherNames: { type: String },
        email: { type: String, lowercase: true, unique: true },
        password: { type: String },
        confirmPassword: { type: String },
        userName: { type: String, lowercase: true, unique: true },
        termsAndConditions: { type: Boolean },
        userProfile: {type: Types.ObjectId, ref: 'UserProfile'},
        education: [{type: Types.ObjectId, ref: 'Education'}],
        skills: [{type: Types.ObjectId, ref: 'Skills'}],
        experience: [{type: Types.ObjectId, ref: 'Experience'}],
        achievements: [{type: Types.ObjectId, ref: 'Achievements'}],
        projects: [{type: Types.ObjectId, ref: 'Projects'}],
        volunteering: [{type: Types.ObjectId, ref: 'Volunteering'}],
    }, {
        timestamps: true
    });
export const UserModel = model('User', userSchema)
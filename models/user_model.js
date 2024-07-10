import {toJSON} from '@reis/mongoose-to-json'
import { String } from "joi";
import { Schema, Types, model } from "mongoose";


const userSchema = new Schema({
        firstName: { type: String },
        lastName: { type: String },
        otherNames: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        confirmPassword: { type: String },
        userName: { type: String, unique: true },
        termsAndConditions: { type: String },
        githubLink: { type: String },
        linkedinLink: { type: String },
        twitterLink: { type: String },
    })
userSchema.plugin(toJSON);
export const User = model('User', userSchema)
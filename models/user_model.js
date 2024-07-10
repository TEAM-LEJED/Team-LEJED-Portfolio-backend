import { String } from "joi";
import { Schema, Types, model } from "mongoose";


const userSchema = new Schema({
    user: {
        firstName: { type: String },
        lastName: { type: String },
        otherNames: { type: String },
        email: { type: String, unique: true },
        password: { type: String },
        confirmPassword: { type: String },
        userName: { type: String, unique: true },
        termsAndConditions: { type: String },
    },

    userProfile: {
        profilePicture: { type: String },
        location: { type: String },
        sex: { type: String, enum: ['Male', 'Female'] },
        jobTitle: { type: String },
        bio: { type: String },
        contact: { type: String },
        resume: { type: String },
        languagesSpoken: { type: String },
        user: { type: Types.ObjectId, ref: 'User' }
    },

    skills:
        [
            {
                name: { type: String },
                levelOfProficiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] },
                user: { type: Types.ObjectId, ref: 'User' }
            }
        ],

    experience:
        [
            {
                companyName: { type: String },
                role: { type: String },
                skills: { type: String },
                responsibility: { type: String },
                location: { type: String },
                startDate: { type: String },
                endDate: { type: String },
                user: { type: Types.ObjectId, ref: 'User' }
            }
        ],

    education:
        [
            {
                schoolName: { type: String },
                program: { type: String },
                qualification: { type: String },
                location: { type: String },
                grade: { type: String },
                startDate: { type: String },
                endDate: { type: String },
                user: { type: Types.ObjectId, ref: 'User' }
            }
        ],

    achievements:
        [
            {
                awards: { type: String },
                description: { type: String },
                image: { type: String },
                date: { type: String },
                nameOfInstitution: { type: String },
                user: { type: Types.ObjectId, ref: 'User' }
            }
        ],

    projects:
        [
            {
                image: { type: String },
                projectName: { type: String },
                description: { type: String },
                contributors: { type: String },
                skills: { type: String },
                link: { type: String },
                nameOfInstitution: { type: String },
                startDate: { type: String },
                endDate: { type: String },
                user: { type: Types.ObjectId, ref: 'User' }
            }
        ],

    socials:
        [
            {
                githubLink: { type: String },
                linkedinLink: { type: String },
                twitterLink: { type: String },
                user: { type: Types.ObjectId, ref: 'User' }
            }
        ],

    volunteering:
        [
            {
                organisation: { type: String },
                description: { type: String },
                skills: { type: String },
                startDate: { type: String },
                endDate: { type: String },
                role: { type: String },
                responsibility: { type: String },
                location: { type: String },
                projectName: { type: String },
                user: { type: Types.ObjectId, ref: 'User' }
            }
        ],

})


export const User = model('User', userSchema)
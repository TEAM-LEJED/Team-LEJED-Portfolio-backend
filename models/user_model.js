import { String } from "joi";
import { Schema, model } from "mongoose";


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
        sex: { type: String, enum: ['male', 'female'] },
        jobTitle: { type: String},
        bio: { type: String },
        contact: { type: String },
        resume: { type: String },
        languagesSpoken: { type: String }
    },

    skills:
        [
            {
                name: { type: String },
                levelOfProficiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] }
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
            }
        ],

    projects:
        [
            {
                image: {type: String},
                projectName: { type: String },
                description: { type: String },
                contributors: { type: String },
                skills: { type: String },
                link: { type: String },
                nameOfInstitution: { type: String },
                startDate: { type: String },
                endDate: { type: String },
            }
        ],

    socials:
        [
            {
                githubLink: { type: String },
                linkedinLink: { type: String },
                twitterLink: { type: String },
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
                projectName: { type: String }
            }
        ],

})


export const User = model('User', userSchema)
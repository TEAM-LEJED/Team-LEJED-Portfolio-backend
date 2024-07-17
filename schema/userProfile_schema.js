import Joi from "joi";


export const userProfileSchema = Joi.object({
    profilePicture: Joi.string(),
    location: Joi.string().required(),
    sex: Joi.string().valid('Male', 'Female'),
    jobTitle: Joi.string(),
    bio: Joi.string(),
    contact: Joi.string(),
    resume: Joi.string(),
    languagesSpoken: Joi.string(),
    githubLink: Joi.string(),
    linkedinLink: Joi.string(),
    twitterLink: Joi.string(),
    user: Joi.string()
})



import Joi from "joi";

export const userSchema = Joi.object({
    profilePicture: Joi.string(),
    location: Joi.string().required(),
    sex: Joi.string().valid('Male', 'Female'),
    bio: Joi.string().required(),
    contact: Joi.string().required(),
    resume: Joi.string().required(),
    languagesSpoken: Joi.string().required(),
})

    socials: [{
        githubLink: Joi.string().required(),
        linkedinLink: Joi.string().required(),
        twitterLink: Joi.string().required(),
        user: Joi.string().required()
    }]

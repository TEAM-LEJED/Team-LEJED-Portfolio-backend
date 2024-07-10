import Joi from "joi";

export const userProfileSchema = Joi.object({
    profilePicture: Joi.string().required(),
    location: Joi.string().required(),
    sex: Joi.string().required(),
    bio: Joi.string().required(),
    contact: Joi.string().required(),
    resume: Joi.string().required(),
    languagesSpoken: Joi.string().required(),
    user: Joi.string().required(),
})



import Joi from "joi";


export const experienceSchema = Joi.object({
    companyName: Joi.string().required(),
    role: Joi.string().required(),
    skills: Joi.string().required(),
    responsibility: Joi.string().required(),
    location: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string(),
    user: Joi.string()
})


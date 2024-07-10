import Joi from "joi";


export const userSchema = Joi.object({
    companyName: Joi.string().required(),
    role: Joi.string().required(),
    skills: Joi.string().required(),
    responsibility: Joi.string().required(),
    location: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    user: Joi.string().required()
})


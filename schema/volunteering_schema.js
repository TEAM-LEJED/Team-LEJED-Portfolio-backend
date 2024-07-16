import Joi from "joi";


export const volunteeringSchema = Joi.object({
    organisation: Joi.string().required(),
    description: Joi.string().required(),
    skills: Joi.string(),
    startDate: Joi.string().required(),
    endDate: Joi.string(),
    role: Joi.string().required(),
    responsibility: Joi.string().required(),
    location: Joi.string(),
    projectName: Joi.string(),
    user: Joi.string()
})



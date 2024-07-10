import Joi from "joi";


export const volunteeringSchema = Joi.object({
    organisation: Joi.string().required(),
    description: Joi.string().required(),
    skills: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    role: Joi.string().required(),
    responsibility: Joi.string().required(),
    location: Joi.string().required(),
    projectName: Joi.string().required(),
    user: Joi.string().required()
})



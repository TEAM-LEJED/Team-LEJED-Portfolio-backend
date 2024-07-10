import Joi from "joi";

export const projectSchema = Joi.object({
    image:Joi.string().required(),
    projectName: Joi.string().required(),
    description: Joi.string().required(),
    contributors: Joi.string().required(),
    skills: Joi.string().required(),
    link: Joi.string().required(),
    nameOfInstitution: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string(),
    user:Joi.string().required()
})
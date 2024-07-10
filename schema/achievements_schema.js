import Joi from "joi";

export const userSchema = Joi.object({
    awards: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    date: Joi.string(),
    nameOfInstitution: Joi.string().required(),
    user:Joi.string().required(),
})   



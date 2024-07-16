import Joi from "joi";

export const achievementsSchema = Joi.object({
    awards: Joi.string(),
    description: Joi.string().required(),
    image: Joi.string(),
    date: Joi.string().required(),
    nameOfInstitution: Joi.string().required(),
    user:Joi.string()
})   



import Joi from "joi";

export const achievementsSchema = Joi.object({
    award: Joi.string(),
    description: Joi.string().required(),
    image: Joi.string(),
    date: Joi.string().required(),
    nameOfInstitution: Joi.string().required(),
    user:Joi.string()
})   



import Joi from "joi";


export const skillsSchema = Joi.object({
    name: Joi.string().required(),
    levelOfProficiency: Joi.string().required(),
    user:Joi.string().required(),
})
import Joi from "joi";


export const userSchema = Joi.object({
    name: Joi.string().required(),
    levelOfProficiency: Joi.string().required(),
    user:Joi.string().required(),
})
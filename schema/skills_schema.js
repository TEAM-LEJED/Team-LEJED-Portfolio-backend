import Joi from "joi";


export const skillsSchema = Joi.object({
    skillName: Joi.string().required(),
    levelOfProficiency: Joi.string().valid('Beginner', 'Intermediate', 'Advanced', 'Expert'),
    user: Joi.string()
})
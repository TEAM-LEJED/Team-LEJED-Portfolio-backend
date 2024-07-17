import Joi from "joi";


export const educationSchema = Joi.object({
    schoolName: Joi.string().required(),
    program: Joi.string().required(),
    qualification: Joi.string().required(),
    location: Joi.string(),
    grade: Joi.string(),
    startDate: Joi.string().required(),
    endDate: Joi.string(),
    user: Joi.string(),
})


import Joi from "joi";


export const educationSchema = Joi.object({
    schoolName: Joi.string().required(),
    program: Joi.string().required(),
    qualification: Joi.string().required(),
    location: Joi.string().required(),
    grade: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    user: Joi.string().required(),
})


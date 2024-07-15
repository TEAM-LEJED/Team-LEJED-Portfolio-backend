import joi from "joi";


export const educationSchema = joi.object({
    schoolName: joi.string().required(),
    program: joi.string().required(),
    qualification: joi.string().required(),
    location: joi.string(),
    grade: joi.string(),
    startDate: joi.string().required(),
    endDate: joi.string(),
    user: joi.string(),
})


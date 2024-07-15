import joi from "joi";

export const achievementsSchema = joi.object({
    awards: joi.string(),
    description: joi.string().required(),
    image: joi.string().optional(),
    date: joi.string().required(),
    nameOfInstitution: joi.string().required(),
    user:joi.string(),
})   



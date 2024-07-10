import Joi from 'joi'

export const userSchema = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    otherNames:Joi.string(),
    email:Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirmedPassword: Joi.ref('password'),
    userName: Joi.string().required(),
    termsAndConditions: Joi.boolean()
  }
    
)

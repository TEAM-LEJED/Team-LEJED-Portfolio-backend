
import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json'

const userProjectsSchema= new Schema({
    image: {type: String},
    projectName: { type: String },
    description: { type: String },
    contributors: { type: String },
    skills: { type: String },
    link: { type: String },
    nameOfInstitution: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    user:{type:Types.ObjectId, ref:'User'}

})
userProjectsSchema.plugin(toJSON);

export const Projects = model("Projects", userProjectsSchema)
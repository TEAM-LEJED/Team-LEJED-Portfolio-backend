import { skillsSchema } from "../schema/skills_schema.js";
import { Skills } from "../models/skills_model.js";
import { UserModel } from "../models/user_model.js";


// Function to add a skill
export const addSkill = async (req, res, next) => {
    try {
        // Validate data provided by the user
        const {error, value} = skillsSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        // // Find the user with the id passed when creating skills
        // console.log('userId', req.sesion.user.id)

        // Retrieve user session
        const userSessionId = req.session.user.id
        const user = await UserModel.findById(userSessionId);
        if(!user){
            return res.status(404).send('User not found');
        }

        // Create skills with the value
        const skills = await Skills.create({...value, user: userSessionId});
        // If the user was found,push the id of the skills you just created inside the user
        user.skills.push(skills._id);
         // And save the user now with the skills id
        await user.save();

        // Return the skills
        res.status(201).json({ skills })
    } catch (error) {
        next(error)
    }
}



// Function to get all skills
export const getAllSkills = async (req, res) => {
    try {
        // Find skills for a particular user
        const userSessionId = req.session.user.id
        const allSkills = await Skills.find({ user: userSessionId });
        if (allSkills.length == 0) {
            return res.status(404).send('No skill added')
        } else {
            res.status(200).json({ skill: allSkills })
        }

    } catch (error) {
        res.status(500).json({error})
    }
};



// Function to get one skill
export const getOneSkill = async (req, res) => {
    try {
        // Get skill by id
        const getSkillById = await Skills.findById(req.params.id);
        // Return response
        res.status(200).json(getSkillById)
    } catch (error) {
        return res.status(200).json(error.message)
    }
}



// Function to update a skill
export const updateSkill = async (req, res) => {
    try {
        // Validate data provided by user
        const {error, value} = skillsSchema.validate(req.body);
        if (error){
            return res.status(400).send(error.details[0].message);
        }
        // Retrieve user session
        const userSessionId = req.session.user.id
        const user = await UserModel.findById(userSessionId);
        if(!user){
            return res.status(404).send('User not found');
        }
        // Update skill by id
        const updatedSkill = await Skills.findByIdAndUpdate(req.params.id, req.body, { new: true })
        // Return response
        res.status(200).json(updatedSkill)
    } catch (error) {
        return res.status(200).json(error.message)
    }
}



// Function to delete a skill
export const deleteSkill = async (req, res) => {
    try {
        // Delete skill by id
        const deletedSkill = await Skills.findByIdAndDelete(req.params.id, req.body)
        // Return response
        res.status(200).json('Skill successfully deleted')
    } catch (error) {
        return res.status(200).json(error.message)
    }
}
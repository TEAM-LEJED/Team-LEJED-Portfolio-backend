import { projectSchema } from "../schema/project_schema.js";
import { UserModel } from "../models/user_model.js";

import { Project } from "../models/project_models.js";

export const createProjects = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate({...req.body, image:req.file.filename});

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
   
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const project = await Project.create({ ...value, user: userId });

    user.projects.push(project._id)

    await user.save();

    return res.status(201).json({message: 'Project created successfully', project });
  } catch (error) {
    console.log(error);
  }
};



export const getProjects = async (req, res) => {
  try {
    // Fetching Project that belongs to a particular user
    const userId = req.session?.user?.id || req?.user?.id;
    
    // Check if userId is available
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found in session or request' });
    }

    const allProject = await Project.find({ user: userId });

    return res.status(200).json({ Projects: allProject });
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching projects:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Function to get one project for a particular user
export const getOneProject = async (req, res) => {
  try {
      // Get project by id
      const getProjectById = await Project.findById(req.params.id);
      // Return response
      res.status(200).json(getProjectById)
  } catch (error) {
      return res.status(200).json(error.message)
  }
}



export const patchProjects = async (req, res) => {
    try {
      const { error, value } = projectSchema.validate({...req.body, image:req.file.filename});

  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session.user.id; 
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const project = await Project.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!project) {
            return res.status(404).send("Project not found");
        }
  
        return res.status(200).json({message: 'Project updated successfully', project });
    } catch (error) {
      return res.status(500).json({error})
    }
  };


  export const deleteProjects = async (req, res) => {
    try {
     
  
      const userId = req.session.user.id; 
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).send("Project not found");
        }
  
        user.projects.pull(req.params.id);
        await user.save();
        return res.status(200).json({message: "Project deleted"});
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  
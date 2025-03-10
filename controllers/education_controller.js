import { Education } from "../models/education_model.js";

import { UserModel } from "../models/user_model.js";
import { educationSchema } from "../schema/education_schema.js";




export const createEducation = async (req, res) => {
  try {
    const { error, value } = educationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //after, find the user with the id that you passed when creating the education
    console.log('userId',req.session.user.id)


    const userId = req.session?.user?.id || req?.user?.id;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }


    //create education with the value
    const education = await Education.create({...value, user:userId});
    //if you find the user, push the education id you just created inside
    user.education.push(education._id);

    //and save the user now with the educationId
    await user.save();

    //return the education
    return res.status(201).json({message: 'Education created successfully', education });
  } catch (error) {
    return res.status(500).send(error);
  }
};



export const getEducation = async (req, res) => {
  try {
    //we are fetching education that belongs to a particular user
    const userId = req.session?.user?.id || req?.user?.id
    const alleducation = await Education.find({ user: userId });
    // if (alleducation.length == 0) {
    //   return res.status(200).send({ education: alleducation });
    // }
    return res.status(200).json({ education: alleducation });
  } catch (error) {}
};



// Function to get one education for a particular user
export const getOneEducation = async (req, res) => {
  try {
      // Get skill by id
      const getEducationById = await Education.findById(req.params.id);
      // Return response
      return  res.status(200).json(getEducationById)
  } catch (error) {
      return res.status(200).json(error.message)
  }
}



export const patchEducation = async (req, res) => {
    try {
      const { error, value } = educationSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const Education = await Education.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!Education) {
            return res.status(404).send("Education not found");
        }
  
        return res.status(201).json({message: 'Education updated successfully', Education });
    } catch (error) {
      return res.status(500).json({error})
    }
  };

  

  export const deleteEducation = async (req, res) => {
    try {
     
  
      const userId = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const education = await Education.findByIdAndDelete(req.params.id);
        if (!education) {
            return res.status(404).send("Education not found");
        }
  
        user.education.pull(req.params.id);
        await user.save();
        return res.status(200).json({message: "Education deleted"});
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  
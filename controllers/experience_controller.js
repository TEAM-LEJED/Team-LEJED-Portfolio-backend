import { experienceSchema } from "../schema/experience_schema.js";
import { UserModel } from "../models/user_model.js";
import { Experience } from "../models/experience_model.js";


export const createExperience = async (req, res) => {
  try {
    const { error, value } = experienceSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
   

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Extract the company name from the request body
    const {companyName} = req.body
    //  Check if that experience already exists
    const existingExperience = await Experience.findOne({companyName: companyName}, {userId: userId});
    if(existingExperience) {
        return res.status(409).json('The experience already exists for this user')
    }

    const experience = await Experience.create({ ...value, user: userId });

    user.experience.push(experience._id)

    await user.save();

    return res.status(201).json({message: 'Experience created successfully', experience });
  } catch (error) {
    console.log(error);
  }
};



export const getExperience = async (req, res) => {
  try {
    //we are fetching Experience that belongs to a particular user
    const userId = req.session?.user?.id || req?.user?.id;
    const allExperience = await Experience.find({ user: userId });
    // if (allExperience.length == 0) {
    //   return res.status(200).send({ Experience: allExperience });
    // }
    return res.status(200).json({ Experience: allExperience });
  } catch (error) {
    return res.status(500).json({error})
  }
};



// Function to get one experience for a particular user
export const getOneExperience = async (req, res) => {
  try {
      // Get experience by id
      const getExperienceById = await Experience.findById(req.params.id);
      // Return response
      return  res.status(200).json(getExperienceById)
  } catch (error) {
      return res.status(200).json(error.message)
  }
}



export const patchExperience = async (req, res) => {
    try {
      const { error, value } = experienceSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await Experience.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!experience) {
            return res.status(404).send("experience not found");
        }
  
        return  res.status(200).json({message: 'Experience updated successfully', experience });
    } catch (error) {
      return res.status(500).json({error})
    }
  };


  export const deleteExperience = async (req, res) => {
    try {
     
  
      const userId = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const experience = await Experience.findByIdAndDelete(req.params.id);
        if (!experience) {
            return res.status(404).send("experience not found");
        }
  
        user.experience.pull(req.params.id);
        await user.save();
        return res.status(200).json({message: "Experience deleted"});
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  
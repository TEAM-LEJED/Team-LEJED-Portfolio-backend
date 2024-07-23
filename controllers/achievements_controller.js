
import { achievementsSchema } from "../schema/achievements_schema.js";
import { UserModel } from "../models/user_model.js";
import { Achievements } from "../models/achievements_model.js";

export const createAchievements = async (req, res) => {
  try {
    const { error, value } = achievementsSchema.validate({  
      ...req.body,
      image: req.file.filename
    });

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userId = req.session?.user?.id || req?.user?.id;
   
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const achievement = await Achievements.create({ ...value, user: userId });

    user.achievements.push(achievement._id)

    await user.save();

    return res.status(201).json({message: 'Achievement created successfully', achievement });
  } catch (error) {
    console.log(error)

  }
};


// Function to get all achievements
export const findAllAchievements = async (req, res) => {
  try {
    // //we are fetching Achievement that belongs to a particular user
    const userId = req.session?.user?.id || req?.user?.id
    const allAchievements = await Achievements.find({ user: userId });
    // if (allAchievements.length == 0) {
    //   return res.status(200).send({Achievements: allAchievements});
    // }
    return res.status(200).json({ Achievements: allAchievements });
  } catch (error) {
    return res.status(500).json({error})
  }
};



// Function to get one achievement for a particular user
export const getOneAchievement = async (req, res) => {
  try {
      // Get skill by id
      const getAchievementById = await Achievements.findById(req.params.id);
      // Return response
      return res.status(200).json(getAchievementById)
  } catch (error) {
      return res.status(200).json(error.message)
  }
}


// Function to update an achievement
export const patchAchievements = async (req, res) => {
    try {
      const { error, value } = achievementsSchema.validate({  
        ...req.body,
        image: req.file.filename,});

  
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const userId = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const achievement = await Achievements.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!achievement) {
            return res.status(404).send("Achievement not found");
        }
  
        return res.status(200).json({ message: 'Achievement updated successfully', achievement });
    } catch (error) {
      return res.status(500).json({error})
    }
  };


  export const deleteAchievements = async (req, res) => {
    try {
     
  
      const userId = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const achievement = await Achievements.findByIdAndDelete(req.params.id);
        if (!achievement) {
            return res.status(404).send("Achievement not found");
        }
  
        user.achievements.pull(req.params.id);
        await user.save();

        return res.status(200).json({message: "Achievement deleted"});
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  

//   // To get/find a specific Achievement through an ID
// export const findAchievementsById = async (req, res) => {

//     try {
//         console.log('Geting specific data', req.body);
//         const achievements = await Achievements.findById(req.params.id)
//         res.status(200).send(achievements)
//     } catch (error) {
//         console.log(error);
//     }
// }
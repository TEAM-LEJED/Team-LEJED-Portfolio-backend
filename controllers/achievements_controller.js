
import { achievementsSchema } from "../schema/achievements_schema.js";
import { UserModel } from "../models/user_model.js";
import { Achievements } from "../models/achievements_model.js";

export const createAchievements = async (req, res) => {
  try {
    const { error, value } = achievementsSchema.validate({  
      ...req.body,
      award: req.files.award[0].filename,
      image: req.files.image[0].filename,});

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

    res.status(201).json({ achievement });
  } catch (error) {
    console.log(error);
  }
};



export const findAllAchievements = async (req, res) => {
  try {
    //we are fetching Achievement that belongs to a particular user
    const userId = req.session?.user?.id || req?.user?.id
    const allAchievement = await Achievements.find({ user: userId });
    if (allAchievement.length == 0) {
      return res.status(404).send("No Achievement added");
    }
    res.status(200).json({ Achievements: allAchievement });
  } catch (error) {
    return res.status(500).json({error})
  }
};



export const patchAchievements = async (req, res) => {
    try {
      const { error, value } = achievementsSchema.validate({  
        ...req.body,
        award: req.files.award[0].filename,
        image: req.files.image[0].filename,});

  
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
  
      res.status(200).json({ achievement });
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

      res.status(200).json("Achievement deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };
  

  // To get/find a specific Achievement through an ID
export const findAchievementsById = async (req, res) => {

    try {
        console.log('Geting specific data', req.body);
        const achievements = await Achievements.findById(req.params.id)
        res.status(200).send(achievements)
    } catch (error) {
        console.log(error);
    }
}
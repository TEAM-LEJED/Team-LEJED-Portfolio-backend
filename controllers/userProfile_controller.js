import { userProfile } from "../models/userProfile_model.js";
import { userProfileSchema } from "../schema/userProfile_schema.js";
import { UserModel } from "../models/user_model.js";


// Function to add a user profile
export const newUserProfile = async (req, res, next) => {
    try {
        // Validate data provided by user
        const { error, value } = userProfileSchema.validate({
            ...req.body,
            profilePicture: req.files.profilePicture[0].fileName,
            resume: req.files.resume[0].fileName,
        });
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        // Retrieve user session
        const userId = req.session?.user?.id || req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found')
        }

        // Create user profile
        const profile = await userProfile.create({ ...value, user: userId });
        user.userProfile = profile._id

        await user.save()
        // Return response
        res.status(201).json({ profile })
    } catch (error) {
        next(error)
    }
}



// Function to update a user profile
export const updateUserProfile = async (req, res, next) => {
    try {
        // Validate data provided by user
        const { error, value } = userProfileSchema.validate({
            ...req.body,
            profilePicture: req.files.profilePicture[0].fileName,
            resume: req.files.resume[0].fileName,
        });
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        // Retrieve user session
        const userId = req.session?.user?.id || req?.user?.id;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Update user profile by id
        const profile = await userProfile.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!profile) {
            return res.status(404).send('Profile not found');
        }
        // Return response
        res.status(200).json({ profile })
    } catch (error) {
        next(error)
    }
}


// Function to get the user profile
export const getUserProfile = async (req, res) => {
    try {
        // // Retrieve user session or request
        // const userId = req.session?.user?.id || req?.user?.id;
        // Get user profile 
        const profile = await userProfile.find({ user: userId });
        if (!profile) {
            return res.status(404).send({ profile });
        }
        // Return response
        res.status(200).json({ profile });
    } catch (error) {
        return res.status(500).json({ error })
    }
}




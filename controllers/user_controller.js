import { UserModel } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";
import bcrypt from "bcrypt";



// Function for sign up
export const signup = async (req, res, next) => {

    try {
        // Validate the data provided by the user
        const { error, value } = userSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const email = value.email

        const findIfUserExists = await UserModel.findOne({ email })
        if (findIfUserExists) {
            return res.status(401).send('User has already signed up')
        } else {
            const hashedPassword = await bcrypt.hash(value.password, 12)
            value.password = hashedPassword
            const addUser = await UserModel.create(value)
            // Generate a session for the user
            req.session.user = { id: addUser.id }
            return res.status(201).send(addUser)
        }
    } catch (error) {
        next(error)
    }

}



// Function to get everything about a user
export const getUser = async (req, res, next) => {
    try {
        const userName = req.params.userName.toLowerCase();
        const options = { sort: {startDate: -1 }}
        // Get user details
        const getUserDetails = await UserModel
            .find({userName})
            .select({ password: false })
            .populate({path: 'userProfile', options})
            .populate({path: 'education', options})
            .populate({path: 'experience', options})
            .populate({path: 'skills', options})
            .populate({path: 'achievements', options})
            .populate({path: 'projects', options})
            .populate({path: 'volunteering', options});
        // Return response
        res.status(200).json(getUserDetails)
    } catch (error) {
        next(error)
    }
}


// Function to update a user account
export const patchUser = async (req, res) => {
    try {
        // Update user by id
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error)
    }
}


// Function to delete a user account
export const deleteUser = async (req, res) => {
    try {
        // Delete user by id
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        // Return response
        res.status(200).json('User account has been successfully deleted')
    } catch (error) {
        console.log(error)
    }
}


// Function for log in
export const login = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body
        // // Validate the data provided by the user
        // const { error, value } = loginSchema.validate(req.body)
        // // const hashedPassword = await bcrypt.hash(value.password, 12)
        // // value.password = hashedPassword
        // if (error) {
        //     return res.status(400).send(error.details[0].message)

            
        // }
        // Find a user using their userName or email
        const user = await UserModel.findOne({
            $or: [
                { email: email },
                { userName: userName }
            ]
        });
        if (!user) {
            res.status(401).json('User not found');
        } else {
            // Verify their password
            const correctPassword = bcrypt.compareSync(password, user.password);
            if (!correctPassword) {
                res.status(401).json('Invalid login credentials');
            } else {
                // Generate a session for the user
                req.session.user = { id: user.id }
                // console.log('user', req.session.user)
                // Return response
                res.status(200).json('Login successful');
            }
        }
    } catch (error) {
        next(error)
    }
}




// Function to log out
export const logout = async (req, res) => {
    try {
        // Destroy user session
        await req.session.destroy();
        // Return response
        res.status(200).json('Logout successful');
    } catch (error) {
        console.log(error)
    }
};

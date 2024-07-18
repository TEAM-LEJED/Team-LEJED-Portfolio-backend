import { UserModel } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



// Function for sign up
export const signup = async (req, res, next) => {

    try {
        // Validate the data provided by the user
        const { error, value } = userSchema.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        const email = value.email

        const findIfUserExists = await UserModel.findOne({ email });
        if (findIfUserExists) {
            return res.status(401).send('User has already signed up')
        } else {
            // Encrypt user password
            const hashedPassword = await bcrypt.hash(value.password, 12);
            value.password = hashedPassword;
            // Create user
            const addUser = await UserModel.create(value)
            // Generate a session for the user
            req.session.user = { id: addUser.id }
            return res.status(201).send('Account created successfully')
        }
    } catch (error) {
        next(error)
    }

}




// Function for log in
export const login = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
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


// Function for token log in
export const tokenLogin = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        
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
                // Create a token for the user
                const token = jwt.sign({ id: user.id},
                     process.env.JWT_PRIVATE_KEY,
                    { expiresIn: '72h' }
                    );
                // Return response
                res.status(200).json({
                    message: 'User logged in',
                    accessToken: token
                });
            }
        }
    } catch (error) {
        next(error)
    }
}



// Function to get everything about one user
export const getUser = async (req, res, next) => {
    try {
        const userName = req.params.userName.toLowerCase();
        const options = { sort: {startDate: -1 }}
        // Get user details
        const getUserDetails = await UserModel
            .findOne({userName})
            .select({ password: false })
            .populate({path: 'userProfile', options})
            .populate({path: 'education', options})
            .populate({path: 'experience', options})
            .populate({path: 'skills', options})
            .populate({path: 'achievements', options: { sort: { date: -1 }}})
            .populate({path: 'projects', options})
            .populate({path: 'volunteering', options});
        // Return response
        res.status(200).json({user: getUserDetails})
    } catch (error) {
        // next(error)
        console.log(error)
    }
}


// Function to get all users to cross-check if a username already exists
export const getUsers = async (req, res, next) => {
    try {
        // Extract email and userName from query parameters to convert to lower case
        const email = req.query.email?.toLowerCase()
        const userName = req.query.userName?.toLowerCase();

        // Initialise the filter object
        const filter = {};
        if (email) {
            filter.email = email;
        }
        if (userName) {
            filter.userName = userName;
        }
        // Find users based on the filter
        const users = await UserModel.find(filter);
        // Return response
        return res.status(200).json({ users });
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

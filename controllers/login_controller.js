import { LoginModel } from "../models/login_model.js";
import { loginSchema } from "../schema/login_schema.js";
import { UserModel } from "../models/user_model.js";
import bcrypt from "bcrypt";



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
        const user = await LoginModel.findOne({
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

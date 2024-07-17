import jwt from "jsonwebtoken";


export const checkAuth = (req, res, next) => {
    // Check if session has a user
    if (req.session.user) {
        next();
    } else if (req.headers.authorization) {
        try {
            // Extract token from headers 
            const token = req.headers.authorization.split(' ')[1];
            // Verify the token to get the user and append the user to the request
            req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            // Call next function
            next();
            res.json(user);
        } catch (error) {
            res.status(401).json(error);
        }
    } else {
        res.status(401).json('User not authenticated')
    }
}
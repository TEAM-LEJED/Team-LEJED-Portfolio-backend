import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expressOasGenerator from "@mickeymond/express-oas-generator"
import { experienceRouter } from "./routes/experience_route.js"
import { achievementRouter } from "./routes/achievement_route.js";
import { volunteeringRouter } from "./routes/volunteering_route.js";
import { projectRouter } from "./routes/project_route.js";
import { educationRouter } from "./routes/education_route.js";
import { userRouter } from "./routes/user_route.js";
import { skillRouter } from "./routes/skills_route.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { userProfileRouter } from "./routes/userProfile_route.js";
import {restartServer} from "./restart_server.js"



const app = express();

expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['auth', 'userProfile', 'skills', 'projects', 'volunteering', 'experience', 'education', 'achievements'],
    mongooseModels: mongoose.modelNames(),
});



// Apply middlewares
app.use(express.json());
app.use(cors({credentials: true, origin: '*'}));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true}
    // Store session
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}));


// Health Check
app.get('/api/v1/health', (req, res) => {
    res.json({status: 'UP'});
});


// Use routes
app.use('/api/v1', userRouter);
app.use('/api/v1', skillRouter);
app.use('/api/v1', userProfileRouter);
app.use('/api/v1', educationRouter);
app.use('/api/v1', projectRouter);
app.use('/api/v1', experienceRouter);
app.use('/api/v1', achievementRouter);
app.use('/api/v1', volunteeringRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));


const reboot = async () => {
    setInterval(restartServer, process.env.INTERVAL) 
}




// Connect to database
await mongoose.connect(process.env.MONGO_URL);
console.log('Database is connected');



// Listen for incoming requests
const port = process.env.PORT || 4800;
app.listen(port, () => {
    // reboot().then(() => {
    //     console.log('Server restarted');
    // })
    console.log(`App listening on port ${port}`);
});
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/user_route.js";


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());


app.use('/api/v1', userRouter)


const port = process.env.PORT || 4800;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


// Connect to database
await mongoose.connect(process.env.MONGO_URL);
console.log('Database is connected');
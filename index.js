import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import educationRouter from "./routes/education_route.js";


// Connect to database
await mongoose.connect(process.env.MONGO_URL);
console.log('Database is connected');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
// app.use('/api/v1', educationRouter)

const port = process.env.PORT || 4800;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

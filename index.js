import express from "express";
import mongoose from "mongoose";
import cors from "cors";


// Connect to database
// await mongoose.connect(process.env.MONGO_URL);

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4800;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

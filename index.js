import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

if (!MONGOURL) {
    console.error("Missing MONGO_URL in environment variables");
    process.exit(1);
}

app.use("/api/user", userRoutes); // Make sure this is valid

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("Database connected successfully.");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.error("Database connection error:", error));

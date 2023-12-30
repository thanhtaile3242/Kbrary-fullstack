import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connection from "./models/database.js";
import userRoute from "./Routes/userRoutes.js";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.options("*", cors());
// Routes
app.use("/api/user", userRoute);

(async () => {
    try {
        await connection();
        app.listen(8802, () => {
            console.log("Kbrary Server running");
        });
    } catch (error) {
        console.log("Error connect to DB: ", error);
    }
})();

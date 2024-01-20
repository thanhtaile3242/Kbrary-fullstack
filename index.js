import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connection from "./models/database.js";
import userRoute from "./Routes/userRoutes.js";
import bookRoute from "./Routes/bookRoutes.js";
import categoryRoute from "./Routes/categoryRoutes.js";
import userRequestRoute from "./Routes/userRequestRoutes.js";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(express.static("./public/imageUser"));
app.use(express.static("./public/imageBook"));
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use("/api/user", userRoute);
app.use("/api/book", bookRoute);
app.use("/api/category", categoryRoute);
app.use("/api/userRequest", userRequestRoute);
// Trigger

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

import express  from "express";
import {config} from "dotenv"
import ToDouserRoute from "./routes/user.js"
import cookieParser from "cookie-parser";

export const app = express();

config({
    path: "./data/config.env",
})

// using middlewares
app.use(express.json())
app.use(cookieParser())

// Using Routes
app.use("/api/v1/users", ToDouserRoute)





app.get("/",(req,res) => {
    res.send("<h1>To Do App </h1>")
});

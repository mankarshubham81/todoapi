import express  from "express";
import {config} from "dotenv"
import ToDouserRoute from "./routes/user.js"

export const app = express();

config({
    path: "./data/config.env",
})

// middlewares
app.use(express.json())
app.use("/user", ToDouserRoute)





app.get("/",(req,res) => {
    res.send("<h1>To Do App </h1>")
});

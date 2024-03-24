import express  from "express";
import {config} from "dotenv"
import ToDoUserRouter from "./routes/user.js"
import TaskRouter from "./routes/task.js"
import cookieParser from "cookie-parser";
import { errorMiddleware } from './middlewares/error.js';
import cors from "cors";

export const app = express();

// .env configuration
config()

// using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// Using Routes
app.use("/api/v1/users", ToDoUserRouter);
app.use("/api/v1/task", TaskRouter);

// Custom Error middleware
app.use(errorMiddleware);





app.get("/",(req,res) => {
    res.send("<h1>To Do App </h1>")
});


import { app } from './app.js';
import { connectDB } from "./data/database.js";
// import {config} from "dotenv"

// config();

const PORT = process.env.PORT;

// const PORT = process.env.PORT || 4300;
connectDB();

console.log("port: ", process.env.PORT);
console.log("mongo uri: ", process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log(`Server is workong on port ${PORT} in ${process.env.NODE_ENV} Mode`);
});

console.log("a");
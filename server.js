
import { app } from './app.js';
import { connectDB } from "./data/database.js";


const PORT = 4300;
// const PORT = process.env.PORT || 4300;
connectDB();

console.log("aaa", process.env.PORT);
console.log("aaa", process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log(`Server is workong on port ${PORT}`);
});

console.log("a");
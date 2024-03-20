import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(
            process.env.MONGO_URI,{
            dbName:  "tododb"
            }
        );
        console.log(`Connected with ${connection.host}`);
    } catch (error) {
        console.log(`Database Related error: ${error}`);
    }

};
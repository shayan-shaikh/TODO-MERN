import mongoose from "mongoose";
export const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URI, { dbName: "backend-api" }).then(
        () => console.log("Database connected")
    ).catch(e => console.log(e));
}
import mongoose from "mongoose";
export const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URI, { dbName: "backend-api" }).then(
        (c) => console.log(`Database connected with host ${c.connection.host}`)
    ).catch(e => console.log(e));
}
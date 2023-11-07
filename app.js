import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { connectDb } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

const app = express();
config({
    path: "./data/config.env"
})
app.use(express.json());
app.use(cookieParser())
app.use("/api/users", userRouter)
app.use("/api/tasks", taskRouter)

app.use(errorMiddleware)
app.use(cors({
    origin: [process.env.FRONTEND_URL,],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}
))

connectDb()

app.get("/", (req, res) => {
    res.send("Root works well!")
})

app.listen(4000, () => {
    console.log(`Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
    console.log(`Allowed access for ${process.env.FRONTEND_URL}`)
})

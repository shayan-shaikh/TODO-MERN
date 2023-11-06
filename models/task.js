import mongoose from "mongoose";
const schema = mongoose.Schema({
    title: {
        type: String,
        requirede: true
    },
    description: {
        type: String,
        unique: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Task = mongoose.model("Task", schema);
export default Task;
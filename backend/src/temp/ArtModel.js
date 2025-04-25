import mongoose from "mongoose";

const artSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Art = mongoose.model("Art", artSchema);
export default Art;
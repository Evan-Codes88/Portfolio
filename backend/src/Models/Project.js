import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    tech: [{ type: String }],
    screenshots: [{ type: String }],
    liveUrl: { type: String },
    sourceUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);
export default Project;
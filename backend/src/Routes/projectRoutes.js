import express from "express";
import Project from "../Models/ProjectModel.js";

const router = express.Router();

// Get all Projects
router.get("/", async (request, response) => {
    try {
        const projects = await Project.find();
        response.json(projects);
    } catch (error) {
        Response.status(500).json({ message: error.message });
    }
});

// Add a project (For testing)
router.post("/", async (request, response) => {
    const project = new Project({
        title: request.body.title,
        description: request.body.description,
        tech: request.body.tech,
        screenshots: request.body.screenshots,
        liveUrl: request.body.liveUrl,
        sourceUrl: request.body.sourceUrl,
    });
    try {
        const newProject = await project.save();
        response.status(200).json(newProject);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

export default router;
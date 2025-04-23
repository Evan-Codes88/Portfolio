import express from "express";
import {
    getAllProjects,
    getProjectById,
    createAProject,
    updateProject,
    deleteProject
} from "../Controllers/projectControllers.js";
import { verifyToken } from "../Controllers/authControllers.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", verifyToken, createAProject);
router.put("/:id", verifyToken, updateProject);
router.delete("/:id", verifyToken, deleteProject);

export default router;
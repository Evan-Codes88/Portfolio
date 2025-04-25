import express from "express";
import {
    getAllProjects,
    getProjectById,
    createAProject,
    updateProject,
    deleteProject
} from "../controllers/projectControllers.js";
import { verifyToken } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", verifyToken, createAProject);
router.put("/:id", verifyToken, updateProject);
router.delete("/:id", verifyToken, deleteProject);

export default router;
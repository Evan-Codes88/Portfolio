import express from "express";
import {
    getAllArt,
    getArtById,
    createArt,
    updateArt,
    deleteArt,
} from "../Controllers/artControllers.js";
import { verifyToken } from "../Controllers/authControllers.js";

const router = express.Router();

router.get("/", getAllArt);
router.get("/:id", getArtById);
router.post("/", verifyToken, createArt);
router.put("/:id", verifyToken, updateArt);
router.delete("/:id", verifyToken, deleteArt);

export default router;
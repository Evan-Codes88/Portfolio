import express from "express";
import {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
  } from "../controllers/contactControllers.js";
  import { verifyToken } from "../controllers/authControllers.js";

const router = express.Router();

router.get("/", verifyToken, getAllContacts);
router.get("/:id", verifyToken, getContactById);
router.post("/", createContact);
router.put("/:id", verifyToken, updateContact);
router.delete("/:id", verifyToken, deleteContact);

export default router;
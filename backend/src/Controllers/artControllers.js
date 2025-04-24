import Art from "../Models/ArtModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Set up Multer
const storage = multer.diskStorage({
    destination: (request, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (request, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });
  
  // Get all art pieces
export const getAllArt = async (request, response) => {
    try {
        const art = await Art.find();
        response.json(art);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

  // Get a single art piece by ID
export const getArtById = async (request, response) => {
    try {
      const art = await Art.findById(request.params.id);
      if (!art) {
        return response.status(404).json({ message: "Art not found" });
      }
      response.json(art);
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  };
  
  // Create an art piece
export const createArt = [
    upload.single("image"),
    async (request, response) => {
        const { title, category, description } = request.body;
        if (!title || !category || !request.file) {
        return response.status(400).json({ message: "Title, category, and image are required" });
        }

        const art = new Art({
        title,
        category,
        imageUrl: `/uploads/${request.file.filename}`,
        description,
        });
        try {
        const newArt = await art.save();
        response.status(201).json(newArt);
        } catch (error) {
        response.status(400).json({ message: error.message });
        }
    },
];

// Update an art piece
export const updateArt = [
    upload.single("image"),
    async (request, response) => {
      try {
        const art = await Art.findById(request.params.id);
        if (!art) {
          return response.status(404).json({ message: "Art not found" });
        }
  
        const { title, category, description } = request.body;
        if (title) art.title = title;
        if (category) art.category = category;
        if (description) art.description = description;
        if (request.file) {
          if (art.imageUrl) {
            fs.unlinkSync(`.${art.imageUrl}`);
          }
          art.imageUrl = `/uploads/${request.file.filename}`;
        }
  
        const updatedArt = await art.save();
        response.json(updatedArt);
      } catch (err) {
        response.status(400).json({ message: err.message });
      }
    },
];

// Delete an art piece
export const deleteArt = async (request, response) => {
    try {
      const art = await Art.findById(request.params.id);
      if (!art) {
        return response.status(404).json({ message: "Art not found" });
      }
  
      if (art.imageUrl) {
        fs.unlinkSync(`.${art.imageUrl}`);
      }
  
      await art.deleteOne();
      response.json({ message: "Art deleted" });
    } catch (err) {
      response.status(500).json({ message: err.message });
    }
};


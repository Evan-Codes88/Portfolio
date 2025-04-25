import Art from "../models/ArtModel.js";

// Get all art pieces
export const getAllArt = async (request, response) => {
  try {
    const art = await Art.find();
    return response.json(art);
  } catch (error) {
    console.error("Error fetching all art:", error.message, error.stack);
    return response.status(500).json({ message: error.message });
  }
};

// Get a single art piece by ID
export const getArtById = async (request, response) => {
  try {
    const art = await Art.findById(request.params.id);
    if (!art) {
      return response.status(404).json({ message: "Art not found" });
    }
    return response.json(art);
  } catch (error) {
    console.error("Error fetching art by ID:", error.message, error.stack);
    return response.status(500).json({ message: error.message });
  }
};

// Create an art piece
export const createArt = async (request, response) => {
  const { title, category, description, imageUrl } = request.body;
  if (!title || !category || !imageUrl) {
    return response.status(400).json({ message: "Title, category, and imageUrl are required" });
  }

  const art = new Art({
    title,
    category,
    description: description || "",
    imageUrl,
  });

  try {
    const newArt = await art.save();
    return response.status(201).json(newArt);
  } catch (error) {
    console.error("Error creating art:", error.message, error.stack);
    return response.status(400).json({ message: error.message });
  }
};

// Update an art piece
export const updateArt = async (request, response) => {
  try {
    const art = await Art.findById(request.params.id);
    if (!art) {
      return response.status(404).json({ message: "Art not found" });
    }

    const { title, category, description, imageUrl } = request.body;
    if (title) art.title = title;
    if (category) art.category = category;
    if (description !== undefined) art.description = description;
    if (imageUrl) art.imageUrl = imageUrl;

    const updatedArt = await art.save();
    return response.json(updatedArt);
  } catch (error) {
    console.error("Error updating art:", error.message, error.stack);
    return response.status(400).json({ message: error.message });
  }
};

// Delete an art piece
export const deleteArt = async (request, response) => {
  try {
    const art = await Art.findById(request.params.id);
    if (!art) {
      return response.status(404).json({ message: "Art not found" });
    }

    await art.deleteOne();
    return response.json({ message: "Art deleted" });
  } catch (error) {
    console.error("Error deleting art:", error.message, error.stack);
    return response.status(500).json({ message: error.message });
  }
};
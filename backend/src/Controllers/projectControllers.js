import Project from "../Models/ProjectModel.js"

// Get all projects
export const getAllProjects = async (request, response) => {
    try {
        const projects = await Project.find();
        return response.json(projects);

    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

// Get project by ID
export const getProjectById = async (request, response) => {
    try {
        const project = await Project.findById(request.params.id);
        if (!project) {
            return response.status(404).json({ message: "Project Not Found" });
        }
        return response.json(project);

    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
};

// Create a project
export const createAProject = async (request, response) => {
    const { title, description, tech, screenshots, liveUrl, sourceUrl } = request.body;
    if (!title || !description) {
        return response.status(400).json({ message: "Title and description required" });
    }

    const project = new Project({
        title,
        description,
        tech: tech || [],
        screenshots: screenshots || [],
        liveUrl,
        sourceUrl,
    });

    try {
        const newProject = await project.save();
        return response.status(201).json(newProject);

    } catch (error) {
        return response.status(400).json({ message: error.message });
    }
};

// Update a project
export const updateProject = async (request, response) => {
    try {
      const project = await Project.findById(request.params.id);
      if (!project) {
        return response.status(404).json({ message: "Project not found" });
      }
  
      const { title, description, tech, screenshots, liveUrl, sourceUrl } = request.body;
      if (title) project.title = title;
      if (description) project.description = description;
      if (tech) project.tech = tech;
      if (screenshots) project.screenshots = screenshots;
      if (liveUrl) project.liveUrl = liveUrl;
      if (sourceUrl) project.sourceUrl = sourceUrl;
  
      const updatedProject = await project.save();
      response.json(updatedProject);

    } catch (err) {
      response.status(400).json({ message: error.message });
    }
  };

// Delete a project
export const deleteProject = async (request, response) => {
    try {
      const project = await Project.findById(request.params.id);
      if (!project) {
        return response.status(404).json({ message: "Project not found" });
      }
  
      await project.deleteOne();
      response.json({ message: "Project deleted" });
      
    } catch (err) {
      response.status(500).json({ message: err.message });
    }
  };
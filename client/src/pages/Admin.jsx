import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getArt,
  createArt,
  updateArt,
  deleteArt,
  getContacts,
  deleteContact,
} from "../utils/api";

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [artPieces, setArtPieces] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editingArt, setEditingArt] = useState(null);
  const navigate = useNavigate();

  const projectForm = useForm();
  const artForm = useForm();

  const {
    register: registerProject,
    handleSubmit: handleProjectSubmitForm,
    reset: resetProject,
    setValue: setProjectValue,
  } = projectForm;

  const {
    register: registerArt,
    handleSubmit: handleArtSubmitForm,
    reset: resetArt,
    setValue: setArtValue,
  } = artForm;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    getProjects()
      .then((res) => setProjects(res.data))
      .catch((error) => console.error("Error fetching projects:", error.message, error.stack));
    getArt()
      .then((res) => setArtPieces(res.data))
      .catch((error) => console.error("Error fetching art:", error.message, error.stack));
    getContacts()
      .then((res) => setContacts(res.data))
      .catch((error) => console.error("Error deleting contact:", error.message, error.stack));
  }, [navigate]);

  const handleProjectSubmit = async (data) => {
    try {
      const projectData = {
        ...data,
        tech: data.tech ? data.tech.split(",").map((t) => t.trim()) : [],
        screenshots: data.screenshots ? data.screenshots.split(",").map((s) => s.trim()) : [],
      };
      if (editingProject) {
        await updateProject(editingProject._id, projectData);
        toast.success("Project updated!");
      } else {
        await createProject(projectData);
        toast.success("Project created!");
      }
      resetProject();
      setEditingProject(null);
      getProjects().then((res) => setProjects(res.data));
    } catch (error) {
      console.error("Error saving project:", error.message, error.stack);
      toast.error("Error saving project: " + error.message);
    }
  };

  const handleArtSubmit = async (data) => {
    const artData = {
      title: data.title,
      category: data.category,
      description: data.description,
      imageUrl: data.imageUrl, 
    };
  
    try {
      if (editingArt) {
        await updateArt(editingArt._id, artData); 
        toast.success("Art updated!");
      } else {
        await createArt(artData); 
        toast.success("Art created!");
      }
      resetArt();
      setEditingArt(null);
      getArt().then((res) => setArtPieces(res.data)); 
    } catch (error) {
      console.error("Error saving art:", error.message, error.stack);
      toast.error("Error saving art: " + error.message);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectValue("title", project.title);
    setProjectValue("description", project.description);
    setProjectValue("tech", project.tech.join(","));
    setProjectValue("screenshots", project.screenshots.join(","));
    setProjectValue("liveUrl", project.liveUrl);
    setProjectValue("sourceUrl", project.sourceUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditArt = (art) => {
    setEditingArt(art);
    setArtValue("title", art.title);
    setArtValue("category", art.category);
    setArtValue("description", art.description);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      toast.success("Project deleted!");
      getProjects().then((res) => setProjects(res.data));
    } catch (error) {
      console.error("Error deleting project:", error.message, error.stack);
      toast.error("Error deleting project: " + error.message);
    }
  };

  const handleDeleteArt = async (id) => {
    try {
      await deleteArt(id);
      toast.success("Art deleted!");
      getArt().then((res) => setArtPieces(res.data));
    } catch (error) {
      console.error("Error deleting art:", error.message, error.stack);
      toast.error("Error deleting art: " + error.message);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      toast.success("Contact deleted!");
      getContacts().then((res) => setContacts(res.data));
    } catch (error) {
      console.error("Error deleting contact:", error.message, error.stack);
      toast.error("Error deleting contact: " + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3, yoyo: Infinity },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section className="pt-24 pb-16 bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-pink-400"
          >
            Admin Panel
          </motion.h2>
          <motion.button
            onClick={handleLogout}
            className="bg-pink-400 text-gray-900 px-4 py-2 rounded hover:bg-pink-500"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Logout
          </motion.button>
        </div>

        {/* Project Form */}
        <div className="mb-12 w-full flex justify-center">
          <div className="w-full max-w-md">
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">
              {editingProject ? "Edit Project" : "Add Project"}
            </h3>
            <form onSubmit={handleProjectSubmitForm(handleProjectSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                {...registerProject("title", { required: true })}
                className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
              />
              <textarea
                placeholder="Description"
                {...registerProject("description", { required: true })}
                className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
              />
              <input
                type="text"
                placeholder="Tech (comma-separated)"
                {...registerProject("tech")}
                className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
              />
              <input
                type="text"
                placeholder="Screenshots (comma-separated URLs)"
                {...registerProject("screenshots")}
                className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
              />
              <input
                type="url"
                placeholder="Live URL"
                {...registerProject("liveUrl")}
                className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
              />
              <input
                type="url"
                placeholder="Source URL"
                {...registerProject("sourceUrl")}
                className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
              />
              <div className="flex justify-center gap-2">
                <button
                  type="submit"
                  className="bg-pink-400 text-gray-900 p-3 rounded hover:bg-pink-500"
                >
                  {editingProject ? "Update" : "Create"}
                </button>
                {editingProject && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProject(null);
                      resetProject();
                    }}
                    className="bg-gray-600 text-white p-3 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Art Form */}
        <div className="mb-12 w-full flex justify-center">
          <div className="w-full max-w-md">
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">
              {editingArt ? "Edit Art" : "Add Art"}
            </h3>
            <form onSubmit={handleArtSubmitForm(handleArtSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                {...registerArt("title", { required: true })}
                className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
              />
              <input
                type="text"
                placeholder="Category"
                {...registerArt("category", { required: true })}
                className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
              />
              <textarea
                placeholder="Description"
                {...registerArt("description")}
                className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
              />
              <input
                type="url"
                placeholder="Image URL"
                {...registerArt("imageUrl", { required: !editingArt })}
                className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
              />
              <div className="flex justify-center gap-2">
                <button
                  type="submit"
                  className="bg-pink-400 text-gray-900 p-3 rounded hover:bg-pink-500"
                >
                  {editingArt ? "Update" : "Create"}
                </button>
                {editingArt && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingArt(null);
                      resetArt();
                    }}
                    className="bg-gray-600 text-white p-3 rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Projects List */}
        <div className="mb-12 w-full flex justify-center">
          <div className="w-full max-w-md">
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">Projects</h3>
            <ul className="space-y-4">
              {projects.map((project) => (
                <li
                  key={project._id}
                  className="bg-gray-800 p-4 rounded flex justify-between items-center"
                >
                  <span>{project.title}</span>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEditProject(project)}
                      className="bg-pink-400 text-black px-3 py-1 rounded"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteProject(project._id)}
                      className="bg-red-400 text-white px-3 py-1 rounded"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Delete
                    </motion.button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Art List */}
        <div className="mb-12 w-full flex justify-center">
          <div className="w-full max-w-md">
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">Art</h3>
            <ul className="space-y-4">
              {artPieces.map((art) => (
                <li
                  key={art._id}
                  className="bg-gray-800 p-4 rounded flex justify-between items-center"
                >
                  <span>{art.title}</span>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEditArt(art)}
                      className="bg-blue-400 text-white px-3 py-1 rounded"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteArt(art._id)}
                      className="bg-red-400 text-white px-3 py-1 rounded"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Delete
                    </motion.button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contacts List */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-md">
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">
              Contact Submissions
            </h3>
            <ul className="space-y-4">
              {contacts.map((contact) => (
                <li
                  key={contact._id}
                  className="bg-gray-800 p-4 rounded flex justify-between items-center"
                >
                  <span>
                    {contact.name} - {contact.email}
                  </span>
                  <motion.button
                    onClick={() => handleDeleteContact(contact._id)}
                    className="bg-red-400 text-white px-3 py-1 rounded"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Delete
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
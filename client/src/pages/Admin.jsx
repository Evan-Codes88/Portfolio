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
  const { register, handleSubmit, reset, setValue } = useForm();

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
      .catch((error) => console.error("Error fetching contacts:", error.message, error.stack));
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
      reset();
      setEditingProject(null);
      getProjects().then((res) => setProjects(res.data));
    } catch (error) {
      console.error("Error saving project:", error.message, error.stack);
      toast.error("Error saving project: " + error.message);
    }
  };

  const handleArtSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    if (data.image[0]) formData.append("image", data.image[0]);

    try {
      if (editingArt) {
        await updateArt(editingArt._id, formData);
        toast.success("Art updated!");
      } else {
        await createArt(formData);
        toast.success("Art created!");
      }
      reset();
      setEditingArt(null);
      getArt().then((res) => setArtPieces(res.data));
    } catch (error) {
      console.error("Error saving art:", error.message, error.stack);
      toast.error("Error saving art: " + error.message);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setValue("title", project.title);
    setValue("description", project.description);
    setValue("tech", project.tech.join(","));
    setValue("screenshots", project.screenshots.join(","));
    setValue("liveUrl", project.liveUrl);
    setValue("sourceUrl", project.sourceUrl);
  };

  const handleEditArt = (art) => {
    setEditingArt(art);
    setValue("title", art.title);
    setValue("category", art.category);
    setValue("description", art.description);
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

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-pink-400 text-center mb-12"
        >
          Admin Panel
        </motion.h2>

        {/* Project Form */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-4">
            {editingProject ? "Edit Project" : "Add Project"}
          </h3>
          <form onSubmit={handleSubmit(handleProjectSubmit)} className="space-y-4 max-w-md">
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
            />
            <textarea
              placeholder="Description"
              {...register("description", { required: true })}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
            />
            <input
              type="text"
              placeholder="Tech (comma-separated)"
              {...register("tech")}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
            />
            <input
              type="text"
              placeholder="Screenshots (comma-separated URLs)"
              {...register("screenshots")}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
            />
            <input
              type="url"
              placeholder="Live URL"
              {...register("liveUrl")}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
            />
            <input
              type="url"
              placeholder="Source URL"
              {...register("sourceUrl")}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
            />
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
                  reset();
                }}
                className="ml-2 bg-gray-600 text-white p-3 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Art Form */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-4">
            {editingArt ? "Edit Art" : "Add Art"}
          </h3>
          <form onSubmit={handleSubmit(handleArtSubmit)} className="space-y-4 max-w-md">
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
            />
            <input
              type="text"
              placeholder="Category"
              {...register("category", { required: true })}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
            />
            <textarea
              placeholder="Description"
              {...register("description")}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
            />
            <input
              type="file"
              {...register("image", { required: !editingArt })}
              className="w-full p-3 bg-gray-800 border border-purple-400 rounded text-white"
            />
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
                  reset();
                }}
                className="ml-2 bg-gray-600 text-white p-3 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Projects List */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-4">Projects</h3>
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project._id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                <span>{project.title}</span>
                <div>
                  <button
                    onClick={() => handleEditProject(project)}
                    className="bg-blue-400 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="bg-red-400 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Art List */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-4">Art</h3>
          <ul className="space-y-4">
            {artPieces.map((art) => (
              <li key={art._id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                <span>{art.title}</span>
                <div>
                  <button
                    onClick={() => handleEditArt(art)}
                    className="bg-blue-400 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteArt(art._id)}
                    className="bg-red-400 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts List */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-4">Contact Submissions</h3>
          <ul className="space-y-4">
            {contacts.map((contact) => (
              <li key={contact._id} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                <span>{contact.name} - {contact.email}</span>
                <button
                  onClick={() => handleDeleteContact(contact._id)}
                  className="bg-red-400 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Admin;
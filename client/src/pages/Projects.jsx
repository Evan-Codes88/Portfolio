import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { getProjects, getProjectById } from "../utils/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getProjects()
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleCardClick = async (id) => {
    try {
      const response = await getProjectById(id);
      setSelectedProject(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const filters = ["All", "Web", "Games", "APIs"];
  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.tech.includes(filter));

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-pink-400 text-center mb-12"
        >
          Projects
        </motion.h2>
        <div className="flex justify-center gap-4 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded ${
                filter === f ? "bg-pink-400 text-gray-900" : "bg-gray-700 text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onClick={() => handleCardClick(project._id)}
            />
          ))}
        </div>
        <ProjectModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      </div>
    </section>
  );
};

export default Projects;
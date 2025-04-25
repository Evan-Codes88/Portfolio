import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { getProjects, getProjectById } from "../utils/api";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getProjects()
      .then((response) => {
        setProjects(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      });
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
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-pink-400 text-center mb-12 mt-5"
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
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]"
          style={{ overflowY: isLoading ? "hidden" : "visible" }}
        >
          {!isLoading && (
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => handleCardClick(project._id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
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
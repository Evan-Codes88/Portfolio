// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <img
        src={project.screenshots[0] || "https://via.placeholder.com/300x200"}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-pink-400">{project.title}</h3>
        <p className="text-gray-400 mt-2 line-clamp-2">{project.description}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="text-sm bg-gray-700 text-white px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
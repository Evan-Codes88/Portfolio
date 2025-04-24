import Modal from "react-modal";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

Modal.setAppElement("#root");

const ProjectModal = ({ isOpen, onRequestClose, project }) => {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="max-w-2xl mx-auto my-8 bg-gray-800 rounded-lg p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-pink-400 mb-4">{project.title}</h2>
        <img
          src={project.screenshots[0] || "https://via.placeholder.com/600x400"}
          alt={project.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <p className="text-gray-300 mb-4">{project.description}</p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Technologies</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tech.map((tech) => (
              <span key={tech} className="bg-gray-700 text-white px-2 py-1 rounded text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-400 text-gray-900 px-4 py-2 rounded hover:bg-pink-500 mr-2"
          >
            View Live
          </a>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Source Code
          </a>
        )}
        <button
          onClick={onRequestClose}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Close
        </button>
      </motion.div>
    </Modal>
  );
};

export default ProjectModal;
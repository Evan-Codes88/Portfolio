import { useState } from "react";
import Modal from "react-modal";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

Modal.setAppElement("#root");

const ProjectModal = ({ isOpen, onRequestClose, project }) => {
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  if (!project) return null;

  const screenshots = project.screenshots || [];
  const hasMultipleScreenshots = screenshots.length > 1;

  const handlePrevScreenshot = () => {
    setCurrentScreenshotIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  const handleNextScreenshot = () => {
    setCurrentScreenshotIndex((prevIndex) =>
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-full max-w-lg sm:max-w-xl md:max-w-3xl mx-auto my-8 bg-gray-800 rounded-lg p-4 sm:p-6 outline-none"
      overlayClassName="fixed inset-0 backdrop-blur-md flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-pink-400 mb-4">{project.title}</h2>
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            {hasMultipleScreenshots && (
              <button
                onClick={handlePrevScreenshot}
                className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 order-1 sm:order-none"
              >
                Prev
              </button>
            )}
            <div className="w-full max-w-md h-64">
              <img
                src={screenshots[currentScreenshotIndex] || "https://via.placeholder.com/600x400"}
                alt={`${project.title} screenshot ${currentScreenshotIndex + 1}`}
                className="w-full h-full object-cover rounded"
              />
            </div>
            {hasMultipleScreenshots && (
              <button
                onClick={handleNextScreenshot}
                className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 order-2 sm:order-none"
              >
                Next
              </button>
            )}
          </div>
          {hasMultipleScreenshots && (
            <div className="text-center text-white text-sm mt-2">
              {currentScreenshotIndex + 1} / {screenshots.length}
            </div>
          )}
        </div>
        <p className="text-gray-300 mb-4 text-sm sm:text-base">{project.description}</p>
        <div className="mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-white">Technologies</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tech.map((tech) => (
              <span key={tech} className="bg-gray-700 text-white px-2 py-1 rounded text-xs sm:text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-pink-400 text-gray-900 px-4 py-2 rounded hover:bg-pink-500 text-sm sm:text-base"
            >
              View Live
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm sm:text-base"
            >
              Source Code
            </a>
          )}
          <button
            onClick={onRequestClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ProjectModal;
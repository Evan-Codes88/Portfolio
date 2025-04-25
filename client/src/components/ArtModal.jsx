import Modal from "react-modal";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

Modal.setAppElement("#root");

const ArtModal = ({ isOpen, onRequestClose, art }) => {
  if (!art) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-11/12 max-w-md sm:max-w-lg md:max-w-2xl mx-auto my-4 sm:my-8 bg-gray-800 rounded-lg p-4 sm:p-5 md:p-6 outline-none"
      overlayClassName="fixed inset-0 backdrop-blur-md flex items-center sm:items-start sm:pt-8 justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-400 mb-3 sm:mb-4">{art.title}</h2>
        <img
          src={art.imageUrl || "https://via.placeholder.com/600x600"}
          alt={art.title}
          className="w-full h-64 sm:h-80 md:h-96 object-contain rounded mb-3 sm:mb-4"
        />
        <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">{art.description || "No description provided."}</p>
        
        {/* Category as a tag */}
        <div className="mb-3 sm:mb-4">
          <span className="inline-block bg-pink-500 text-white text-xs sm:text-sm font-semibold rounded-full px-3 sm:px-4 py-1 sm:py-2">
            {art.category}
          </span>
        </div>

        <button
          onClick={onRequestClose}
          className="bg-gray-600 text-white text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-gray-700"
        >
          Close
        </button>
      </motion.div>
    </Modal>
  );
};

export default ArtModal;
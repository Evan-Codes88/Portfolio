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
      className="max-w-2xl mx-auto my-8 bg-gray-800 rounded-lg p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-pink-400 mb-4">{art.title}</h2>
        <img
          src={art.imageUrl || "https://via.placeholder.com/600x600"}
          alt={art.title}
          className="w-full h-96 object-contain rounded mb-4"
        />
        <p className="text-gray-300 mb-4">{art.description || "No description provided."}</p>
        <p className="text-gray-400 mb-4">Category: {art.category}</p>
        <button
          onClick={onRequestClose}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Close
        </button>
      </motion.div>
    </Modal>
  );
};

export default ArtModal;
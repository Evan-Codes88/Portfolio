// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ArtCard = ({ art, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <img
        src={art.imageUrl || "https://via.placeholder.com/300x300"}
        alt={art.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-pink-400">{art.title}</h3>
        <p className="text-gray-400 mt-2">{art.category}</p>
      </div>
    </motion.div>
  );
};

export default ArtCard;
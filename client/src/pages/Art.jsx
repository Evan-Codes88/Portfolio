import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ArtCard from "../components/ArtCard";
import ArtModal from "../components/ArtModal";
import { getArt, getArtById } from "../utils/api";

const Art = () => {
  const [artPieces, setArtPieces] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getArt()
      .then((response) => setArtPieces(response.data))
      .catch((error) => console.error("Error fetching art:", error));
  }, []);

  const handleCardClick = async (id) => {
    try {
      const response = await getArtById(id);
      setSelectedArt(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching art:", error);
    }
  };

  const filters = ["All", "Digital", "Pixel Art", "Sketches", "Game Assets"];
  const filteredArt = filter === "All" ? artPieces : artPieces.filter((a) => a.category === filter);

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-pink-400 text-center mb-12"
        >
          Art Gallery
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
          {filteredArt.map((art) => (
            <ArtCard
              key={art._id}
              art={art}
              onClick={() => handleCardClick(art._id)}
            />
          ))}
        </div>
        <ArtModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          art={selectedArt}
        />
      </div>
    </section>
  );
};

export default Art;
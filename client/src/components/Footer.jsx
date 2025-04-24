// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-400">
          Built with 💻 + 🎨 by Evan Meehan
        </p>
        <p className="text-sm text-gray-400 mt-2">
          "Creativity is intelligence having fun."
        </p>
        <motion.img
          src="/assets/stegosaurus.svg"
          alt="Stegosaurus"
          className="w-12 h-12 mx-auto mt-4"
          whileHover={{ rotate: 10 }}
        />
      </div>
    </footer>
  );
};

export default Footer;
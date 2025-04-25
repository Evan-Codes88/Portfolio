// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import art from "../assets/art.jpg";

const Footer = () => {
  // Function to scroll back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="pt-2 pb-2 sm:pb-4 md:pb-6 mt-2 sm:mt-4 md:mt-6 relative">
      <div className="max-w-7xl mx-auto pt-2 pb-2 sm:pb-4 md:pb-6">
        {/* Footer Content Container with Subtle Background */}
        <motion.div
          className="bg-gray-900/50 backdrop-blur-sm rounded-lg py-2 sm:py-4 px-4 sm:px-6 mx-4 sm:mx-6 md:mx-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Flex Container for Image and Text */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3 md:gap-6">
            {/* Art Image wrapped in a Link */}
            <Link to="/art">
              <motion.img
                src={art}
                alt="Colourful Art Image"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full"
                whileHover={{ rotate: 10, scale: 1.1 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              />
            </Link>

            {/* Text and Button Container */}
            <div className="text-center">
              <motion.p
                className="text-xs sm:text-sm md:text-base text-gray-400"
                whileHover={{ color: "#f472b6", scale: 1.05 }} // Pink-400 on hover
                transition={{ duration: 0.3 }}
              >
                Developed by Evan Meehan
              </motion.p>
              <motion.p
                className="text-xs sm:text-sm md:text-base text-gray-400 mt-1 sm:mt-2"
                whileHover={{ color: "#f472b6", scale: 1.05 }} // Pink-400 on hover
                transition={{ duration: 0.3 }}
              >
                "Creativity is intelligence having fun."
              </motion.p>

              {/* Back to Top Button */}
              <motion.button
                onClick={scrollToTop}
                className="mt-2 sm:mt-3 inline-block bg-pink-400 text-gray-900 px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg font-semibold text-xs sm:text-sm md:text-base hover:bg-pink-500 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Back to Top
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

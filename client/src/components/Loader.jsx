// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Loader = () => (
  <motion.div
    className="flex justify-center items-center h-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
  </motion.div>
);

export default Loader;


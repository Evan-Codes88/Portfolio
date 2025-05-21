// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Loader = () => (
  <motion.div
    className="relative h-screen w-screen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="absolute top-1/4 left-1/3 transform -translate-x-1/4">
      <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin ml-[40px]"></div>
    </div>
  </motion.div>
);

export default Loader;

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Skills = () => {
  return (
    <section className="py-16 bg-purple-900">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl font-bold text-pink-400 text-center mb-12"
      >
        Skills
      </motion.h2>
      <p className="text-white text-center">Skills content here</p>
    </section>
  );
};

export default Skills;
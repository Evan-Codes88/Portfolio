// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      company: "ATO",
      role: "Junior Developer",
      period: "2021-2022",
      description: "Developed internal tools.",
    },
    {
      company: "SeaWorld",
      role: "Tech Support",
      period: "2022-2023",
      description: "Supported park systems.",
    },
    {
      company: "Popperz Nightclub",
      role: "Event Staff",
      period: "2023-Present",
      description: "Managed weekend events.",
    },
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold text-pink-400 text-center mb-12"
        >
          Experience
        </motion.h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 top-0 w-1 bg-purple-400 h-full"></div>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="mb-8 flex items-center"
            >
              <div className="w-8 h-8 bg-pink-400 rounded-full z-10"></div>
              <div className="ml-4 bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white">{exp.company}</h3>
                <p className="text-gray-400">{exp.role}</p>
                <p className="text-gray-400">{exp.period}</p>
                <p className="text-gray-300 mt-2">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
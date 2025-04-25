// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      company: "Foundever- Square",
      role: "Customer Service Advocate",
      period: "2025-Present",
      description: (
        <ul className="list-disc pl-5 text-gray-200 text-sm sm:text-base">
          <li>Provide exceptional customer support by managing inbound phone inquiries and resolving seller issues efficiently.</li>
          <li>Utilize problem-solving skills to troubleshoot account, payment, and product-related concerns.</li>
          <li>Maintain a high level of empathy and professionalism, ensuring sellers receive personalized assistance.</li>
        </ul>
      ),
    },
    {
      company: "Freelance Full-Stack Web Developer",
      period: "Dec 2024-Present",
      description: (
        <ul className="list-disc pl-5 text-gray-200 text-sm sm:text-base">
          <li>Design and develop responsive, user-friendly websites and web applications tailored to client needs.</li>
          <li>Build and maintain full-stack solutions using JavaScript, React.js, Node.js, Express, MongoDB, and SQL.</li>
          <li>Optimize performance and scalability through Docker, Kubernetes, and cloud deployment (AWS & Google Cloud).</li>
        </ul>
      ),
    },
    {
      company: "Popperz Nightclub",
      role: "Digital Marketing & Web Development Coordinator",
      period: "Jun 2022-Present",
      description: (
        <ul className="list-disc pl-5 text-gray-200 text-sm sm:text-base">
          <li>Manage event creation and ticket sales through Eventbrite, ensuring smooth event registration and maximizing attendance.</li>
          <li>Utilized Square to process payments efficiently, maintaining a seamless transaction experience for customers and staff.</li>
          <li>Currently developing Popperz Nightclub’s website, focusing on enhancing user experience and increasing online engagement.</li>
        </ul>
      ),
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl sm:text-4xl font-extrabold text-pink-400 text-center mb-12 sm:mb-16 mt-7 sm:mt-8"
        >
          Experience
        </motion.h2>
        <div className="w-full max-w-4xl">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="mb-8 sm:mb-12 flex justify-center items-center w-full"
            >
              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-lg px-4 sm:px-6 bg-gray-700/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-2xl border border-gradient-to-r from-purple-400 to-pink-400 hover:bg-gray-600/80 transition-all duration-200"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-white">{exp.company}</h3>
                <p className="text-gray-300 text-sm sm:text-base">{exp.role}</p>
                <p className="text-gray-400 text-xs sm:text-sm">{exp.period}</p>
                <div className="mt-3">{exp.description}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
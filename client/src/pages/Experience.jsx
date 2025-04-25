// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      company: "Foundever- Square",
      role: "Customer Service Advocate",
      period: "2025-Present",
      description: (
        <ul className="list-disc pl-6 text-gray-300">
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
        <ul className="list-disc pl-6 text-gray-300">
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
        <ul className="list-disc pl-6 text-gray-300">
          <li>Manage event creation and ticket sales through Eventbrite, ensuring smooth event registration and maximizing attendance.</li>
          <li>Utilized Square to process payments efficiently, maintaining a seamless transaction experience for customers and staff.</li>
          <li>Currently developing Popperz Nightclub’s website, focusing on enhancing user experience and increasing online engagement.</li>
        </ul>
      ),
    },
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-pink-400 text-center mb-16"
        >
          Experience
        </motion.h2>
        <div className="relative w-full max-w-3xl">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-1 bg-purple-400 h-full z-0"></div>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`mb-12 flex ${index % 2 === 0 ? 'justify-end' : 'justify-end'} items-center w-full`}
            >
            <div className={`w-full max-w-md pl-12 pr-12 flex items-center relative`}>
            {/* Pink Circle */}
            <div className="w-10 h-10 bg-pink-400 rounded-full z-10 absolute left-1/7 transform -translate-x-1/2 top-1/2 -translate-y-1/2"></div>

            {/* Content Box */}
            <div
              className={`ml-12 bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300 w-full ${
                index % 2 === 0 ? 'order-first' : 'order-last'
              }`}
            >
              <h3 className="text-2xl font-semibold text-white">{exp.company}</h3>
              <p className="text-gray-400 text-lg">{exp.role}</p>
              <p className="text-gray-400 text-sm">{exp.period}</p>
              <p className="text-gray-300 mt-3">{exp.description}</p>
            </div>
          </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Modal from "react-modal";

// Set the app element for react-modal
Modal.setAppElement("#root");

// Skills data with levels
const skillsData = {
  Languages: [
    { name: "Javascript", level: 4 },
    { name: "Python", level: 4 },
    { name: "SQL", level: 4 },
  ],
  Frontend: [
    { name: "React.js", level: 3 },
    { name: "Next.js", level: 3 },
  ],
  Backend: [
    { name: "Node.js", level: 4 },
    { name: "Express", level: 4 },
    { name: "Flask", level: 3 },
  ],
  Databases: [
    { name: "MongoDB", level: 4 },
    { name: "PostgreSQL", level: 3 },
  ],
  Authentication: [
    { name: "JWT", level: 4 },
    { name: "Multi-Factor Authentication (MFA)", level: 3 },
    { name: "User Authentication Flow Design", level: 4 },
  ],
  "Cloud & DevOps": [
    { name: "Docker", level: 2 },
    { name: "Kubernetes", level: 2 },
    { name: "AWS", level: 2 },
    { name: "Google Cloud", level: 2 },
  ],
  Testing: [
    { name: "Pytest", level: 3 },
    { name: "Jest", level: 3 },
  ],
  Methodologies: [
    { name: "Scrum", level: 5 },
    { name: "Agile", level: 5 },
  ],
};

// Descriptions for each skill
const skillDescriptions = {
  Javascript: "Proficient in writing dynamic and interactive web applications using Javascript, with experience in ES6+ features, asynchronous programming, and DOM manipulation.",
  Python: "Skilled in Python for scripting, automation, and backend development, with experience in libraries like Flask and data analysis tools.",
  SQL: "Experienced in writing efficient SQL queries for relational databases, including complex joins, indexing, and optimization.",
  "React.js": "Capable of building responsive and component-based UI with React.js, with a focus on state management and hooks.",
  "Next.js": "Familiar with Next.js for server-side rendering and static site generation, enhancing React applications with better SEO and performance.",
  "Node.js": "Proficient in building scalable backend services using Node.js, with experience in RESTful APIs and event-driven architecture.",
  Express: "Skilled in creating robust APIs with Express, handling middleware, routing, and integrating with databases.",
  Flask: "Experienced in developing lightweight web applications with Flask, focusing on simplicity and flexibility.",
  MongoDB: "Proficient in designing and querying NoSQL databases with MongoDB, including aggregation pipelines and schema design.",
  PostgreSQL: "Capable of managing relational databases with PostgreSQL, with a focus on transactions, indexing, and data integrity.",
  JWT: "Experienced in implementing secure authentication using JSON Web Tokens (JWT) for stateless user sessions.",
  "Multi-Factor Authentication (MFA)": "Familiar with integrating MFA to enhance security, including email and SMS-based verification.",
  "User Authentication Flow Design": "Skilled in designing secure and user-friendly authentication flows, including OAuth, passwordless login, and session management.",
  Docker: "Basic knowledge of containerization with Docker, including creating and managing containers for development and deployment.",
  Kubernetes: "Introductory experience with Kubernetes for container orchestration, focusing on deployment and scaling.",
  AWS: "Basic understanding of AWS services like EC2, S3, and Lambda for cloud-based application deployment.",
  "Google Cloud": "Introductory experience with Google Cloud Platform, including Compute Engine and Cloud Functions.",
  Pytest: "Capable of writing unit and integration tests with Pytest to ensure code reliability in Python projects.",
  Jest: "Experienced in testing Javascript applications with Jest, focusing on unit tests and snapshot testing for React components.",
  Scrum: "Highly experienced in Scrum methodology, leading sprints, backlog grooming, and facilitating team collaboration.",
  Agile: "Expert in Agile principles, promoting iterative development, continuous improvement, and adaptive planning.",
};

// Modal component for skill details
const SkillModal = ({ isOpen, onRequestClose, skill }) => {
  if (!skill) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="max-w-lg mx-auto my-8 bg-gray-800 rounded-lg p-6 outline-none"
      overlayClassName="fixed inset-0 backdrop-blur-md flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-pink-400 mb-4">{skill.name}</h2>
        <p className="text-gray-300 mb-4">{skillDescriptions[skill.name] || "No description available."}</p>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Confidence Level</h3>
          <div className="text-yellow-400 mt-2">
            {"★".repeat(skill.level)}{"☆".repeat(5 - skill.level)}
          </div>
        </div>
        <button
          onClick={onRequestClose}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Close
        </button>
      </motion.div>
    </Modal>
  );
};

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 bg-gray-900">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl font-bold text-pink-400 text-center mb-4 mt-5"
      >
        Skills
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-300 text-base sm:text-lg text-center mb-12"
      >
        Click on each skill to know more
      </motion.p>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-4">{category}</h3>
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <motion.li
                    key={skill.name}
                    whileHover={{ scale: 1.05, color: "#F472B6" }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-300 text-base flex justify-between items-center cursor-pointer"
                    onClick={() => handleSkillClick(skill)}
                  >
                    <span>{skill.name}</span>
                    <span className="text-yellow-400">
                      {"★".repeat(skill.level)}{"☆".repeat(5 - skill.level)}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      <SkillModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        skill={selectedSkill}
      />
    </section>
  );
};

export default Skills;
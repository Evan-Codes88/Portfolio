// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

// Import placeholder images and resume PDF
import cruellaSlider from "../assets/cruellaSlider.JPG";
import undertaleSlider from "../assets/undertale.jpg";
import popperzSlider from "../assets/popperz.png";
import resume from "../assets/resume.pdf";

const About = () => {
  const timeline = [
    { year: "2019", event: "Graduated Highschool and moved to Queensland" },
    { year: "2022", event: "Started learning HTML and CSS for fun" },
    { year: "2023", event: "Dived deeper into tech, focusing on JavaScript" },
    { year: "2024", event: "Began Full-Stack Web Development at Coder Academy" },
    { year: "2025", event: "Graduating as a Full-Stack Web Developer" },
  ];

  const funFacts = [
    { text: "I have an amazing dog named Cruella", image: cruellaSlider, alt: "Evan's dog Cruella" },
    { text: "My favorite game is Undertale", image: undertaleSlider, alt: "Undertale game artwork" },
    { text: "I also work for Popperz Nightclub in my spare time", image: popperzSlider, alt: "Popperz Nightclub logo" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <section id="about" className="pt-16 sm:pt-20 md:pt-24 py-8 sm:py-12 md:py-16 bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-400 text-center mb-8 sm:mb-10 md:mb-12 mt-5"
        >
          About Me
        </motion.h2>

        {/* Introduction */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg mb-8 sm:mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 text-center"
          >
            Hi, I'm Evan! A passionate web developer based in Australia, with a love for solving problems through code. When I'm not coding, you can find me drawing pixel art, playing video games, or spending time with my partner Wilson and my dog Cruella.
          </motion.h3>
        </div>

        {/* Timeline and Fun Facts Section */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {/* Timeline */}
          <div className="md:w-1/2 bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4 md:mb-6">
              My Journey
            </h3>
            <div className="relative pl-8 sm:pl-10">
              {/* Timeline line with immediate animation */}
              <motion.div
                className="absolute left-4 sm:left-6 top-0 w-1 bg-purple-400 h-full"
                initial={{ scaleY: 0, transformOrigin: "top" }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {timeline.map((item) => (
                <div key={item.year} className="mb-4 sm:mb-6 md:mb-8 flex items-center">
                  {/* Dot with immediate scale animation */}
                  <motion.div
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-400 rounded-full z-10 absolute left-1 sm:left-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                      delay: timeline.indexOf(item) * 0.2,
                    }}
                    whileHover={{ scale: 1.25 }}
                  />
                  {/* Text with immediate fade-in animation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                      delay: timeline.indexOf(item) * 0.2 + 0.1,
                    }}
                    className="ml-8 sm:ml-10"
                  >
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white">
                      {item.year}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm md:text-base">
                      {item.event}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Facts Slider */}
          <div className="md:w-1/2 bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg flex flex-col items-center">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4 md:mb-6">
              Fun Facts
            </h3>
            <div className="w-full max-w-xs sm:max-w-sm flex-grow">
              <Slider {...sliderSettings} className="w-full">
                {funFacts.map((fact, index) => (
                  <div key={index} className="p-2 sm:p-4 text-center">
                    <img
                      src={fact.image}
                      alt={fact.alt}
                      className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg mb-3 sm:mb-4"
                    />
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                      {fact.text}
                    </p>
                  </div>
                ))}
              </Slider>
            </div>
            {/* Resume Button at the Bottom with Extra Margin */}
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              role="button"
              aria-label="View Evan Meehan's resume"
              className="mt-8 sm:mt-10 md:mt-12 inline-block bg-pink-400 text-gray-900 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm md:text-base hover:bg-pink-500 transition-colors duration-300"
            >
              View My Resume
            </a>
          </div>
        </div>

        {/* Journey to Web Development */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg mb-8 sm:mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 text-center"
          >
            My Journey to Web Development
          </motion.h3>
          <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base leading-relaxed">
            My journey into tech began in 2022 when I started experimenting with HTML and CSS for fun, building small personal projects that sparked my curiosity. I was hooked by the ability to create interactive web pages from scratch, which led me to dive deeper into JavaScript and explore frameworks like React.js over the next year.
          </p>
          <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base leading-relaxed">
            In 2023, I briefly explored nursing but quickly realized my true passion lay in technology. I doubled down on self learning, and dabbled in game development with Godot. I created a 2D pixel platforming game called "My Life As A Coder", which landed me the Diversity Advocate Scholarship with Coder Academy. In 2024, I enrolled at Coder Academy to formalise my skills in full-stack web development, where I’ve been honing my craft to build clean, responsive, and user-focused applications.
          </p>
        </div>

        {/* What Sets Me Apart */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg mb-8 sm:mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 text-center"
          >
            What Sets Me Apart
          </motion.h3>
          <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base leading-relaxed">
            I approach coding with a strong focus on problem solving, breaking down complex challenges into manageable pieces to find the best solutions. I prioritise writing accessible and inclusive code, ensuring that my work is usable by everyone, regardless of their background or abilities. I'm passionate about using my skills to support and uplift the LGBTQ+ community, constantly seeking opportunities to make a positive impact through technology.
          </p>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg mb-8 sm:mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 text-center"
          >
            Let's Connect
          </motion.h3>
          <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base leading-relaxed text-center">
            If you're looking for a web developer to help bring your ideas to life, feel free to reach out. I'm always open to new opportunities and collaborations, and I'd love to work together to create something great.
          </p>
          <div className="flex justify-center">
            <Link
              to="/contact"
              className="inline-block bg-pink-400 text-gray-900 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm md:text-base hover:bg-pink-500 transition-colors duration-300"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>

      {/* Custom CSS for Slick Slider Dots */}
      <style jsx global>{`
        .custom-dots li button:before {
          color: #f472b6 !important; /* Pink-400 */
          font-size: 10px !important;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .custom-dots li.slick-active button:before {
          color: #f9a8d4 !important; /* Pink-300 */
          transform: scale(1.3);
        }

        .custom-dots li:hover button:before {
          transform: scale(1.2);
        }
        @media (min-width: 640px) {
          .custom-dots li button:before {
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
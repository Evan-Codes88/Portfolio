// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const timeline = [
    { year: "2018", event: "Started coding in Orange" },
    { year: "2020", event: "Moved to Gold Coast" },
    { year: "2022", event: "Worked at SeaWorld" },
    { year: "2024", event: "Became a Full Stack Developer" },
  ];

  const funFacts = [
    "I have a goofy dog named Cruella 🐶",
    "My favorite game is Undertale 🖤",
    "I work at Popperz Nightclub on weekends 🎉",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section id="about" className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-pink-400 text-center mb-12"
        >
          About Me
        </motion.h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-white mb-4">My Journey</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 w-1 bg-purple-400 h-full"></div>
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="mb-8 flex items-center"
                >
                  <div className="w-8 h-8 bg-pink-400 rounded-full z-10"></div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-white">{item.year}</h4>
                    <p className="text-gray-400">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold text-white mb-4">Fun Facts</h3>
            <Slider {...sliderSettings} className="max-w-md mx-auto">
              {funFacts.map((fact, index) => (
                <div key={index} className="p-4">
                  <p className="text-gray-300 text-center">{fact}</p>
                </div>
              ))}
            </Slider>
            <a
              href="/assets/resume.pdf"
              download
              className="mt-6 inline-block bg-pink-400 text-gray-900 px-4 py-2 rounded hover:bg-pink-500"
            >
              View My Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import the photo of your dog
import doggo from "../assets/doggo.png";

// Import placeholder images for the slider
import cruellaSlider from "../assets/cruellaSlider.JPG";
import undertaleSlider from "../assets/undertale.jpg";
import popperzSlider from "../assets/popperz.png";

const About = () => {
  const timeline = [
    { year: "2019", event: "Graduated Highschool and moved to Queensland" },
    { year: "2022", event: "Moved out of home" },
    { year: "2023", event: "Worked as an attraction attendant at SeaWorld" },
    { year: "2024", event: "Became a Full Stack Developer" },
    { year: "2025", event: "Graduating as a Full Stack Developer" },
  ];

  const funFacts = [
    { text: "I have a goofy dog named Cruella 🐶", image: cruellaSlider },
    { text: "My favorite game is Undertale 🖤", image: undertaleSlider },
    { text: "I work at Popperz Nightclub on weekends 🎉", image: popperzSlider },
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
    <section id="about" className="pt-16 sm:pt-20 md:pt-24 py-8 sm:py-12 md:py-16 bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-400 text-center mb-8 sm:mb-10 md:mb-12"
        >
          About Me
        </motion.h2>

        {/* Timeline and Fun Facts Section */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {/* Timeline */}
          <div className="md:w-1/2 bg-gray-900 rounded-lg p-4 sm:p-6 shadow-lg">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4 md:mb-6">
              My Journey
            </h3>
            <div className="relative pl-8 sm:pl-10">
              {/* Timeline line with animation */}
              <motion.div
                className="absolute left-4 sm:left-6 top-0 w-1 bg-purple-400 h-full"
                initial={{ scaleY: 0, transformOrigin: "top" }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.9 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              {timeline.map((item, index) => (
                <div key={index} className="mb-4 sm:mb-6 md:mb-8 flex items-center">
                  {/* Dot with scale animation */}
                  <motion.div
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-400 rounded-full z-10 absolute left-1 sm:left-2"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.9 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                    whileHover={{ scale: 1.25 }}
                  />
                  {/* Text with fade-in animation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.9 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                      delay: index * 0.2 + 0.1,
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
          <div className="md:w-1/2 bg-gray-900 rounded-lg p-4 sm:p-6 shadow-lg flex flex-col items-center">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4 md:mb-6">
              Fun Facts
            </h3>
            <div className="w-full max-w-xs sm:max-w-sm flex-grow">
              <Slider {...sliderSettings} className="w-full">
                {funFacts.map((fact, index) => (
                  <div key={index} className="p-2 sm:p-4 text-center">
                    <img
                      src={fact.image}
                      alt={fact.text}
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
              href="/assets/resume.pdf"
              download
              className="mt-8 sm:mt-10 md:mt-12 inline-block bg-pink-400 text-gray-900 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm md:text-base hover:bg-pink-500 transition-colors duration-300"
            >
              View My Resume
            </a>
          </div>
        </div>

        {/* More About Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 rounded-lg p-4 sm:p-6 shadow-lg"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 sm:mb-4 md:mb-6 text-center">
            A Little More About Me
          </h3>
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-center">
            {/* Text Details */}
            <div className="md:w-2/3">
              <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base leading-relaxed">
                I’m a passionate gamer at heart. Nothing beats a good gaming session to unwind! Some of my all-time favorite games include{" "}
                <span className="text-pink-400 font-semibold">Undertale</span>{" "}
                (the story and music are just unbeatable),{" "}
                <span className="text-pink-400 font-semibold">Stardew Valley</span>{" "}
                for those cozy farming vibes, and{" "}
                <span className="text-pink-400 font-semibold">Hollow Knight</span>{" "}
                for its challenging gameplay and stunning art.
              </p>
              <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base leading-relaxed">
                I also love to draw, especially pixel art! Creating vibrant, retro-style pieces is one of my favorite ways to express my creativity. Whether I’m sketching characters or designing game-inspired art, I find so much joy in bringing my ideas to life on the canvas.
              </p>
              <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base leading-relaxed">
                My weekends at Popperz Nightclub let me embrace my vibrant, outgoing side. I love the energy of the nightlife and connecting with my community in such a lively atmosphere. I’m also just as happy spending a cozy night in with my partner, a good game, or cuddling with my goofy dog, Cruella.
              </p>
            </div>
            {/* Photo of Cruella */}
            <div className="md:w-1/3 flex flex-col items-center">
              <img
                src={doggo}
                alt="My dog Cruella"
                className="w-40 sm:w-48 md:w-64 lg:w-full h-auto rounded-lg shadow-lg object-cover"
              />
              <p className="text-gray-400 text-center mt-2 sm:mt-3 text-xs sm:text-sm md:text-base">
                Meet Cruella, my goofy best friend! 🐶
              </p>
            </div>
          </div>
        </motion.div>
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
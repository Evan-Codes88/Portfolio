import { useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Home = () => {
  useEffect(() => {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    const starDensity = 0.0001; // Stars per pixel
    const minStars = 100;
    const maxStars = 1000;
    const baseWidth = 1920; // Reference width for scaling
    const numStars = Math.min(
      maxStars,
      Math.max(minStars, Math.floor(window.innerWidth * window.innerHeight * starDensity))
    );

    const stars = Array.from({ length: numStars }, () => {
      const scale = window.innerWidth / baseWidth;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: (Math.random() * 1.5 + 0.5) * scale,
        speed: (Math.random() * 0.5 + 0.1) * scale,
      };
    });

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        star.y += star.speed;
        if (star.y > window.innerHeight) {
          star.y = 0;
          star.x = Math.random() * window.innerWidth;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-purple-900"
    >
      {/* Starfield background */}
      <canvas
        id="starfield"
        className="absolute top-0 left-0 w-full h-full z-0"
      ></canvas>

      {/* Foreground content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center relative z-10 px-4 sm:px-6 lg:px-8"
      >
        <img
          src={logo}
          alt="Logo"
          className="w-32 sm:w-48 md:w-64 lg:w-80 mx-auto mb-8 sm:mb-10"
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
          Hi, I'm <span className="text-pink-400">Evan Meehan</span>
        </h1>
        <span className="text-lg sm:text-xl md:text-2xl text-purple-300 block mb-3 sm:mb-4">
          <TypeAnimation
            sequence={[
              "Full Stack Web Developer",
              1000,
              "Diversity Scholarship Recipient",
              1000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </span>

        {/* Static "More About Me!" text */}
        <p className="text-pink-400 text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
          My life's a series of commits – see the 'About' page for the full commit log!
        </p>

        {/* Commit Button */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-center"
        >
          <Link
            to="/about"
            className="mt-4 sm:mt-6 inline-block bg-pink-400 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-pink-500 transition transform hover:scale-110"
          >
            Open My Commit Log
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
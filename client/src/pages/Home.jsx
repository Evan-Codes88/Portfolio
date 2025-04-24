import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Home = () => {
  const [isSecretMode, setIsSecretMode] = useState(false);

  const toggleSecretMode = () => {
    setIsSecretMode(!isSecretMode);
    if (!isSecretMode) {
      window.location.href = "/art";
    }
  };

  useEffect(() => {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
    }));

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
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
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${
        isSecretMode
          ? "bg-gradient-to-b from-green-900 to-neon-green-900"
          : "bg-gradient-to-b from-gray-900 to-purple-900"
      }`}
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
        className="max-w-3xl mx-auto text-center relative z-10 px-4 sm:px-6"
      >
        <img
          src={logo}
          alt="Logo"
          className="w-40 sm:w-60 md:w-80 mx-auto mb-10"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Hi, I'm{" "}
          <span
            className={`cursor-pointer transition-colors duration-300 ${
              isSecretMode ? "text-neon-green-400" : "text-pink-400"
            }`}
            onClick={toggleSecretMode}
          >
            Evan Meehan
          </span>
        </h1>
        <span className="text-xl md:text-2xl text-purple-300 block mb-4">
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
        <p className="text-pink-400 text-lg md:text-xl mb-4">
          My life's a series of commits – see the 'About' page for the full commit log!
        </p>

        {/* README Button */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-center"
        >
          <Link
            to="/about"
            className="mt-6 inline-block bg-pink-400 text-white font-semibold py-2 px-6 rounded-lg hover:bg-pink-500 transition transform hover:scale-110"
          >
            Open My Commit Log
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;

"use client";
import { motion } from "framer-motion";
import { FaGraduationCap, FaSchool, FaUniversity } from "react-icons/fa";
import Particles from "react-tsparticles";
import { tsParticles } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import { useEffect, useRef } from "react";

const educationData = [
  {
    year: "2020",
    title: "School - CBSE (10th)",
    institution: "Infant Jesus International School",
    description:
      "Secured 76% with distinction. Active in sports and extracurricular activities.",
    icon: <FaSchool className="text-white text-xl" />,
  },
  {
    year: "2022",
    title: "Intermediate - MPC (12th)",
    institution: "Sri Vaishanavi Junior College",
    description: "Scored 89%.",
    icon: <FaGraduationCap className="text-white text-xl" />,
  },
  {
    year: "2022-2026 (Pursuing)",
    title: "Bachelor of Engineering - IT",
    institution: "Chaitanya Bharathi Institute of Technology",
    description:
      "Currently in 4th year. Worked on multiple AIML & Web Dev projects. CGPA: 8.85 .",
    icon: <FaUniversity className="text-white text-xl" />,
  },
];

function FluidText({ text }) {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const handleMove = (e) => {
      const { clientX, clientY } = e;
      const bounds = textElement.getBoundingClientRect();
      const x = clientX - bounds.left;
      const y = clientY - bounds.top;
      textElement.style.setProperty('--x', `${x}px`);
      textElement.style.setProperty('--y', `${y}px`);
    };

    textElement.addEventListener('mousemove', handleMove);
    return () => textElement.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div
      ref={textRef}
      className="text-4xl md:text-6xl font-bold relative p-2 select-none transition-all duration-300"
      style={{ color: 'white' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      onMouseEnter={() => {
        textRef.current.style.color = 'transparent';
        textRef.current.style.WebkitTextStroke = '1px white';
        textRef.current.style.background = `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.25) 0%, transparent 60%)`;
        textRef.current.style.WebkitBackgroundClip = 'text';
      }}
      onMouseLeave={() => {
        textRef.current.style.color = 'white';
        textRef.current.style.WebkitTextStroke = '0px transparent';
        textRef.current.style.background = 'none';
        textRef.current.style.WebkitBackgroundClip = 'unset';
      }}
    >
      {text}
    </motion.div>
  );
}


export default function EducationSection() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <section
      id="education"
      className="relative min-h-screen w-full bg-black overflow-hidden"
    >
      {/* 🌌 Fullscreen Black Hole Background */}
      <img
        src="/black_hole.png"
        alt="Black Hole"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0"
      />

      {/* ✨ Particles */}
      <Particles
        id="tsparticles-education"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 100 },
            color: { value: "#ffffff" },
            size: { value: 1 },
            move: { enable: true, speed: 0.3 },
            opacity: { value: 0.4 },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-10"
      />

      {/* 📚 Main Content */}
      <div className="relative z-20 px-6 py-20 max-w-6xl mx-auto">
        <motion.h2
          className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FluidText text="Education" />
        </motion.h2>

        <div className="flex flex-col gap-20 items-center justify-center">
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="bg-[#111] p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_40px_#6366f1aa] w-3xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full shadow-lg ring-2 ring-white/10">
                  {item.icon}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {item.year}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">{item.title}</h3>
              <h4 className="text-blue-400 font-semibold mb-2">
                {item.institution}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

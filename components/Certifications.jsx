"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const certificates = [
  {
    title: "CodeSprint",
    image: "/codesprint.png",
    description: "Completed industrial training and internship in MERN with Codesprint.",
    color: "from-cyan-400 to-blue-600"
  },
  {
    title: "Bytexl",
    image: "/bytexl.png",
    description: "Completed internship with Bytexl on DSA and Web Development with Python.",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Microsoft Azure",
    image: "/azure.jpg",
    description: "Achieved the Microsoft Certified: Azure AI Fundamentals credential, demonstrating foundational knowledge of AI concepts and Microsoft Azure services.",
    color: "from-green-400 to-cyan-500"
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

// Moving stars background for this section only
function MovingStars() {
  const starsRef = useRef(null);

  useEffect(() => {
    const starsContainer = starsRef.current;
    if (!starsContainer) return;

    // Create stars
    const createStars = () => {
      const stars = [];
      for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'absolute bg-white rounded-full opacity-60';
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;
        starsContainer.appendChild(star);
        stars.push(star);
      }
      return stars;
    };

    const stars = createStars();

    // Add CSS animation for twinkling
    const style = document.createElement('style');
    style.textContent = `
      @keyframes twinkle {
        0% { opacity: 0.3; transform: scale(1); }
        100% { opacity: 0.9; transform: scale(1.2); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      stars.forEach(star => star.remove());
      style.remove();
    };
  }, []);

  return (
    <div 
      ref={starsRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
}

// Certificate card component with enhanced animations
function CertificateCard({ certificate, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 10,
        rotateX: 5
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative cursor-pointer perspective-1000 h-80"
    >
      {/* Neon glow background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${certificate.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500`} />
      
      {/* Secondary glow for neon effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${certificate.color} rounded-2xl blur-md opacity-10 group-hover:opacity-30 transition-opacity duration-500`} />
      
      {/* Main card */}
      <div className="relative bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 group-hover:border-white/40 transition-all duration-500 transform-gpu h-full flex flex-col">
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Title with glow effect */}
          <motion.h3 
            className="text-xl font-bold text-white mb-4 text-center"
            animate={isHovered ? { 
              textShadow: "0 0 20px rgba(255,255,255,0.8)",
              scale: 1.05
            } : {
              textShadow: "0 0 0px rgba(255,255,255,0)",
              scale: 1
            }}
            transition={{ duration: 0.3 }}
          >
            {certificate.title}
          </motion.h3>

          {/* Certificate image with hover effect */}
          <div className="relative mb-4 overflow-hidden rounded-xl flex-shrink-0">
            <motion.img
              src={certificate.image}
              alt={certificate.title}
              className="w-full h-32 object-contain bg-black/20 rounded-xl"
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={isHovered ? { x: ["0%", "100%"] } : { x: "-100%" }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 flex-grow">
            {certificate.description}
          </p>
        </div>

        {/* Floating particles inside card */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: isHovered ? [0, 0.6, 0] : 0,
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Main component
export default function Certifications() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Moving stars background */}
      <MovingStars />

      {/* Main content */}
      <div className="relative z-20 container mx-auto px-6 py-20 flex flex-col items-center justify-center gap-20">
        {/* Title */}
        <div className="text-center mb-18">
          <FluidText text="Certifications" />
        </div>

        {/* Certificates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={index}
              certificate={certificate}
              index={index}
              onClick={() => setSelectedCertificate(certificate)}
            />
          ))}
        </div>
      </div>

      {/* Modal for enlarged certificate */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-white/20"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl z-10 hover:scale-110 transition-transform"
              >
                ×
              </button>

              {/* Certificate image */}
              <div className="relative">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
                />
                
                {/* Glow effect around image */}
                <div className={`absolute inset-0 bg-gradient-to-r ${selectedCertificate.color} rounded-xl blur-xl opacity-20 -z-10`} />
              </div>

              {/* Certificate info */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedCertificate.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {selectedCertificate.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
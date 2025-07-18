'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Project data
const projects = [
  {
    title: 'Password Manager',
    description: 'Secure password vault using MERN stack.',
    image: '/passwrd.jpg',
    link: 'https://github.com/Vijju-15/passwordmanager',
    details: {
      technologies: 'React.js, Express.js, MongoDB, Node.js',
      purpose: 'To securely manage and store user passwords with encryption.',
      features: 'User authentication, encryption, UI/UX single-page app.',
    },
  },
  {
    title: 'Queens Coffee',
    description: 'Billing and customer insights for coffee shop.',
    image: '/coffee.jpeg',
    link: 'https://github.com/Vijju-15/Queens_coffee',
    details: {
      technologies: 'React, Node.js, Express, MongoDB',
      purpose: 'Manage daily sales, generate bills, analyze profit trends.',
      features: 'Customer DB, receipt generation, monthly insights.',
    },
  },
  {
    title: 'Potato Disease Finder',
    description: 'AI model for disease detection in potato leaves.',
    image: '/leaf.png',
    link: 'https://github.com/Vijju-15/Potato_disease_predition',
    details: {
      technologies: 'CNN, FastAPI, React, TensorFlow',
      purpose: 'To automate disease diagnosis in potato farming.',
      features: 'Image upload, live prediction, API integration.',
    },
  },
  {
    title: 'Cold Mail Generator',
    description: 'Generate B2B cold mails using GenAI stack.',
    image: '/coldmail.png',
    link: 'https://github.com/Vijju-15/Cold-Mail-Generator',
    details: {
      technologies: 'LLaMA 3, ChromaDB, LangChain, Streamlit',
      purpose: 'Auto-generate custom cold mails for B2B sales.',
      features: 'Semantic search, email preview, company context.',
    },
  },
  {
    title: 'AI Retail Analytics',
    description: 'Real-time dashboard for retail stores.',
    image: '/store.png',
    link: 'https://github.com/Vijju-15/AI-Retail-Management-System',
    details: {
      technologies: 'Next.js, FastAPI, Kafka, MongoDB, Docker',
      purpose: 'Optimize pricing and predict sales across multiple shops.',
      features: 'Sales forecasting, customer segmentation, pricing AI.',
    },
  },
  {
    title: 'SkinAI (Ongoing)',
    description: 'AI-powered dermatologist for skin care.',
    image: '/skin.png',
    link: '#',
    details: {
      technologies: 'Computer Vision, Deep Learning, React Native',
      purpose: 'Scan skin and recommend treatment and routines.',
      features: 'Facial scanning, product suggestion, diet planning.',
    },
  },
];

const ProjectCard = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative min-w-[240px] sm:min-w-[260px] md:min-w-[280px] lg:min-w-[320px] h-[320px] sm:h-[360px] md:h-[400px] cursor-pointer flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
    >
      <div className="card-hover-effect">
        <div className="card-content">
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 240px, (max-width: 768px) 260px, (max-width: 1024px) 280px, 320px"
              className="object-cover transition-all duration-500"
              priority={false}
            />
          </div>

          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-black/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base lg:text-lg shadow-lg z-10">
            {project.title}
          </div>

          <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl transition-all duration-500 flex items-center justify-center p-4 sm:p-6 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center text-white">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{project.title}</h3>
              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed mb-3">{project.description}</p>
              <div className="text-xs text-blue-300">Click for details</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const scrollContainerRef = useRef(null);

  const scrollLeft = useCallback(() => {
    scrollContainerRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  }, []);

  const scrollRight = useCallback(() => {
    scrollContainerRef.current?.scrollBy({ left: 320, behavior: 'smooth' });
  }, []);

  const handleProjectClick = useCallback((project) => {
    setActiveProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setActiveProject(null);
  }, []);

  return (
    <section id="projects" className="relative w-full min-h-screen bg-black text-white overflow-hidden">

      {/* Full-Screen Responsive Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/approaching_stars.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Projects
        </h2>

        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Featured Work</h3>

        <div className="flex justify-center gap-4 mb-6">
          <button onClick={scrollLeft} className="p-3 rounded-full bg-blue-600/30 border border-blue-400/30 hover:scale-110 transition">
            <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={scrollRight} className="p-3 rounded-full bg-blue-600/30 border border-blue-400/30 hover:scale-110 transition">
            <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth px-2 scrollbar-hide"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} onClick={handleProjectClick} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-700/50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-xs sm:max-w-lg md:max-w-2xl w-full mx-4 relative backdrop-blur-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl hover:scale-110 transition-all duration-200" onClick={closeModal}>
                ×
              </button>
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {activeProject.title}
                </h3>
                <div className="grid gap-3 sm:gap-4">
                  <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700/30">
                    <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-2">Technologies Used</h4>
                    <p className="text-sm sm:text-base text-gray-300">{activeProject.details.technologies}</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700/30">
                    <h4 className="text-base sm:text-lg font-semibold text-green-300 mb-2">Purpose</h4>
                    <p className="text-sm sm:text-base text-gray-300">{activeProject.details.purpose}</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-700/30">
                    <h4 className="text-base sm:text-lg font-semibold text-purple-300 mb-2">Key Features</h4>
                    <p className="text-sm sm:text-base text-gray-300">{activeProject.details.features}</p>
                  </div>
                </div>
                {activeProject.link !== '#' && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

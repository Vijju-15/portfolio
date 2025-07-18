'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import EducationSection from '@/components/EducationSection';
import dynamic from 'next/dynamic';

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const Certifications = dynamic(() => import('@/components/Certifications'), {
    ssr: false,
  });

  const About = dynamic(() => import('@/components/About'), {
    ssr: false,
  });

  const handleCloseModal = () => {
    setActiveProject(null);
  };

  // Fixed backdrop click handler
  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const projects = [
    {
      title: 'Password Manager',
      description: 'Lightweight browser-based vault for securely storing credentials — no backend required.',
      image: '/passwrd.jpg',
      link: 'https://github.com/Vijju-15/passwordmanager',
      details: {
        technologies: 'React.js, LocalStorage, HTML, CSS, JavaScript',
        purpose: 'This project is a single-page password manager that securely stores credentials directly in the browser using LocalStorage. It allows users to add, edit, and delete website credentials without needing a backend or database.',
        features: 'Password visibility toggle, clipboard copy, CRUD for credentials, responsive gradient UI.',
        projectImages: ['/pass1.jpg', '/pass2.jpg']
      }
    },
    {
      title: 'Queens Coffee',
      description: 'A coffee shop management system to streamline billing, inventory, and profits.',
      image: '/coffee.jpeg',
      link: 'https://github.com/Vijju-15/Queens_coffee',
      details: {
        technologies: 'MERN Stack (MongoDB, Express, React, Node.js)',
        purpose: 'Built for small-scale cafes, this system handles menu inventory, order processing, and real-time billing. It also provides sales analytics for tracking profits and customer activity.',
        features: 'Order management, bill generation, inventory CRUD, sales analytics, secure login.',
        projectImages: ['/coffee1.jpg', '/coffee2.jpg']
      }
    },
    {
      title: 'Potato Disease Finder',
      description: 'AI-powered disease detection system for potato leaves using deep learning.',
      image: '/leaf.png',
      link: 'https://github.com/Vijju-15/Potato_disease_predition',
      details: {
        technologies: 'CNN, TensorFlow, FastAPI, React.js',
        purpose: 'This project uses a Convolutional Neural Network to detect diseases in potato leaves. It helps farmers get instant diagnosis through image upload and prediction via an API-integrated React frontend.',
        features: 'CNN model inference, live prediction via FastAPI, React frontend for image upload.',
        projectImages: ['/scarlet1.png', '/scarlet2.png']
      }
    },
    {
      title: 'Cold Mail Generator',
      description: 'Full-stack GenAI tool that automates personalized B2B cold emails.',
      image: '/coldmail.png',
      link: 'https://github.com/Vijju-15/Cold-Mail-Generator',
      details: {
        technologies: 'LLaMA 3, ChromaDB, LangChain, Streamlit',
        purpose: 'Generates context-aware cold emails for B2B sales outreach. It retrieves relevant company data using semantic search, integrates with LLaMA 3 for generation, and offers real-time previews through Streamlit.',
        features: 'Company-specific email generation, semantic search, instant preview UI, modular architecture.',
        projectImages: ['/coldmail1.jpg', '/coldmail-preview.jpg']
      }
    },
    {
      title: 'AI Retail Analytics',
      description: 'Mini project that optimizes store operations with real-time AI — including sales forecasting, dynamic pricing, and customer segmentation.',
      image: '/store.png',
      link: 'https://github.com/Vijju-15/AI-Retail-Management-System',
      details: {
        technologies: 'Next.js, FastAPI, Kafka, MongoDB, Docker',
        purpose: 'This project enables retail stores to make smarter business decisions using real-time data and AI. It forecasts product demand using Facebook Prophet, adjusts pricing dynamically with XGBoost, and segments customers using K-Means clustering. The system streams live sales and inventory data through Kafka, processes it with FastAPI, and displays actionable insights on an interactive Next.js dashboard. This helps store owners prevent stockouts, maximize revenue, and personalize customer engagement — all in real time.',
        features: 'Sales forecasting with Prophet, dynamic pricing via XGBoost, customer segmentation using K-Means, real-time Kafka pipeline.',
        projectImages: ['/project1-demo.png', '/project1-dashboard.png']
      }
    },
    {
      title: 'SkinAI (Ongoing)',
      description: 'AI-powered dermatologist that recommends skincare products and routines.',
      image: '/skin.png',
      link: '#',
      details: {
        technologies: 'Computer Vision, Deep Learning, Transformers, MongoDB',
        purpose: 'SkinAI scans facial skin issues like acne or pigmentation using deep learning, matches them with appropriate chemical treatments using rule-based logic and NLP models, and suggests real products. It also generates a personalized routine using generative AI.',
        features: 'Facial skin detection, chemical match recommendations, product linking, AI routine generation.',
        projectImages: ['/skin1.jpg', '/skin2.jpg']
      }
    }
  ];

  const [mounted, setMounted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll scroll-smooth custom-scrollbar">

      <Navbar isScrolling={isScrolling} setIsScrolling={setIsScrolling} />

      {/* HOME SECTION */}
      <section id="home" className="relative snap-start min-h-screen flex items-center justify-center bg-black overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
          <source src="/Outer_space.mp4" type="video/mp4" />
        </video>

        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: 'transparent' },
            fpsLimit: 60,
            fullScreen: false,
            particles: {
              number: { value: 120 },
              color: { value: '#ffffff' },
              size: { value: 1 },
              move: { enable: true, speed: 0.3 },
              opacity: { value: 0.6 },
            },
          }}
          className="absolute top-0 left-0 w-full h-full z-10"
        />

        <div className="relative z-20 flex flex-col items-center justify-center h-screen text-center">
          <FluidText text="Hello, I'm" />
          <FluidText text="Pavan Raj Kamal" />
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative snap-start min-h-screen overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
          <source src="/approaching_stars.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            <FluidText text="Projects" />
          </h2>

          {/* Scroll Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => document.getElementById('scroll-projects')?.scrollBy({ left: -320, behavior: 'smooth' })}
              className="bg-blue-600/40 hover:bg-transparent backdrop-blur-md border border-blue-400 text-white p-3 rounded-full transition hover:scale-110 shadow-lg"
            >
              ←
            </button>
            <button
              onClick={() => document.getElementById('scroll-projects')?.scrollBy({ left: 320, behavior: 'smooth' })}
              className="bg-blue-600/40 hover:bg-transparent backdrop-blur-md border border-blue-400 text-white p-3 rounded-full transition hover:scale-110 shadow-lg"
            >
              →
            </button>
          </div>

          {/* Card Scroll Container */}
          <div
            id="scroll-projects"
            className="flex gap-14 overflow-x-auto scrollbar-hide p-12"
          >

            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => setActiveProject(project)}
                className="relative min-w-[360px] max-w-[420px] h-[400px] cursor-pointer group"
              >
                {/* Glowing Edge Wrapper */}
                <div className="relative w-full h-full rounded-[20px] p-[2px] bg-black group-hover:scale-105 transition-transform duration-300">
                  {/* Glow Layer */}
                  <div className="absolute inset-[-4px] rounded-[24px] z-0 blur-xl opacity-50 bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 group-hover:opacity-80 transition-all duration-300 pointer-events-none"></div>

                  {/* Card Inner */}
                  <div className="relative w-full h-full bg-black rounded-[18px] overflow-hidden z-10 border border-white/10">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                    <div className="absolute top-3 left-3 bg-black/70 px-3 py-1.5 rounded-md text-sm font-semibold z-10 text-white">
                      {project.title}
                    </div>
                    <div className="absolute inset-0 bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center p-4">
                      <div>
                        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                        <p className="text-sm text-gray-200">{project.description}</p>
                        <div className="text-blue-400 text-xs mt-2">Click for details</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>

          {/* Fixed Modal */}
          <AnimatePresence>
            {activeProject && (
              <motion.div
                className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[9999] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleBackdropClick}
              >
                <motion.div
                  className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto"
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 50 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Main Modal Container */}
                  <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_0_100px_rgba(139,69,255,0.4),0_0_200px_rgba(6,182,212,0.2)] border border-purple-400/30 overflow-hidden">
                    {/* Enhanced neon glow border */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-cyan-500/40 opacity-60 animate-pulse"></div>
                    <div className="absolute inset-[2px] rounded-3xl bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl"></div>

                    {/* Ambient Glow Effects */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse delay-700"></div>
                    <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

                    {/* Fixed Close Button - Updated z-index */}
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-6 right-6 z-[10000] w-12 h-12 rounded-full bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 text-red-400 hover:text-red-300 transition-all duration-300 flex items-center justify-center text-xl font-bold hover:scale-110 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                    >
                      ×
                    </button>

                    {/* Content Container */}
                    <div className="relative z-20 space-y-8">
                      {/* Header */}
                      <div className="text-center space-y-4">
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h2 className="text-5xl font-extrabold font-sans bg-gradient-to-r from-purple-400 via-gray-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] tracking-wide leading-tight pb-2">
                            {activeProject.title}
                          </h2>
                        </motion.div>
                      </div>

                      {/* Project Images Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      >
                        {activeProject.details.projectImages?.map((imagePath, index) => (
                          <div
                            key={index}
                            className="relative group overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-purple-500/30 p-4 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-slate-900/80 rounded-xl p-4 border border-purple-400/20">
                              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border border-purple-500/30">
                                <div className="text-center space-y-3">
                                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500/30 to-cyan-500/30 rounded-full flex items-center justify-center border border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                                    <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  </div>
                                  <p className="text-sm font-semibold text-purple-300">Project Demo {index + 1}</p>
                                  <p className="text-xs text-slate-400">Image: {imagePath}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                          {/* Technologies */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="relative group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-slate-800/70 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 shadow-lg hover:border-pink-400/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all duration-300">
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                  </svg>
                                </div>
                                <h4 className="text-xl font-bold text-purple-300 tracking-wide">Technologies Used</h4>
                              </div>
                              <p className="text-slate-200 leading-relaxed font-medium">{activeProject.details.technologies}</p>
                            </div>
                          </motion.div>

                          {/* Features */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="relative group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-slate-800/70 backdrop-blur-sm border border-pink-500/30 rounded-2xl p-6 shadow-lg hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300">
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                  </svg>
                                </div>
                                <h4 className="text-xl font-bold text-pink-300 tracking-wide">Key Features</h4>
                              </div>
                              <p className="text-slate-200 leading-relaxed font-medium">{activeProject.details.features}</p>
                            </div>
                          </motion.div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          {/* Purpose */}
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="relative group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative bg-slate-800/70 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6 shadow-lg hover:border-teal-400/50 hover:shadow-[0_0_25px_rgba(20,184,166,0.3)] transition-all duration-300">
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <h4 className="text-xl font-bold text-emerald-300 tracking-wide">Purpose & Vision</h4>
                              </div>
                              <p className="text-slate-200 leading-relaxed font-medium">{activeProject.details.purpose}</p>
                            </div>
                          </motion.div>
                        </div>
                      </div>

                      {/* GitHub Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex justify-center pt-6"
                      >
                        <a
                          href={activeProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 border border-cyan-400/40 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:scale-105 hover:border-cyan-300/60"
                        >
                          {/* Button glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Button content */}
                          <div className="relative flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-white font-bold text-lg tracking-wide">View on GitHub</span>
                          </div>
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>


      {/* EDUCATION SECTION */}
      <section id="education" className="bg-gradient-to-b from-[#1e1b4b] via-[#111827] to-black w-full relative snap-start min-h-screen flex items-center justify-center bg-black">
        <EducationSection />
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="relative snap-start min-h-screen flex items-center justify-center bg-black">
        {/* Background Image */}
        <img src='/stars.jpg' className="absolute top-0 left-0 w-full h-full object-cover z-0" alt="Stars background" />

        {/* Particle Animation */}
        <Particles
          id="tsparticles-skills"
          init={particlesInit}
          options={{
            background: { color: 'transparent' },
            fpsLimit: 60,
            fullScreen: false,
            particles: {
              number: { value: 120 },
              color: { value: '#ffffff' },
              size: { value: 1 },
              move: { enable: true, speed: 0.3 },
              opacity: { value: 0.6 },
            },
          }}
          className="absolute top-0 left-0 w-full h-full z-10"
        />
        <div className="title m-4 p-2 text-center relative z-20">
          <FluidText text="Skills" />
        </div>
        {/* Skills Button Grid */}
        <div className="relative z-20 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 p-6">
          {[
            { src: "/html.png", alt: "HTML" },
            { src: "/css.png", alt: "CSS" },
            { src: "/js.png", alt: "JavaScript" },
            { src: "/java.png", alt: "Java" },
            { src: "/py.png", alt: "Python" },
            { src: "/react.png", alt: "React.js" },
            { src: "/node.png", alt: "Node.js" },
            { src: "/expressjs.png", alt: "Express.js" },
            { src: "/mongodb.png", alt: "MongoDB" },
            { src: "/kafka.png", alt: "Kafka" },
            { src: "/fast.png", alt: "FastAPI" },
            { src: "/nextjs.png", alt: "Next.js" },
            { src: "/machine.png", alt: "Machine Learning" },
            { src: "/deep.png", alt: "Deep Learning" },
            { src: "/opencv.png", alt: "OpenCV" },
          ].map((skill, index) => (
            <div key={index} className="relative flex flex-col items-center justify-center ">
              <button type="button" className="btn">
                <img src={skill.src} alt={skill.alt} className="icon" />

                <div id="container-stars">
                  <div id="stars"></div>
                </div>

                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </button>
              <div className='text-center text-blue-500'><FluidTextother text={skill.alt} /></div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative snap-start min-h-screen flex items-center justify-center bg-black">
        <About />
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" className="relative snap-start min-h-screen flex items-center justify-center bg-black">
        <Certifications />
      </section>
    </div>
  );
}

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

function FluidTextother({ text }) {
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
      className="text-lg md:text-xl font-bold relative p-2 select-none transition-all duration-300"
      style={{ color: 'aquamarine' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      onMouseEnter={() => {
        textRef.current.style.color = 'transparent';
        textRef.current.style.WebkitTextStroke = '1px aquamarine';
        textRef.current.style.background = `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.25) 0%, transparent 60%)`;
        textRef.current.style.WebkitBackgroundClip = 'text';
      }}
      onMouseLeave={() => {
        textRef.current.style.color = 'aquamarine';
        textRef.current.style.WebkitTextStroke = '0px transparent';
        textRef.current.style.background = 'none';
        textRef.current.style.WebkitBackgroundClip = 'unset';
      }}
    >
      {text}
    </motion.div>
  );
}
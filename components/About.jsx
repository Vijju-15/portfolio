import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github,
  Linkedin,
  Phone,
  Download,
  Rocket,
  Star,
  Sparkles,
} from "lucide-react";
import styled from "styled-components";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

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
      textElement.style.setProperty("--x", `${x}px`);
      textElement.style.setProperty("--y", `${y}px`);
    };

    textElement.addEventListener("mousemove", handleMove);
    return () => textElement.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.div
      ref={textRef}
      className="text-4xl md:text-6xl font-bold relative p-2 select-none transition-all duration-300"
      style={{ color: "white" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      onMouseEnter={() => {
        textRef.current.style.color = "transparent";
        textRef.current.style.WebkitTextStroke = "1px white";
        textRef.current.style.background = `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.25) 0%, transparent 60%)`;
        textRef.current.style.WebkitBackgroundClip = "text";
      }}
      onMouseLeave={() => {
        textRef.current.style.color = "white";
        textRef.current.style.WebkitTextStroke = "0px transparent";
        textRef.current.style.background = "none";
        textRef.current.style.WebkitBackgroundClip = "unset";
      }}
    >
      {text}
    </motion.div>
  );
}

// Move SpaceToast outside and memoize it properly
const SpaceToast = React.memo(({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 transform transition-all duration-500 ease-out ${
        isVisible
          ? "translate-x-0 opacity-100 scale-100"
          : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <div className="bg-gradient-to-r from-cyan-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-xl border border-cyan-400/50 rounded-2xl p-4 shadow-2xl shadow-cyan-500/25 min-w-[280px]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <Check className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Success!</p>
            <p className="text-cyan-200 text-xs">{message}</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-purple-600/10 rounded-2xl"></div>
      </div>
    </div>
  );
});

// Memoize Tooltip component
const Tooltip = React.memo(() => {
  const StyledWrapper = styled.div`
    ul {
      list-style: none;
    }

    .example-2 {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .example-2 .icon-content {
      margin: 0 10px;
      position: relative;
    }
    .example-2 .icon-content .tooltip {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      padding: 6px 10px;
      border-radius: 5px;
      opacity: 0;
      visibility: hidden;
      font-size: 14px;
      transition: all 0.3s ease;
    }
    .example-2 .icon-content:hover .tooltip {
      opacity: 1;
      visibility: visible;
      top: -50px;
    }
    .example-2 .icon-content a {
      position: relative;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      color: #4d4d4d;
      background-color: #fff;
      transition: all 0.3s ease-in-out;
    }
    .example-2 .icon-content a:hover {
      box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
    }
    .example-2 .icon-content a svg {
      position: relative;
      z-index: 1;
      width: 30px;
      height: 30px;
    }
    .example-2 .icon-content a:hover {
      color: white;
    }
    .example-2 .icon-content a .filled {
      position: absolute;
      top: auto;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
      background-color: #000;
      transition: all 0.3s ease-in-out;
    }
    .example-2 .icon-content a:hover .filled {
      height: 100%;
    }

    .example-2 .icon-content a[data-social="instagram"] .filled,
    .example-2 .icon-content a[data-social="instagram"] ~ .tooltip {
      background: linear-gradient(
        45deg,
        #405de6,
        #5b51db,
        #b33ab4,
        #c135b4,
        #e1306c,
        #fd1f1f
      );
    }
  `;

  return (
    <StyledWrapper>
      <ul className="example-2">
        <li className="icon-content">
          <a
            data-social="instagram"
            aria-label="Instagram"
            href="https://www.instagram.com/"
          >
            <div className="filled" />
            <svg
              xmlSpace="preserve"
              viewBox="0 0 16 16"
              className="bi bi-instagram"
              fill="currentColor"
              height={16}
              width={16}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
              />
            </svg>
          </a>
          <div className="tooltip">Instagram</div>
        </li>
      </ul>
    </StyledWrapper>
  );
});

// Memoize ProfileCard component
const ProfileCard = React.memo(() => {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900/40 via-blue-900/30 to-purple-900/40 backdrop-blur-xl border border-cyan-400/30 rounded-3xl p-8 shadow-2xl shadow-cyan-500/20">
        {/* ✨ Stars background layer inside card */}
        <div
          className="absolute inset-0 z-0 star-background pointer-events-none"
          aria-hidden="true"
        >
          <div className="star-layer"></div>
        </div>

        {/* Card content */}
        <div className="relative z-10">
          <div className="text-center mb-6">
            <div className="relative w-56 h-56 mx-auto mb-4">
              <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-2 border border-cyan-400/20 rounded-full animate-spin-reverse"></div>
              <div className="absolute inset-3 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-xl shadow-purple-500/50">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-gray-800 rounded-full flex items-center justify-center border-2 border-purple-400/50 overflow-hidden">
                  <img src="/pavan.png" alt="Pavan Vijju" />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">Pavan</h3>
            <p className="text-cyan-400 text-sm font-medium">
              Full Stack Developer
            </p>
          </div>

          <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50">
            <div className="flex items-center gap-5">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">P</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">@pavan_vijju15</p>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs">Online</span>
                </div>
              </div>
            </div>
            <Tooltip />
          </div>
        </div>
      </div>

      {/* Scoped styles for stars background */}
      <style>
        {`
      .star-background {
        position: absolute;
        overflow: hidden;
        filter: blur(0.5px);
      }

      .star-layer {
        position: relative;
        width: 300%;
        height: 300%;
      }

      .star-layer::before,
      .star-layer::after {
        content: "";
        position: absolute;
        width: 200%;
        height: 200%;
        background-image: radial-gradient(#ffffff 1px, transparent 1%);
        background-size: 50px 50px;
      }

      .star-layer::before {
        animation: moveStars 90s linear infinite;
        opacity: 0.5;
      }

      .star-layer::after {
        animation: rotateStars 60s linear infinite;
      }

      @keyframes moveStars {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(-100%);
        }
      }

      @keyframes rotateStars {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      `}
      </style>
    </div>
  );
});

// Memoize RocketReveal component with proper dependencies
const RocketReveal = React.memo(({ children, delay = 0, isVisible }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setRevealed(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div className="relative overflow-hidden">
      <div
        className={`transform transition-all duration-1000 ease-out ${
          revealed ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        {children}
      </div>
      {!revealed && (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 animate-pulse">
          <Rocket className="w-6 h-6 text-purple-400 rotate-90" />
        </div>
      )}
    </div>
  );
});

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const sectionRef = useRef(null);
  const observerRef = useRef(null);

  // Memoize the copy function to prevent re-renders
  const copyToClipboard = useCallback(async (text, successMessage) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage(successMessage);
      setToastVisible(true);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setToastMessage(successMessage);
      setToastVisible(true);
    }
  }, []);

  // Memoize the close function
  const handleToastClose = useCallback(() => {
    setToastVisible(false);
  }, []);

  // Separate the intersection observer logic to prevent re-initialization
  useEffect(() => {
    if (observerRef.current) return; // Prevent creating multiple observers

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Stagger animations
          setTimeout(() => setAnimationStage(1), 500);
          setTimeout(() => setAnimationStage(2), 1000);
          setTimeout(() => setAnimationStage(3), 1500);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []); // Empty dependency array to run only once

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-black"
      style={{
        backgroundImage: `url("/stars1.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Toast component - moved to top level */}
      <SpaceToast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={handleToastClose}
      />

      {/* Main container */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Section Title */}
        <div className="text-center mb-16">
          <FluidText text="About Me" />
          <div className="mt-4 w-32 h-1 bg-gradient-to-r from-gray-700 via-purple-200 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        {/* Three Panel Cards - Vertical Layout */}
        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          {/* Panel 1: Profile & Introduction */}
          <div
            className={`relative bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-10 transform transition-all duration-1000 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 ${
              animationStage >= 1
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-cyan-600/5 rounded-3xl"></div>

            <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
              {/* Profile Card */}
              <div className="flex-shrink-0">
                <ProfileCard />
              </div>

              {/* Introduction Content */}
              <div className="flex-1 text-center lg:text-left">
                <RocketReveal delay={1000} isVisible={isVisible}>
                  <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6 mb-6">
                    <h3 className="text-3xl font-bold text-white mb-2 flex items-center justify-center lg:justify-start gap-2">
                      <Sparkles className="w-7 h-7 text-yellow-400" />
                      Hey, I'm Pavan
                      <Sparkles className="w-7 h-7 text-yellow-400" />
                    </h3>
                  </div>
                </RocketReveal>

                <RocketReveal delay={1500} isVisible={isVisible}>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    I'm an AI-driven software engineer with expertise in
                    building intelligent, scalable, and user-centric
                    applications. My work spans real-time backend systems,
                    responsive frontends, and data-driven AI models. I
                    specialize in technologies like React.js, Next.js, Node.js,
                    FastAPI, Kafka, and MongoDB to develop end-to-end systems
                    that are both performant and intuitive.
                    <br />
                    <br />I actively work with machine learning, deep learning,
                    and computer vision using frameworks like TensorFlow and
                    OpenCV, and I'm currently expanding into Generative AI and
                    LLM-based solutions. Passionate about bridging the gap
                    between engineering and innovation, I build solutions that
                    are as impactful as they are elegant.
                  </p>
                </RocketReveal>
              </div>
            </div>
          </div>

          {/* Panel 2: Motivation & Drive */}
          <div
            className={`relative bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-10 transform transition-all duration-1000 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/25 ${
              animationStage >= 2
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-pink-600/5 rounded-3xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/50">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Motivation & Drive
                </h3>
              </div>

              <RocketReveal delay={2000} isVisible={isVisible}>
                <div className="grid md:grid-cols-3 gap-6 text-gray-300">
                  <div className="bg-blue-900/20 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-6 hover:border-blue-400/40 transition-all duration-300">
                    <div className="text-4xl mb-4">🚀</div>
                    <h4 className="text-xl font-bold text-blue-400 mb-3">
                      Innovation
                    </h4>
                    <p>
                      The thrill of creating something that never existed before
                      drives my passion for technology and pushes me to explore
                      new frontiers.
                    </p>
                  </div>
                  <div className="bg-purple-900/20 backdrop-blur-sm border border-purple-400/20 rounded-2xl p-6 hover:border-purple-400/40 transition-all duration-300">
                    <div className="text-4xl mb-4">⭐</div>
                    <h4 className="text-xl font-bold text-purple-400 mb-3">
                      Growth
                    </h4>
                    <p>
                      Every challenge is an opportunity to level up my skills
                      and push beyond my comfort zone into uncharted
                      territories.
                    </p>
                  </div>
                  <div className="bg-cyan-900/20 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300">
                    <div className="text-4xl mb-4">🌟</div>
                    <h4 className="text-xl font-bold text-cyan-400 mb-3">
                      Impact
                    </h4>
                    <p>
                      Building solutions that make a real difference in people's
                      lives fuels my determination to create meaningful
                      technology.
                    </p>
                  </div>
                </div>
              </RocketReveal>
            </div>
          </div>

          {/* Panel 3: Contact Info - Fixed width consistency */}
          <div
            className={`relative bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-cyan-500/30 rounded-3xl p-10 transform transition-all duration-1000 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/25 ${
              animationStage >= 3
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 to-purple-600/5 rounded-3xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/50">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Let's Connect
                </h3>
              </div>

              {/* Fixed grid to ensure equal widths */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RocketReveal delay={2500} isVisible={isVisible}>
                  <a
                    href="https://www.linkedin.com/in/pavan-raj-kamal-vijju15/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-2xl hover:from-blue-500/30 hover:to-blue-400/30 transition-all duration-300 border border-blue-400/20 hover:border-blue-400/40 group text-center h-full"
                  >
                    <Linkedin className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="text-white group-hover:text-blue-300 font-semibold mb-1">
                        LinkedIn
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Professional Network
                      </p>
                    </div>
                  </a>
                </RocketReveal>

                <RocketReveal delay={2700} isVisible={isVisible}>
                  <a
                    href="https://github.com/Vijju-15"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-2xl hover:from-purple-500/30 hover:to-purple-400/30 transition-all duration-300 border border-purple-400/20 hover:border-purple-400/40 group text-center h-full"
                  >
                    <Github className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="text-white group-hover:text-purple-300 font-semibold mb-1">
                        GitHub
                      </h4>
                      <p className="text-gray-400 text-sm">Code Repository</p>
                    </div>
                  </a>
                </RocketReveal>

                <RocketReveal delay={2900} isVisible={isVisible}>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        "8522824042",
                        "Phone number copied to clipboard!"
                      )
                    }
                    className="flex flex-col items-center gap-4 p-6 bg-gradient-to-r from-cyan-600/20 to-cyan-500/20 rounded-2xl hover:from-cyan-500/30 hover:to-cyan-400/30 transition-all duration-300 border border-cyan-400/20 hover:border-cyan-400/40 group text-center cursor-pointer h-full w-full"
                  >
                    <Phone className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <h4 className="text-white group-hover:text-cyan-300 font-semibold mb-1">
                        Phone
                      </h4>
                      <p className="text-gray-400 text-sm">8522824042</p>
                    </div>
                  </button>
                </RocketReveal>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Download Button */}
        <div className="text-center mt-16">
          <RocketReveal delay={3200} isVisible={isVisible}>
            <a 
              href="/VijjuResume.pdf" 
              download="VijjuResume.pdf"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-600 via-gray-900 to-white rounded-full text-white font-semibold text-lg shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-gray-900 to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Download className="w-6 h-6 relative z-10 group-hover:animate-bounce" />
              <span className="relative z-10">Download Resume</span>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </a>
          </RocketReveal>
        </div>

        {/* Background gradient effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default About;

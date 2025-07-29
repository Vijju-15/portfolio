"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

// FluidText component for interactive text effects
function FluidText({ text, className = "" }) {
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
      className={`font-bold text-lg relative select-none transition-all duration-300 ${className}`}
      style={{ color: "white" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      onMouseEnter={() => {
        if (textRef.current) {
          textRef.current.style.color = "transparent";
          textRef.current.style.WebkitTextStroke = "1px white";
          textRef.current.style.background = `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(6,182,212,0.8) 0%, rgba(139,69,19,0.6) 30%, transparent 70%)`;
          textRef.current.style.WebkitBackgroundClip = "text";
        }
      }}
      onMouseLeave={() => {
        if (textRef.current) {
          textRef.current.style.color = "white";
          textRef.current.style.WebkitTextStroke = "0px transparent";
          textRef.current.style.background = "none";
          textRef.current.style.WebkitBackgroundClip = "unset";
        }
      }}
    >
      {text}
    </motion.div>
  );
}

const navItems = [
  { name: "Home", id: "home" },
  { name: "Projects", id: "projects" },
  { name: "Education", id: "education" },
  { name: "Skills", id: "skills" },
  { name: "About Me", id: "about" },
  { name: "Certifications", id: "certifications" },
];

export default function Navbar({ isScrolling, setIsScrolling }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef(null);

  const handleNavClick = (id) => {
    const sec = document.getElementById(id);
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
    if (setIsScrolling) {
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 150);
    }
  }, [setIsScrolling]);

  const handleIntersection = useCallback((entries) => {
    let maxRatio = 0, visible = null;
    entries.forEach(e => {
      if (e.isIntersecting && e.intersectionRatio > maxRatio) {
        maxRatio = e.intersectionRatio;
        visible = e.target.id;
      }
    });
    if (visible && maxRatio > 0.3) setActiveSection(visible);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.3, 0.7],
    });
    navItems.forEach(item => {
      const sec = document.getElementById(item.id);
      if (sec) observerRef.current.observe(sec);
    });
    return () => observerRef.current?.disconnect();
  }, [handleIntersection]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Add keyframes to document head once
  useEffect(() => {
    const styleId = 'navbar-keyframes';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes galaxy-shift {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes neonPulse {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(6, 182, 212, 0.5),
                        0 0 10px rgba(6, 182, 212, 0.3),
                        0 0 15px rgba(6, 182, 212, 0.2);
          }
          50% { 
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.8),
                        0 0 20px rgba(6, 182, 212, 0.5),
                        0 0 30px rgba(6, 182, 212, 0.3);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .mobile-menu-enter {
          animation: slideDown 0.3s ease-out;
        }
        
        .neon-border {
          animation: neonPulse 2s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const NavButton = ({ name, id, isActive, isHovered, shouldShowHover, onClick, className = "" }) => (
    <button
      onClick={onClick}
      className={`px-2 sm:px-3 md:px-4 py-2 rounded-md text-white font-medium transition-all duration-200 relative overflow-hidden text-sm sm:text-base ${className}`}
      style={{
        backgroundImage: isActive
          ? "linear-gradient(135deg, #3a0ca3, #4361ee, #4cc9f0, #b5179e)"
          : shouldShowHover
          ? "linear-gradient(135deg, rgba(58,12,163,0.3), rgba(67,97,238,0.3))"
          : "none",
        backgroundColor: "transparent",
        backgroundSize: isActive ? "400% 400%" : "100% 100%",
        animation: isActive ? "galaxy-shift 6s ease infinite" : "none",
        boxShadow: isActive
          ? "0 0 10px rgba(76,201,240,0.8), 0 0 20px rgba(181,23,158,0.6), inset 0 0 15px rgba(67,97,238,0.4)"
          : shouldShowHover
          ? "0 0 15px rgba(76,201,240,0.5), 0 0 30px rgba(67,97,238,0.3)"
          : "none",
        border: isActive
          ? "1px solid rgba(76,201,240,0.5)"
          : shouldShowHover
          ? "1px solid rgba(67,97,238,0.4)"
          : "1px solid transparent",
        color: "#fff",
        textShadow: "none",
        textRendering: "geometricPrecision",
        WebkitFontSmoothing: "antialiased",
      }}
      onMouseEnter={() => setHoveredItem(id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      {name}
    </button>
  );

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.6)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
        padding: "12px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-center gap-1">
          {navItems.map(({ name, id }) => {
            const isActive = activeSection === id;
            const isHovered = hoveredItem === id;
            const shouldShowHover = isHovered && !isActive;
            
            return (
              <NavButton
                key={id}
                name={name}
                id={id}
                isActive={isActive}
                isHovered={isHovered}
                shouldShowHover={shouldShowHover}
                onClick={() => handleNavClick(id)}
              />
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex justify-between items-center">
          {/* Logo or Brand */}
          <FluidText text="Pavan's Portfolio" />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative text-white p-3 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 transition-all duration-300 border border-gray-600/30 hover:border-cyan-400/50 backdrop-blur-sm group"
            aria-label="Toggle mobile menu"
            style={{
              boxShadow: mobileMenuOpen ? "0 0 20px rgba(6, 182, 212, 0.4)" : "none"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
            <div className="relative z-10">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mobile-menu-container mobile-menu-enter">
            <div 
              className="relative bg-gradient-to-br from-gray-900/95 via-blue-900/90 to-purple-900/95 backdrop-blur-xl border-2 border-cyan-400/30 rounded-2xl mx-4 mt-2 p-6 shadow-2xl overflow-hidden"
              style={{
                boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.8), 0 0 30px rgba(6, 182, 212, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              }}
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 animate-pulse"></div>
              
              {/* Metallic shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
              
              {/* Neon border glow */}
              <div className="absolute inset-0 rounded-2xl border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]"></div>
              
              <div className="relative z-10 flex flex-col space-y-3">
                {navItems.map(({ name, id }) => {
                  const isActive = activeSection === id;
                  const isHovered = hoveredItem === id;
                  const shouldShowHover = isHovered && !isActive;
                  
                  return (
                    <div key={id} className="relative group">
                      {/* Button glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                      
                      <NavButton
                        name={name}
                        id={id}
                        isActive={isActive}
                        isHovered={isHovered}
                        shouldShowHover={shouldShowHover}
                        onClick={() => handleNavClick(id)}
                        className="relative w-full justify-center py-4 text-base font-semibold bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-cyan-900/50 hover:to-purple-900/50 border border-gray-600/30 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                      />
                      
                      {/* Additional neon accent */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  );
                })}
              </div>
              
              {/* Floating particles effect */}
              <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
              <div className="absolute top-4 right-6 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-3 left-8 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-6 right-3 w-1 h-1 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        )}

        {/* Tablet Navigation */}
        <div className="hidden md:flex lg:hidden justify-center">
          <div className="flex flex-wrap justify-center gap-1 max-w-2xl">
            {navItems.map(({ name, id }) => {
              const isActive = activeSection === id;
              const isHovered = hoveredItem === id;
              const shouldShowHover = isHovered && !isActive;
              
              return (
                <NavButton
                  key={id}
                  name={name}
                  id={id}
                  isActive={isActive}
                  isHovered={isHovered}
                  shouldShowHover={shouldShowHover}
                  onClick={() => handleNavClick(id)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
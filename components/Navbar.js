"use client";

import { useEffect, useState, useRef, useCallback } from "react";

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
  const observerRef = useRef(null);

  const handleNavClick = (id) => {
    const sec = document.getElementById(id);
    if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
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
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.6)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
        padding: "16px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-center gap-1 relative">
        {navItems.map(({ name, id }) => {
          const isActive = activeSection === id;
          const isHovered = hoveredItem === id;
          const shouldShowHover = isHovered && !isActive;
          
          return (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="px-4 py-2 rounded-md text-white font-medium transition-all duration-200 relative overflow-hidden"
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
        })}
      </div>
    </nav>
  );
}
// Responsive utility functions for portfolio project
import { useState, useEffect } from 'react';

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Responsive classes generator
export const getResponsiveClasses = (baseClasses, responsiveConfig) => {
  let classes = baseClasses;
  
  Object.entries(responsiveConfig).forEach(([breakpoint, additionalClasses]) => {
    if (breakpoint === 'base') {
      classes += ` ${additionalClasses}`;
    } else {
      classes += ` ${breakpoint}:${additionalClasses}`;
    }
  });
  
  return classes;
};

// Common responsive configurations
export const responsiveConfigs = {
  // Text size configurations
  textSizes: {
    title: {
      base: 'text-2xl',
      sm: 'sm:text-3xl',
      md: 'md:text-4xl',
      lg: 'lg:text-5xl',
      xl: 'xl:text-6xl'
    },
    subtitle: {
      base: 'text-lg',
      sm: 'sm:text-xl',
      md: 'md:text-2xl',
      lg: 'lg:text-3xl'
    },
    body: {
      base: 'text-sm',
      sm: 'sm:text-base',
      lg: 'lg:text-lg'
    },
    caption: {
      base: 'text-xs',
      sm: 'sm:text-sm'
    }
  },
  
  // Spacing configurations
  spacing: {
    section: {
      base: 'py-12 px-4',
      sm: 'sm:py-16 sm:px-6',
      lg: 'lg:py-20 lg:px-8'
    },
    card: {
      base: 'p-4',
      sm: 'sm:p-6',
      lg: 'lg:p-8'
    },
    gap: {
      small: {
        base: 'gap-4',
        sm: 'sm:gap-6',
        lg: 'lg:gap-8'
      },
      medium: {
        base: 'gap-6',
        sm: 'sm:gap-8',
        lg: 'lg:gap-12'
      },
      large: {
        base: 'gap-8',
        sm: 'sm:gap-12',
        lg: 'lg:gap-16'
      }
    }
  },
  
  // Grid configurations
  grids: {
    auto: {
      base: 'grid grid-cols-1',
      sm: 'sm:grid-cols-2',
      md: 'md:grid-cols-3',
      lg: 'lg:grid-cols-4'
    },
    projects: {
      base: 'grid grid-cols-1',
      md: 'md:grid-cols-2',
      xl: 'xl:grid-cols-3'
    },
    skills: {
      base: 'grid grid-cols-2',
      sm: 'sm:grid-cols-3',
      md: 'md:grid-cols-4',
      lg: 'lg:grid-cols-5'
    },
    contact: {
      base: 'grid grid-cols-1',
      sm: 'sm:grid-cols-2',
      lg: 'lg:grid-cols-3'
    }
  },
  
  // Layout configurations
  layout: {
    container: {
      base: 'max-w-7xl mx-auto px-4',
      sm: 'sm:px-6',
      lg: 'lg:px-8'
    },
    section: {
      base: 'min-h-screen flex flex-col justify-center',
      sm: 'sm:min-h-screen',
      lg: 'lg:min-h-screen'
    }
  }
};

// Hook for responsive design
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState('xs');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width >= breakpoints['2xl']) {
        setScreenSize('2xl');
        setIsDesktop(true);
        setIsTablet(false);
        setIsMobile(false);
      } else if (width >= breakpoints.xl) {
        setScreenSize('xl');
        setIsDesktop(true);
        setIsTablet(false);
        setIsMobile(false);
      } else if (width >= breakpoints.lg) {
        setScreenSize('lg');
        setIsDesktop(true);
        setIsTablet(false);
        setIsMobile(false);
      } else if (width >= breakpoints.md) {
        setScreenSize('md');
        setIsDesktop(false);
        setIsTablet(true);
        setIsMobile(false);
      } else if (width >= breakpoints.sm) {
        setScreenSize('sm');
        setIsDesktop(false);
        setIsTablet(true);
        setIsMobile(false);
      } else {
        setScreenSize('xs');
        setIsDesktop(false);
        setIsTablet(false);
        setIsMobile(true);
      }
    };

    // Initial check
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    screenSize,
    isMobile,
    isTablet,
    isDesktop,
    breakpoints
  };
};

// Responsive image sizes generator
export const generateImageSizes = (config = {}) => {
  const defaultConfig = {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw'
  };
  
  const finalConfig = { ...defaultConfig, ...config };
  
  return `(max-width: 768px) ${finalConfig.mobile}, (max-width: 1024px) ${finalConfig.tablet}, ${finalConfig.desktop}`;
};

// Responsive font size calculator
export const getResponsiveFontSize = (baseSize, scaleFactor = 1.2) => {
  return {
    xs: `${baseSize}rem`,
    sm: `${baseSize * scaleFactor}rem`,
    md: `${baseSize * Math.pow(scaleFactor, 2)}rem`,
    lg: `${baseSize * Math.pow(scaleFactor, 3)}rem`,
    xl: `${baseSize * Math.pow(scaleFactor, 4)}rem`
  };
};

// Responsive spacing calculator
export const getResponsiveSpacing = (baseSpacing) => {
  return {
    xs: `${baseSpacing * 0.75}rem`,
    sm: `${baseSpacing}rem`,
    md: `${baseSpacing * 1.25}rem`,
    lg: `${baseSpacing * 1.5}rem`,
    xl: `${baseSpacing * 2}rem`
  };
};

// Media query helpers
export const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
  
  // Max width queries
  maxSm: `@media (max-width: ${breakpoints.sm - 1}px)`,
  maxMd: `@media (max-width: ${breakpoints.md - 1}px)`,
  maxLg: `@media (max-width: ${breakpoints.lg - 1}px)`,
  maxXl: `@media (max-width: ${breakpoints.xl - 1}px)`,
  
  // Custom queries
  mobile: `@media (max-width: 767px)`,
  tablet: `@media (min-width: 768px) and (max-width: 1023px)`,
  desktop: `@media (min-width: 1024px)`,
  
  // Feature queries
  hover: '@media (hover: hover)',
  noHover: '@media (hover: none)',
  retina: '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'
};

// Animation configurations for different screen sizes
export const responsiveAnimations = {
  mobile: {
    duration: '0.2s',
    easing: 'ease-out',
    scale: 0.98
  },
  tablet: {
    duration: '0.3s',
    easing: 'ease-out',
    scale: 0.97
  },
  desktop: {
    duration: '0.4s',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    scale: 0.95
  }
};

const responsiveUtils = {
  breakpoints,
  getResponsiveClasses,
  responsiveConfigs,
  useResponsive,
  generateImageSizes,
  getResponsiveFontSize,
  getResponsiveSpacing,
  mediaQueries,
  responsiveAnimations
};

export default responsiveUtils;

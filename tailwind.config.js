/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      // Enhanced spacing scale for better responsive design
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Responsive font sizes
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      
      // Enhanced animations
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-reverse': 'spin 2s linear infinite reverse',
        'pulse-slow': 'pulse 4s infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      // Enhanced colors for dark mode
      colors: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      
      // Responsive container sizes
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      
      // Enhanced backdrop blur
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },
    },
  },
  plugins: [
    // Add custom utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Responsive text utilities
        '.text-responsive-xs': {
          fontSize: theme('fontSize.xs[0]'),
          lineHeight: theme('fontSize.xs[1].lineHeight'),
          '@screen sm': {
            fontSize: theme('fontSize.sm[0]'),
            lineHeight: theme('fontSize.sm[1].lineHeight'),
          },
        },
        '.text-responsive-sm': {
          fontSize: theme('fontSize.sm[0]'),
          lineHeight: theme('fontSize.sm[1].lineHeight'),
          '@screen sm': {
            fontSize: theme('fontSize.base[0]'),
            lineHeight: theme('fontSize.base[1].lineHeight'),
          },
          '@screen lg': {
            fontSize: theme('fontSize.lg[0]'),
            lineHeight: theme('fontSize.lg[1].lineHeight'),
          },
        },
        '.text-responsive-base': {
          fontSize: theme('fontSize.base[0]'),
          lineHeight: theme('fontSize.base[1].lineHeight'),
          '@screen sm': {
            fontSize: theme('fontSize.lg[0]'),
            lineHeight: theme('fontSize.lg[1].lineHeight'),
          },
          '@screen lg': {
            fontSize: theme('fontSize.xl[0]'),
            lineHeight: theme('fontSize.xl[1].lineHeight'),
          },
        },
        
        // Touch-friendly interactive elements
        '.touch-target': {
          minHeight: '44px',
          minWidth: '44px',
        },
        
        // Responsive padding utilities
        '.p-responsive': {
          padding: theme('spacing.4'),
          '@screen sm': {
            padding: theme('spacing.6'),
          },
          '@screen lg': {
            padding: theme('spacing.8'),
          },
        },
        
        // Responsive margin utilities
        '.m-responsive': {
          margin: theme('spacing.4'),
          '@screen sm': {
            margin: theme('spacing.6'),
          },
          '@screen lg': {
            margin: theme('spacing.8'),
          },
        },
        
        // Responsive gap utilities
        '.gap-responsive': {
          gap: theme('spacing.4'),
          '@screen sm': {
            gap: theme('spacing.6'),
          },
          '@screen lg': {
            gap: theme('spacing.8'),
          },
        },
        
        // Safe area utilities for mobile
        '.safe-top': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.safe-bottom': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.safe-left': {
          paddingLeft: 'env(safe-area-inset-left)',
        },
        '.safe-right': {
          paddingRight: 'env(safe-area-inset-right)',
        },
        
        // Scrollbar utilities
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar': {
            width: '4px',
            height: '4px',
          },
        },
      };
      
      addUtilities(newUtilities);
    },
  ],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Sử dụng class-based dark mode thay vì dựa vào prefers-color-scheme
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          background: '#f8fafc',
          text: '#0f172a',
          primary: '#3b82f6',
          secondary: '#6366f1',
          accent: '#ec4899',
          card: 'rgba(255, 255, 255, 0.8)',
          border: 'rgba(30, 41, 59, 0.2)'
        },
        // Dark mode colors
        dark: {
          background: '#000000',
          text: '#f8fafc',
          primary: '#60a5fa',
          secondary: '#818cf8',
          accent: '#f472b6',
          card: 'rgba(30, 41, 59, 0.6)',
          border: 'rgba(255, 255, 255, 0.15)'
        }
      },
      backdropBlur: {
        'xl': '20px',
        '2xl': '25px',
        '3xl': '30px',
      }
    },
  },
  plugins: [],
} 
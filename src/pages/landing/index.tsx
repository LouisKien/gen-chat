import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

// Mảng các màu và kích thước quả cầu
const orbColors = [
  "bg-purple-600/40 dark:bg-purple-600/30",
  "bg-blue-500/40 dark:bg-blue-500/30",
  "bg-pink-500/30 dark:bg-pink-500/20",
  "bg-teal-500/30 dark:bg-teal-500/20",
  "bg-indigo-500/30 dark:bg-indigo-500/20",
  "bg-amber-500/30 dark:bg-amber-500/20",
  "bg-emerald-500/30 dark:bg-emerald-500/20",
  "bg-rose-500/30 dark:bg-rose-500/20"
];

const orbSizes = [270, 300, 320, 350, 380, 400];

// Component quả cầu màu với vị trí ngẫu nhiên
const GradientOrb = ({ id, onComplete }: { id: number, onComplete: (id: number) => void }) => {
  const [position] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100
  });
  
  const [size] = useState(orbSizes[Math.floor(Math.random() * orbSizes.length)]);
  const [color] = useState(orbColors[Math.floor(Math.random() * orbColors.length)]);
  const [duration] = useState(Math.floor(Math.random() * 5) + 5); // 5-10 giây
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete(id);
    }, duration * 1000);
    
    return () => clearTimeout(timeout);
  }, [id, duration, onComplete]);
  
  return (
    <motion.div
      key={id}
      className={`fixed rounded-full ${color} hue-animate`}
      style={{ 
        width: `${size}px`,
        height: `${size}px`,
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        pointerEvents: 'none'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      exit={{ opacity: 0 }}
      transition={{ 
        opacity: { duration: 2 },
        ease: "easeInOut"
      }}
    />
  );
};

// Quản lý các quả cầu màu
const OrbsManager = () => {
  const [orbs, setOrbs] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const nextId = useRef(8);
  
  const handleOrbComplete = (id: number) => {
    setOrbs(prev => {
      const newOrbs = prev.filter(orbId => orbId !== id);
      newOrbs.push(nextId.current);
      nextId.current += 1;
      return newOrbs;
    });
  };
  
  return (
    <>
      <AnimatePresence>
        {orbs.map(id => (
          <GradientOrb key={id} id={id} onComplete={handleOrbComplete} />
        ))}
      </AnimatePresence>
    </>
  );
};

function Landing() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  // Use theme in a way to prevent unused variable warning
  useEffect(() => {
    // This effect depends on theme to prevent the unused variable warning
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[rgb(var(--background))]">      
      {/* Controls at top */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      
      {/* Gradient Orbs - Random positions with fade animations */}
      <OrbsManager />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center min-h-[80vh]"
        >
          {/* Glassmorphism Hero Card */}
          <div className="glass-effect p-6 sm:p-8 md:p-12 rounded-3xl shadow-lg max-w-3xl w-full">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-4 sm:mb-6 text-center"
            >
              {t('app.title')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg sm:text-xl text-[rgb(var(--text))]/90 text-center mb-6 sm:mb-8"
            >
              {t('app.description')}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8"
            >
              <Link to="/chat" className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:opacity-90 transition-all text-center">
                {t('buttons.start')}
              </Link>
              <a 
                href="https://github.com/LouisKien/gen-chat" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 sm:px-8 py-3 glass-effect text-[rgb(var(--text))] font-medium rounded-full border hover:bg-[rgb(var(--background))]/20 transition-all text-center"
              >
                {t('buttons.learnMore')}
              </a>
            </motion.div>
          </div>
          
          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16"
          >
            {/* Feature 1 */}
            <div className="glass-effect p-5 sm:p-6 rounded-2xl hover:bg-[rgb(var(--background))]/10 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[rgb(var(--text))] mb-2">{t('features.chat.title')}</h3>
              <p className="text-sm sm:text-base text-[rgb(var(--text))]/80">{t('features.chat.description')}</p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-effect p-5 sm:p-6 rounded-2xl hover:bg-[rgb(var(--background))]/10 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-pink-400 to-red-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[rgb(var(--text))] mb-2">{t('features.language.title')}</h3>
              <p className="text-sm sm:text-base text-[rgb(var(--text))]/80">{t('features.language.description')}</p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-effect p-5 sm:p-6 rounded-2xl hover:bg-[rgb(var(--background))]/10 transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-tr from-green-400 to-teal-500 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[rgb(var(--text))] mb-2">{t('features.privacy.title')}</h3>
              <p className="text-sm sm:text-base text-[rgb(var(--text))]/80">{t('features.privacy.description')}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Landing; 
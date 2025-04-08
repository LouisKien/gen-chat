import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { Link } from 'react-router-dom';

function Landing() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[rgb(var(--background))]">      
      {/* Controls at top */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
      
      {/* Gradient Orbs - Different opacity/colors based on theme */}
      <div className="absolute w-64 h-64 rounded-full bg-purple-600/30 dark:bg-purple-600/20 blur-3xl -top-10 -left-10"></div>
      <div className="absolute w-72 h-72 rounded-full bg-blue-500/30 dark:bg-blue-500/20 blur-3xl -bottom-20 -right-10"></div>
      <div className="absolute w-80 h-80 rounded-full bg-pink-500/20 dark:bg-pink-500/10 blur-3xl top-1/3 left-1/4"></div>
      
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
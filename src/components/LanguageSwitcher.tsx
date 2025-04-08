import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center justify-center w-full h-full font-semibold text-xs"
      title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
      aria-label={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
    >
      {language === 'vi' ? (
        <span className="font-medium">EN</span>
      ) : (
        <span className="font-medium">VN</span>
      )}
    </button>
  );
}; 
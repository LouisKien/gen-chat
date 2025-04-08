import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Language, translations, detectBrowserLanguage } from '../i18n';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Context mặc định
const defaultLanguageContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
};

// Tạo context
const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

// Custom hook để sử dụng context
export const useLanguage = () => useContext(LanguageContext);

// Hàm để lấy giá trị từ nested object bằng path string (ví dụ: "app.title")
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
};

// Hàm để lấy ngôn ngữ từ localStorage hoặc phát hiện từ trình duyệt
const getInitialLanguage = (): Language => {
  // Trước tiên kiểm tra localStorage
  const savedLanguage = localStorage.getItem('language') as Language | null;
  if (savedLanguage && (savedLanguage === 'vi' || savedLanguage === 'en')) {
    return savedLanguage;
  }
  
  // Nếu không có trong localStorage, phát hiện từ trình duyệt
  return detectBrowserLanguage();
};

type LanguageProviderProps = {
  children: ReactNode;
};

// Provider component
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Sử dụng ngôn ngữ từ localStorage hoặc trình duyệt làm mặc định
  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  // Lưu lựa chọn ngôn ngữ vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Hàm dịch
  const translate = (key: string): string => {
    const translationObj = translations[language];
    const value = getNestedValue(translationObj, key);
    
    if (!value) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}; 
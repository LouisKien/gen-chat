import { en } from './en';
import { vi } from './vi';

export type TranslationKey = keyof typeof en;

export const translations = {
  en,
  vi,
};

export type Language = keyof typeof translations;

// Phát hiện ngôn ngữ của trình duyệt
export const detectBrowserLanguage = (): Language => {
  const userLang = navigator.language.toLowerCase().split('-')[0];
  
  // Chỉ hỗ trợ vi và en, mặc định là en cho các ngôn ngữ khác
  return userLang === 'vi' ? 'vi' : 'en';
}; 
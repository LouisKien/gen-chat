import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const defaultThemeContext: ThemeContextType = {
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Kiểm tra preference của người dùng từ localStorage, hoặc system preference
  const detectDefaultTheme = (): Theme => {
    // Lấy class từ HTML element (đã được set bởi script trong index.html)
    if (document.documentElement.classList.contains('dark')) {
      return 'dark';
    } else if (document.documentElement.classList.contains('light')) {
      return 'light';
    }
    
    // Fallback: Kiểm tra localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      return savedTheme;
    }
    
    // Fallback cuối cùng: Kiểm tra system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(detectDefaultTheme());
  const [isInitialized, setIsInitialized] = useState(false);

  // Cập nhật classes cho body khi theme thay đổi
  useEffect(() => {
    const updateThemeClass = () => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
      
      // Lưu theme vào localStorage
      localStorage.setItem('theme', theme);
    };

    // Nếu là lần render đầu tiên, đặt flag là đã khởi tạo
    if (!isInitialized) {
      setIsInitialized(true);
      updateThemeClass();
    } else {
      // Nếu là update sau khi người dùng toggle, áp dụng hiệu ứng transition
      updateThemeClass();
    }
  }, [theme, isInitialized]);

  // Function để toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 
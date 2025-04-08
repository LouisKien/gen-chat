import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';

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

function Chat() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<{text: string, isUser: boolean, modelId?: string}[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [activeChat, setActiveChat] = useState<number | null>(0);
  const [isModelSelectOpen, setIsModelSelectOpen] = useState(false);
  const [animateContent, setAnimateContent] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  
  // Ref for the textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Ref for the messages container to scroll it
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Theo dõi thay đổi kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      const isDesktopView = window.innerWidth >= 768;
      setIsDesktop(isDesktopView);
      
      // Nếu chuyển từ mobile sang desktop, luôn hiển thị sidebar
      if (isDesktopView && !isSidebarOpen) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Gọi một lần khi component mount để thiết lập trạng thái ban đầu
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarOpen]);

  const models = [
    { 
      id: 'gpt-4', 
      name: 'GPT-4',
      description: 'Mô hình AI tiên tiến nhất của OpenAI, với khả năng suy luận phức tạp, hiểu ngữ cảnh tốt và hỗ trợ đa dạng nhiệm vụ. Phiên bản mới nhất với cửa sổ ngữ cảnh lớn hơn và kiến thức được cập nhật.',
      badgeColor: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'gpt-3.5-turbo', 
      name: 'GPT-3.5 Turbo',
      description: 'Phiên bản tối ưu hóa của GPT-3.5, cân bằng tốt giữa hiệu suất và tốc độ. Phù hợp cho hầu hết các trường hợp sử dụng thông thường với chi phí thấp hơn GPT-4.',
      badgeColor: 'from-green-500 to-emerald-600'
    },
    { 
      id: 'claude-3-opus', 
      name: 'Claude 3 Opus',
      description: 'Mô hình mạnh mẽ nhất của Anthropic, xuất sắc trong các nhiệm vụ phức tạp, phân tích và suy luận. Được tối ưu hóa cho độ chính xác cao và khả năng hiểu văn bản phức tạp.',
      badgeColor: 'from-purple-500 to-violet-600'
    },
    { 
      id: 'claude-3-sonnet', 
      name: 'Claude 3 Sonnet',
      description: 'Phiên bản cân bằng của Claude 3, kết hợp tốc độ và hiệu suất cao. Phù hợp cho nhiều trường hợp sử dụng đa dạng với chi phí hợp lý.',
      badgeColor: 'from-pink-500 to-fuchsia-600'
    },
    { 
      id: 'gemini-pro', 
      name: 'Gemini Pro',
      description: 'Model mạnh mẽ của Google, thiết kế để hiểu và tạo văn bản, hình ảnh và mã. Được huấn luyện với lượng dữ liệu khổng lồ để đạt hiệu suất cao trong nhiều lĩnh vực.',
      badgeColor: 'from-amber-500 to-orange-600'
    },
  ];

  const chatHistory = [
    { 
      id: 0, 
      title: 'Chat về AI và Machine Learning', 
      model: 'GPT-4',
      time: '2 giờ trước',
      modelColor: 'bg-blue-500'
    },
    { 
      id: 1, 
      title: 'Tìm hiểu về React và Next.js', 
      model: 'Claude 3',
      time: '5 giờ trước',
      modelColor: 'bg-purple-500'
    },
    { 
      id: 2, 
      title: 'Hướng dẫn học tiếng Anh hiệu quả', 
      model: 'GPT-3.5',
      time: '1 ngày trước',
      modelColor: 'bg-green-500'
    }
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: inputText, isUser: true }];
    setMessages(newMessages);
    setInputText('');
    
    // Reset textarea height after sending
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset before calculating new height
      textareaRef.current.rows = 1;
    }

    // Store the model used for the potential response *before* the timeout
    const modelForResponse = selectedModel;

    // Simulate response after a short delay
    setTimeout(() => {
      setMessages([...newMessages, { 
        text: `Đây là phản hồi thử nghiệm từ model ${modelForResponse}. Tính năng chat đang được phát triển.`, 
        isUser: false,
        modelId: modelForResponse // Add modelId to AI response
      }]);
    }, 1000);
  };

  // Handle keydown events for Shift+Enter submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior (new line)
      handleSendMessage();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      // Allow default behavior (new line) - no action needed here, 
      // but we explicitly don't call handleSendMessage()
    }
    // Auto-resize logic is handled in handleInput
  };

  // Auto-resize textarea height based on content
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto'; // Reset height to recalculate
    const scrollHeight = textarea.scrollHeight;
    // Set a max height (e.g., 5 lines equivalent, adjust as needed)
    const maxHeight = 5 * 24; // Assuming approx 24px per line
    textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    // If content requires scrolling beyond max height, enable scrollbar
    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
  };

  // Handle focus on textarea for mobile keyboard
  const handleFocus = () => {
    // Check if it's likely a mobile device based on width
    if (window.innerWidth < 768 && messagesContainerRef.current) {
      // Scroll messages container to the bottom smoothly
      // Use a small timeout to allow the keyboard to start appearing
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  };

  // Effect to reset textarea height if text is cleared externally
  useEffect(() => {
    if (!inputText && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.rows = 1;
      textareaRef.current.style.overflowY = 'hidden';
    }
  }, [inputText]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setAnimateContent(true);
    setSidebarCollapsed(!isSidebarCollapsed);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setAnimateContent(false);
    }, 600);
  };

  const handleChatSelect = (chatId: number) => {
    setActiveChat(chatId);
  };

  return (
    <div className="min-h-screen h-screen w-full flex relative overflow-hidden bg-[rgb(var(--background))]">
      {/* Gradient Orbs - Random positions with fade animations */}
      <OrbsManager />
      
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar - Hidden on mobile by default, shown when toggled */}
      <motion.aside 
        className={`fixed md:sticky top-0 left-0 z-50 md:z-10 ${
          isSidebarCollapsed ? 'md:w-20' : 'md:w-72'
        } w-72 transform sidebar-transition ease-out ${
          isDesktop ? 'md:translate-x-0' : ''
        } flex flex-col md:overflow-hidden md:rounded-3xl`}
        initial={{ x: isDesktop ? 0 : -300 }}
        animate={{ 
          x: (isDesktop || isSidebarOpen) ? 0 : -300,
          width: isSidebarCollapsed ? 80 : 288
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          duration: 0.6
        }}
      >
        <div className="ios-sidebar flex flex-col h-full md:p-5 p-5 overflow-hidden md:m-0 m-0 md:rounded-3xl rounded-none md:h-[calc(100vh-0px)] h-screen relative">
          
          {/* Sidebar header */}
          <motion.div 
            className="flex items-center justify-between mb-8"
            animate={isSidebarCollapsed ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" className={`flex items-center text-2xl font-bold ${isSidebarCollapsed ? 'w-full justify-center' : ''}`}>
              {isSidebarCollapsed ? (
                <motion.span 
                  className="rainbow-text text-3xl float-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    delay: 0.3
                  }}
                >
                  G
                </motion.span>
              ) : (
                <motion.span 
                  className="rainbow-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    delay: 0.1
                  }}
                >
                  GenChat
                </motion.span>
              )}
            </Link>
            <button 
              className="p-2 rounded-full glass-effect hover:bg-[rgb(var(--background))]/30 md:hidden"
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[rgb(var(--text))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>

          {/* New Chat Button - Hiển thị phiên bản phù hợp với trạng thái sidebar */}
          {isSidebarCollapsed ? (
            <div className="flex justify-center items-center w-full">
              <motion.button 
                className="w-12 h-12 mb-6 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white/20 overflow-visible"
                title={t('chat.newChat')}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 8px 10px -6px rgba(147, 51, 234, 0.5)"
                }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #7928ca)",
                  minWidth: "48px",
                  minHeight: "48px"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.button>
            </div>
          ) : (
            <motion.button 
              className="w-full h-12 mb-6 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white overflow-hidden"
              title={t('chat.newChat')}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 8px 10px -6px rgba(147, 51, 234, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence initial={false}>
                {!isSidebarCollapsed && (
                  <motion.div 
                    className="flex items-center justify-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-semibold whitespace-nowrap">{t('chat.newChat')}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          {/* Chat History List */}
          {!isSidebarCollapsed ? (
            <motion.div 
              className="flex-1 overflow-y-auto mb-4 pr-1 custom-scrollbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: isSidebarCollapsed ? 0 : 0.2 }}
            >
              <div className="text-sm font-medium uppercase tracking-wider pl-2 mb-3 text-[rgb(var(--text))] opacity-70 whitespace-nowrap">{t('chat.recentChats')}</div>
              <div className="space-y-3">
                {/* Sample chat history items */}
                {chatHistory.map((chat, index) => (
                  <motion.div 
                    key={chat.id}
                    className={`ios-card cursor-pointer ${activeChat === chat.id ? 'ios-card-active' : ''}`}
                    title={`${chat.title} (${chat.model})`}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleChatSelect(chat.id)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) + (isSidebarCollapsed ? 0 : 0.2) }}
                  >
                    <div className="text-sm font-medium truncate pr-4 whitespace-nowrap">{chat.title}</div>
                    <div className="text-xs mt-1 flex items-center opacity-80 whitespace-nowrap">
                      <span className={`inline-block w-2 h-2 rounded-full ${chat.modelColor} mr-2`}></span>
                      {chat.model} • {chat.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="flex-1 flex flex-col items-center space-y-6 mb-4 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {chatHistory.slice(0, 3).map((chat, index) => (
                <motion.div 
                  key={chat.id}
                  className={`w-12 h-12 rounded-full ios-glass flex items-center justify-center cursor-pointer relative sidebar-icon float-icon sidebar-spring-in`}
                  title={`${chat.title} (${chat.model})`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChatSelect(chat.id)}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.2 + (index * 0.1)
                  }}
                >
                  <span className={`inline-block w-6 h-6 rounded-full ${chat.modelColor}`}></span>
                  {activeChat === chat.id && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full active-indicator"></span>
                  )}
                </motion.div>
              ))}
              
              {chatHistory.length > 3 && (
                <motion.div 
                  className="w-12 h-12 rounded-full ios-glass flex items-center justify-center cursor-pointer sidebar-icon float-icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.5
                  }}
                >
                  <span className="text-sm font-medium">+{chatHistory.length - 3}</span>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Sidebar footer with controls */}
          <motion.div 
            className={`mt-auto border-t border-[rgb(var(--sidebar-text))]/20 pt-4 ${isSidebarCollapsed ? 'flex flex-col items-center space-y-5' : ''}`}
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {!isSidebarCollapsed ? (
              <>
                <div className="flex items-center justify-between px-2 mb-4">
                  {/* Home button */}
                  <Link 
                    to="/" 
                    className="w-10 h-10 rounded-full ios-glass flex items-center justify-center sidebar-icon footer-button"
                    title={t('buttons.back')}
                    aria-label={t('buttons.back')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 home-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </Link>
                  
                  {/* GitHub button */}
                  <a 
                    href="https://github.com/LouisKien/gen-chat" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full ios-glass flex items-center justify-center sidebar-icon footer-button"
                    title="GitHub Repository"
                    aria-label="GitHub Repository"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 github-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  
                  {/* Theme switcher */}
                  <div 
                    className="w-10 h-10 rounded-full ios-glass flex items-center justify-center sidebar-icon footer-button theme-icon"
                    title={t('theme.toggle')}
                  >
                    <ThemeSwitcher />
                  </div>
                  
                  {/* Language switcher */}
                  <div className="w-10 h-10 rounded-full ios-glass flex items-center justify-center sidebar-icon footer-button lang-icon">
                    <LanguageSwitcher />
                  </div>
                </div>
                
                {/* Nút thu gọn / mở rộng mới - đặt ở footer */}
                <motion.button
                  className="w-full py-3 px-4 mt-2 rounded-xl ios-glass flex items-center justify-center gap-2 sidebar-icon expand-btn"
                  onClick={toggleSidebarCollapse}
                  whileHover={{ y: -2, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  title={t('sidebar.collapse')}
                  aria-label={t('sidebar.collapse')}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 collapse-icon flex-shrink-0"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                  <AnimatePresence initial={false}>
                    {!isSidebarCollapsed && (
                      <motion.span 
                        className="text-sm font-medium whitespace-nowrap" 
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                       >
                        {t('sidebar.collapse')}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </>
            ) : (
              <>
                {/* Home button */}
                <Link 
                  to="/" 
                  className="w-12 h-12 rounded-full ios-glass flex items-center justify-center sidebar-icon float-icon footer-button"
                  title={t('buttons.back')}
                  aria-label={t('buttons.back')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 home-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </Link>
                
                {/* GitHub button */}
                <a 
                  href="https://github.com/LouisKien/gen-chat" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full ios-glass flex items-center justify-center sidebar-icon float-icon footer-button"
                  title="GitHub Repository"
                  style={{ animationDelay: '0.2s' }}
                  aria-label="GitHub Repository"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 github-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                
                {/* Theme switcher */}
                <div 
                  className="w-12 h-12 rounded-full ios-glass flex items-center justify-center sidebar-icon float-icon footer-button theme-icon"
                  title={t('theme.toggle')}
                  style={{ animationDelay: '0.4s' }}
                >
                  <ThemeSwitcher />
                </div>
                
                {/* Language switcher */}
                <div className="w-12 h-12 rounded-full ios-glass flex items-center justify-center sidebar-icon float-icon footer-button lang-icon" style={{ animationDelay: '0.6s' }}>
                  <LanguageSwitcher />
                </div>
                
                {/* Nút mở rộng mới - đặt ở footer */}
                <motion.button
                  className="w-12 h-12 mt-3 rounded-full ios-glass flex items-center justify-center sidebar-icon float-icon expand-btn"
                  style={{ animationDelay: '0.8s' }}
                  onClick={toggleSidebarCollapse}
                  whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  title={t('sidebar.expand')}
                  aria-label={t('sidebar.expand')}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 expand-icon" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </motion.aside>
      
      {/* Main content */}
      <main className={`flex-1 flex flex-col h-screen relative z-10 transition-all duration-700 content-shift ${isSidebarCollapsed ? 'md:ml-0' : ''}`}>
        {/* Mobile Header */}
        <div className="flex md:hidden items-center p-4 glass-effect rounded-t-3xl sticky top-0 z-10">
          <motion.button 
            className="p-2 rounded-full hover:bg-[rgb(var(--background))]/30 mr-2"
            onClick={toggleSidebar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
          <h1 className="text-xl font-bold rainbow-text">GenChat</h1>
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-hidden p-4 pt-0 md:p-6 flex flex-col h-full">
          <div className="flex-1 overflow-hidden flex flex-col h-full">
            {/* Messages area - Add ref here */}
            <div 
              ref={messagesContainerRef} 
              className="flex-1 overflow-y-auto mb-4 p-5 md:rounded-3xl rounded-b-3xl glass-effect custom-scrollbar"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                  <motion.div
                    className="ios-icon-float"
                    initial={{ y: 0 }}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </motion.div>
                  <p className="text-xl font-medium">{t('chat.emptyState')}</p>
                  <p className="mt-3 text-sm opacity-80">{t('chat.startPrompt')}</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {messages.map((message, index) => {
                    // Find the model details if it's an AI message
                    const modelInfo = !message.isUser && message.modelId 
                      ? models.find(m => m.id === message.modelId) 
                      : null;
                    // Determine the background gradient class
                    const aiMessageGradient = modelInfo 
                      ? modelInfo.badgeColor 
                      : 'from-gray-500 to-gray-600'; // Default gradient

                    return (
                      <motion.div 
                        key={index} 
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Apply dynamic background based on message type */}
                        <div className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                          message.isUser 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                            : `bg-gradient-to-r ${aiMessageGradient} text-white` // Use model gradient for AI
                        }`}>
                          {message.text}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {/* Input area container with gradient border - ADDED motion and entry animation */}
            <motion.div 
              className="relative rounded-3xl animate-gradient-border border-2 border-transparent"
              initial={{ opacity: 0, y: 20 }} // Start invisible and slightly lower
              animate={{ opacity: 1, y: 0 }} // Fade in and slide up to position
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }} // Add a slight delay
            >
              {/* Inner container - Slightly smaller border-radius (rounded-[1.4rem]) */}
              <div className="flex items-center gap-2 bg-[rgb(var(--background))] p-2 rounded-[1.4rem]">
                {/* Textarea takes most space */}
                <motion.textarea
                  ref={textareaRef}
                  rows={1}
                  value={inputText}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                  onFocus={handleFocus}
                  className="flex-1 bg-transparent focus:outline-none placeholder-[rgb(var(--text))]/50 resize-none overflow-hidden custom-scrollbar py-2.5 px-3"
                  placeholder={t('chat.inputPlaceholder')}
                  style={{ lineHeight: '1.5rem' }}
                />
                
                {/* Model selection trigger - Adjusted styling slightly */}
                <div className="relative self-end">
                  <div 
                    className="h-12 flex items-center justify-center cursor-pointer z-10 transition-transform duration-200 ease-out hover:scale-105"
                    onClick={() => setIsModelSelectOpen(!isModelSelectOpen)}
                    title={t('chat.modelSelection')}
                  >
                    <div className={`flex items-center gap-1.5 p-2.5 rounded-xl bg-gradient-to-r ${models.find(m => m.id === selectedModel)?.badgeColor || 'from-gray-500 to-gray-600'} shadow-sm hover:shadow-md`}>
                      <div className="w-2.5 h-2.5 rounded-full bg-white/60"></div>
                      <span className="text-xs font-semibold text-white truncate hidden sm:inline pr-0.5">{models.find(m => m.id === selectedModel)?.name}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Model Selector Popup - Remains the same */}
                  <AnimatePresence>
                    {isModelSelectOpen && (
                      <motion.div 
                        className="absolute bottom-full right-0 mb-2 w-60 sm:w-80 rounded-2xl overflow-hidden shadow-lg z-30 backdrop-blur-xl bg-[rgba(var(--sidebar-bg),0.75)]"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{
                          boxShadow: '0 8px 20px -5px rgba(0, 0, 0, 0.1), 0 6px 8px -6px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <div className="p-2 border-b border-[rgb(var(--sidebar-text))]/15 bg-[rgba(var(--sidebar-bg),0.6)] backdrop-blur-sm">
                          <h3 className="text-sm font-bold px-2 py-1 rainbow-text">{t('chat.modelSelection')}</h3>
                        </div>
                        <div className="p-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                          {models.map(model => (
                            <motion.button
                              key={model.id}
                              type="button"
                              className={`w-full text-left p-3 mb-1.5 rounded-xl transition-all duration-200 border-2 ${
                                selectedModel === model.id 
                                  ? 'bg-[rgba(var(--card-bg),0.8)] border-blue-500/70 shadow-lg scale-[1.02]' 
                                  : 'bg-[rgba(var(--card-bg),0.4)] border-transparent hover:bg-[rgba(var(--card-bg),0.6)] hover:border-[rgba(var(--sidebar-item-border),0.5)]'
                              }`}
                              onClick={() => {
                                setSelectedModel(model.id);
                                setIsModelSelectOpen(false);
                              }}
                              whileHover={{ x: 3 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${model.badgeColor}`}></div>
                                <span className="font-semibold">{model.name}</span>
                                {selectedModel === model.id && (
                                  <motion.svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-4 w-4 ml-auto text-blue-500 dark:text-blue-400" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: 360 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </motion.svg>
                                )}
                              </div>
                              <p className="text-xs opacity-80 pr-1 line-clamp-2">{model.description}</p>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {isModelSelectOpen && (
                    <div 
                      className="fixed inset-0 z-20" 
                      onClick={() => setIsModelSelectOpen(false)}
                    ></div>
                  )}
                </div>

                {/* Submit button - Adjusted styling slightly */}
                <motion.button 
                  type="button"
                  onClick={handleSendMessage}
                  className="h-12 flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg self-end"
                  title={t('chat.send')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputText.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chat; 
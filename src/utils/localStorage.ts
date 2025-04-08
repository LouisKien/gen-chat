import { ChatHistory } from './api';

const CHAT_HISTORY_KEY = 'gen-chat-history';

// Lấy tất cả lịch sử chat từ localStorage
export const getAllChatHistory = (): ChatHistory[] => {
  try {
    const storedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (storedHistory) {
      return JSON.parse(storedHistory) as ChatHistory[];
    }
  } catch (error) {
    console.error('Error loading chat history from localStorage:', error);
  }
  return [];
};

// Lấy thông tin một chat cụ thể theo ID
export const getChatById = (chatId: string): ChatHistory | null => {
  const allChats = getAllChatHistory();
  return allChats.find(chat => chat.id === chatId) || null;
};

// Lưu hoặc cập nhật một chat
export const saveChat = (chat: ChatHistory): void => {
  try {
    const allChats = getAllChatHistory();
    const existingChatIndex = allChats.findIndex(c => c.id === chat.id);
    
    if (existingChatIndex >= 0) {
      // Cập nhật chat hiện có
      allChats[existingChatIndex] = chat;
    } else {
      // Thêm chat mới
      allChats.push(chat);
    }
    
    // Sắp xếp theo thời gian cập nhật giảm dần (mới nhất lên đầu)
    allChats.sort((a, b) => b.lastUpdated - a.lastUpdated);
    
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(allChats));
  } catch (error) {
    console.error('Error saving chat to localStorage:', error);
  }
};

// Xóa một chat theo ID
export const deleteChat = (chatId: string): void => {
  try {
    const allChats = getAllChatHistory();
    const updatedChats = allChats.filter(chat => chat.id !== chatId);
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(updatedChats));
  } catch (error) {
    console.error('Error deleting chat from localStorage:', error);
  }
};

// Tạo một định dạng thời gian dễ đọc
export const formatTime = (timestamp: number): string => {
  const now = new Date().getTime();
  const diff = now - timestamp;
  
  // Chuyển đổi thành các khoảng thời gian
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return days === 1 ? '1 ngày trước' : `${days} ngày trước`;
  } else if (hours > 0) {
    return hours === 1 ? '1 giờ trước' : `${hours} giờ trước`;
  } else if (minutes > 0) {
    return minutes === 1 ? '1 phút trước' : `${minutes} phút trước`;
  } else {
    return 'Vừa xong';
  }
}; 
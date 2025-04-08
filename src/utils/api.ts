import { useState, useEffect } from 'react';

// Định nghĩa danh sách các model có sẵn
export const availableModels = {
  'google/gemini-2.0-flash-exp:free': {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash',
    description: 'Model mạnh mẽ và nhanh từ Google',
    color: '#FF4081'
  },
  'google/gemini-2.0-flash-thinking-exp:free': {
    id: 'google/gemini-2.0-flash-thinking-exp:free',
    name: 'Gemini 2.0 Flash Thinking',
    description: 'Model tự suy luận mạnh mẽ từ Google',
    color: '#8E24AA'
  },
  'deepseek/deepseek-chat-v3-0324:free': {
    id: 'deepseek/deepseek-chat-v3-0324:free',
    name: 'DeepSeek V3',
    description: 'Model ngôn ngữ hiệu quả cao từ DeepSeek',
    color: '#42A5F5'
  },
  'deepseek/deepseek-r1:free': {
    id: 'deepseek/deepseek-r1:free',
    name: 'DeepSeek R1',
    description: 'Model mạnh với khả năng xử lý đa nhiệm từ DeepSeek',
    color: '#26A69A'
  },
  'meta-llama/llama-3.3-70b-instruct:free': {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    name: 'Meta Llama 3.3 70B',
    description: 'Model mạnh mẽ từ Meta (Facebook/Instagram)',
    color: '#4267B2'
  },
  'google/gemini-2.5-pro-exp-03-25:free': {
    id: 'google/gemini-2.5-pro-exp-03-25:free',
    name: 'Gemini 2.5 Pro - Thử nghiệm',
    description: 'Model mạnh mẽ nhất từ Google - Giới hạn 5 phút/1 lần gọi, 25 lần gọi/ngày',
    color: '#7C4DFF'
  },
};

// Hàm chuyển đổi mã màu hex sang gradient class
export const colorToGradient = (color: string): string => {
  // Định nghĩa một số gradient theo mã màu
  const gradientMap: {[key: string]: string} = {
    '#FF4081': 'from-pink-500 to-red-400',
    '#8E24AA': 'from-purple-600 to-indigo-500',
    '#42A5F5': 'from-blue-400 to-cyan-300',
    '#26A69A': 'from-teal-500 to-green-400',
    '#4267B2': 'from-blue-600 to-indigo-700',
    '#7C4DFF': 'from-indigo-500 to-purple-500'
  };

  return gradientMap[color] || 'from-gray-500 to-gray-600';
};

// Định nghĩa các types cho API chat
export interface Message {
  text: string;
  isUser: boolean;
  modelId?: string;
  timestamp?: number; // Thời gian khi tin nhắn được tạo
}

export interface ChatHistory {
  id: string;
  title: string;
  lastUpdated: number; // timestamp
  messages: Message[];
  color: string;
}

export interface ChatRequest {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  model: string;
}

export interface ChatResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
}

// Function lấy tóm tắt tiêu đề từ tin nhắn đầu tiên
export const getSummaryTitle = async (message: string, modelId: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    console.error('OpenRouter API key is missing');
    throw new Error('API key is not configured');
  }

  const prompt = `"The following is the first message in a conversation. Please create a short title (under 20 characters) to describe this conversation. Only return the title, with no explanations or other characters, and ensure the output is in the same language as the user's main message:

"${message}"`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'GenChat'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        model: modelId,
        temperature: 0.7,
        max_tokens: 20
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      // Nếu có lỗi, trả về một đoạn từ tin nhắn gốc
      return message.length > 30 ? message.substring(0, 30) + '...' : message;
    }

    const data = await response.json() as ChatResponse;
    
    if (data.choices && data.choices.length > 0) {
      // Lấy tiêu đề từ phản hồi và loại bỏ dấu ngoặc kép nếu có
      let title = data.choices[0].message.content.trim();
      if (title.startsWith('"') && title.endsWith('"')) {
        title = title.substring(1, title.length - 1);
      }
      return title;
    } else {
      // Fallback nếu không có phản hồi
      return message.length > 30 ? message.substring(0, 30) + '...' : message;
    }
  } catch (error) {
    console.error('Error getting title summary:', error);
    // Fallback khi có lỗi
    return message.length > 30 ? message.substring(0, 30) + '...' : message;
  }
};

// Function gọi OpenRouter API
export const callChatAPI = async (userMessages: Message[], selectedModel: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  if (!apiKey) {
    console.error('OpenRouter API key is missing');
    throw new Error('API key is not configured');
  }

  // Chuyển đổi messages sang định dạng yêu cầu của API
  const formattedMessages = userMessages.map(msg => ({
    role: msg.isUser ? 'user' : 'assistant',
    content: msg.text
  }));

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'GenChat'
      },
      body: JSON.stringify({
        messages: formattedMessages,
        model: selectedModel,
        temperature: 0.7,
        max_tokens: 100000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json() as ChatResponse;
    
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error('No response from API');
    }
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    throw error;
  }
};
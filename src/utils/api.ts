// Định nghĩa interface cho model
export interface Model {
  id: string;
  name: string;
  description: string;
  color: string;
}

// Định nghĩa danh sách các model có sẵn cho OpenRouter
export const openRouterModels: Record<string, Model> = {
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

// Định nghĩa danh sách các model có sẵn cho Gemini
export const geminiModels: Record<string, Model> = {
  'gemini-2.0-flash': {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    description: 'Model AI nhanh với hiệu suất cao từ Google',
    color: '#FF4081'
  },
  'gemini-2.0-flash-thinking-exp-01-21': {
    id: 'gemini-2.0-flash-thinking-exp-01-21',
    name: 'Gemini 2.0 Flash Thinking',
    description: 'Model tự suy luận với khả năng phân tích sâu',
    color: '#8E24AA'
  },
  'gemini-2.0-flash-lite': {
    id: 'gemini-2.0-flash-lite',
    name: 'Gemini 2.0 Flash Lite',
    description: 'Phiên bản nhẹ và nhanh của Gemini 2.0 Flash',
    color: '#42A5F5'
  },
  'gemini-2.5-pro-preview-03-25': {
    id: 'gemini-2.5-pro-preview-03-25',
    name: 'Gemini 2.5 Pro Preview',
    description: 'Phiên bản mới nhất và mạnh mẽ nhất của Google Gemini',
    color: '#7C4DFF'
  }
};

// Lấy danh sách model dựa trên provider đã chọn
export const getAvailableModels = (): Record<string, Model> => {
  const provider = getApiProvider();
  return provider === 'gemini' ? geminiModels : openRouterModels;
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

// Function kiểm tra xem đang sử dụng API nào
const getApiProvider = (): 'openrouter' | 'gemini' => {
  const provider = import.meta.env.VITE_API_PROVIDER;
  return provider === 'gemini' ? 'gemini' : 'openrouter';
};

// Function lấy API key tương ứng
const getApiKey = (provider: 'openrouter' | 'gemini'): string => {
  if (provider === 'gemini') {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  return import.meta.env.VITE_OPENROUTER_API_KEY;
};

// Function lấy tóm tắt tiêu đề từ tin nhắn đầu tiên
export const getSummaryTitle = async (message: string, modelId: string): Promise<string> => {
  const provider = getApiProvider();
  const apiKey = getApiKey(provider);
  
  if (!apiKey) {
    console.error(`${provider} API key is missing`);
    throw new Error('API key is not configured');
  }

  const prompt = `"The following is the first message in a conversation. Please create a short title (under 20 characters) to describe this conversation. Only return the title, with no explanations or other characters, and ensure the output is in the same language as the user's main message:

"${message}"`;

  try {
    let title: string;
    
    if (provider === 'gemini') {
      title = await callGeminiForTitle(apiKey, prompt, modelId);
    } else {
      title = await callOpenRouterForTitle(apiKey, prompt, modelId);
    }
    
    // Loại bỏ dấu ngoặc kép nếu có
    if (title.startsWith('"') && title.endsWith('"')) {
      title = title.substring(1, title.length - 1);
    }
    
    return title;
  } catch (error) {
    console.error('Error getting title summary:', error);
    // Fallback khi có lỗi
    return message.length > 30 ? message.substring(0, 30) + '...' : message;
  }
};

// Hàm gọi OpenRouter để lấy tiêu đề
async function callOpenRouterForTitle(apiKey: string, prompt: string, modelId: string): Promise<string> {
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
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json() as ChatResponse;
  
  if (data.choices && data.choices.length > 0) {
    return data.choices[0].message.content;
  } else {
    throw new Error('No response from API');
  }
}

// Hàm gọi Gemini để lấy tiêu đề
async function callGeminiForTitle(apiKey: string, prompt: string, modelId: string): Promise<string> {
  // Sử dụng modelId trực tiếp vì đã là ID của Gemini
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 20
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Gemini API Error:', errorData);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.candidates && data.candidates.length > 0 && 
      data.candidates[0].content && 
      data.candidates[0].content.parts && 
      data.candidates[0].content.parts.length > 0) {
    return data.candidates[0].content.parts[0].text;
  } else {
    throw new Error('No valid response from Gemini API');
  }
}

// Function gọi API chat
export const callChatAPI = async (userMessages: Message[], selectedModel: string): Promise<string> => {
  const provider = getApiProvider();
  const apiKey = getApiKey(provider);
  
  if (!apiKey) {
    console.error(`${provider} API key is missing`);
    throw new Error('API key is not configured');
  }

  try {
    if (provider === 'gemini') {
      return await callGeminiChat(apiKey, userMessages, selectedModel);
    } else {
      return await callOpenRouterChat(apiKey, userMessages, selectedModel);
    }
  } catch (error) {
    console.error(`Error calling ${provider} API:`, error);
    throw error;
  }
};

// Hàm gọi OpenRouter chat
async function callOpenRouterChat(apiKey: string, userMessages: Message[], selectedModel: string): Promise<string> {
  // Chuyển đổi messages sang định dạng yêu cầu của API
  const formattedMessages = userMessages.map(msg => ({
    role: msg.isUser ? 'user' : 'assistant',
    content: msg.text
  }));

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
}

// Hàm gọi Gemini chat
async function callGeminiChat(apiKey: string, userMessages: Message[], selectedModel: string): Promise<string> {
  // Sử dụng modelId trực tiếp vì đã là ID của Gemini
  // Chuyển đổi messages sang định dạng yêu cầu của Gemini API
  const geminiContents = [];
  let currentRole = null;
  let currentParts = [];

  for (const msg of userMessages) {
    const role = msg.isUser ? 'user' : 'model';
    
    // Nếu role thay đổi, tạo một content mới
    if (role !== currentRole && currentParts.length > 0) {
      geminiContents.push({
        role: currentRole,
        parts: [...currentParts]
      });
      currentParts = [];
    }
    
    currentRole = role;
    currentParts.push({ text: msg.text });
  }
  
  // Thêm phần còn lại
  if (currentParts.length > 0) {
    geminiContents.push({
      role: currentRole,
      parts: [...currentParts]
    });
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: geminiContents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        topP: 0.95
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Gemini API Error:', errorData);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.candidates && data.candidates.length > 0 && 
      data.candidates[0].content && 
      data.candidates[0].content.parts && 
      data.candidates[0].content.parts.length > 0) {
    return data.candidates[0].content.parts[0].text;
  } else {
    throw new Error('No valid response from Gemini API');
  }
}
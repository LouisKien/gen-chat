/**
 * Màu gradient ngẫu nhiên cho các cuộc hội thoại
 * Cú pháp: 'from-COLOR1-INTENSITY to-COLOR2-INTENSITY'
 */

export const conversationColors = [
  // Blue tones
  'from-blue-400 to-indigo-600',
  'from-blue-500 to-purple-600',
  'from-blue-400 to-sky-600',
  'from-sky-400 to-blue-600',
  'from-blue-500 to-cyan-400',
  'from-indigo-400 to-blue-500',
  'from-sky-300 to-indigo-500',
  'from-blue-600 to-indigo-400',
  'from-blue-300 to-indigo-600',
  'from-indigo-500 to-blue-700',
  
  // Purple tones
  'from-purple-400 to-indigo-500',
  'from-purple-500 to-pink-500',
  'from-purple-600 to-indigo-400',
  'from-violet-400 to-purple-600',
  'from-purple-500 to-violet-400',
  'from-indigo-400 to-purple-500',
  'from-fuchsia-400 to-purple-600',
  'from-purple-600 to-fuchsia-400',
  'from-violet-500 to-indigo-400',
  'from-indigo-600 to-violet-500',
  
  // Pink tones
  'from-pink-400 to-rose-600',
  'from-pink-500 to-fuchsia-500',
  'from-rose-400 to-pink-600',
  'from-fuchsia-400 to-pink-500',
  'from-pink-500 to-purple-400',
  'from-rose-500 to-pink-400',
  'from-pink-600 to-fuchsia-400',
  'from-fuchsia-500 to-pink-600',
  'from-pink-400 to-purple-500',
  'from-rose-400 to-pink-500',
  
  // Red tones
  'from-red-400 to-rose-600',
  'from-red-500 to-orange-500',
  'from-rose-400 to-red-600',
  'from-red-600 to-rose-400',
  'from-red-500 to-pink-400',
  'from-rose-500 to-red-400',
  'from-red-600 to-orange-400',
  'from-red-400 to-rose-500',
  'from-orange-500 to-red-600',
  'from-red-500 to-orange-400',
  
  // Orange tones
  'from-orange-400 to-amber-600',
  'from-orange-500 to-red-500',
  'from-amber-400 to-orange-600',
  'from-orange-600 to-amber-400',
  'from-orange-500 to-yellow-400',
  'from-amber-500 to-orange-400',
  'from-orange-600 to-red-400',
  'from-orange-400 to-amber-500',
  'from-yellow-500 to-orange-600',
  'from-orange-500 to-red-400',
  
  // Yellow tones
  'from-yellow-400 to-amber-600',
  'from-yellow-500 to-orange-500',
  'from-amber-400 to-yellow-600',
  'from-yellow-600 to-amber-400',
  'from-yellow-500 to-lime-400',
  'from-amber-500 to-yellow-400',
  'from-yellow-600 to-orange-400',
  'from-yellow-400 to-lime-500',
  'from-lime-500 to-yellow-600',
  'from-yellow-500 to-amber-400',
  
  // Green tones
  'from-green-400 to-emerald-600',
  'from-green-500 to-lime-500',
  'from-emerald-400 to-green-600',
  'from-green-600 to-emerald-400',
  'from-green-500 to-teal-400',
  'from-lime-500 to-green-400',
  'from-green-600 to-lime-400',
  'from-green-400 to-teal-500',
  'from-teal-500 to-green-600',
  'from-green-500 to-emerald-400',
  
  // Teal tones
  'from-teal-400 to-cyan-600',
  'from-teal-500 to-green-500',
  'from-cyan-400 to-teal-600',
  'from-teal-600 to-cyan-400',
  'from-teal-500 to-emerald-400',
  'from-cyan-500 to-teal-400',
  'from-teal-600 to-green-400',
  'from-teal-400 to-emerald-500',
  'from-emerald-500 to-teal-600',
  'from-teal-500 to-cyan-400',
  
  // Cyan tones
  'from-cyan-400 to-sky-600',
  'from-cyan-500 to-teal-500',
  'from-sky-400 to-cyan-600',
  'from-cyan-600 to-sky-400',
  'from-cyan-500 to-blue-400',
  'from-sky-500 to-cyan-400',
  'from-cyan-600 to-teal-400',
  'from-cyan-400 to-blue-500',
  'from-blue-500 to-cyan-600',
  'from-cyan-500 to-sky-400',
  
  // Mixed color combinations
  'from-purple-400 to-blue-600',
  'from-pink-400 to-indigo-600',
  'from-red-400 to-purple-600',
  'from-orange-400 to-red-600',
  'from-yellow-400 to-orange-600',
  'from-lime-400 to-yellow-600',
  'from-emerald-400 to-lime-600',
  'from-teal-400 to-emerald-600',
  'from-cyan-400 to-teal-600',
  'from-blue-400 to-cyan-600',
  
  // Vibrant contrast combinations
  'from-pink-500 to-blue-500',
  'from-purple-500 to-teal-500',
  'from-indigo-500 to-amber-500',
  'from-blue-500 to-orange-500',
  'from-cyan-500 to-red-500',
  'from-teal-500 to-rose-500',
  'from-emerald-500 to-pink-500',
  'from-green-500 to-purple-500',
  'from-lime-500 to-indigo-500',
  'from-yellow-500 to-violet-500',
  
  // Unique combinations
  'from-rose-400 to-sky-500',
  'from-fuchsia-400 to-emerald-500',
  'from-purple-400 to-amber-500',
  'from-violet-400 to-yellow-500',
  'from-indigo-400 to-orange-500',
  'from-blue-400 to-red-500',
  'from-sky-400 to-rose-500',
  'from-cyan-400 to-fuchsia-500',
  'from-teal-400 to-purple-500',
  'from-emerald-400 to-violet-500',
  'from-green-400 to-indigo-500',
  'from-lime-400 to-blue-500',
  'from-yellow-400 to-sky-500',
  'from-amber-400 to-cyan-500',
  'from-orange-400 to-teal-500',
  'from-red-400 to-emerald-500',
  'from-rose-400 to-green-500',
  'from-fuchsia-400 to-lime-500',
  'from-purple-400 to-yellow-500',
  'from-violet-400 to-amber-500'
];

/**
 * Lấy một màu ngẫu nhiên từ mảng màu
 */
export const getRandomColor = () => {
  return conversationColors[Math.floor(Math.random() * conversationColors.length)];
}; 
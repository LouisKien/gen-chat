# Gen-Chat

Ứng dụng chat với AI thông qua OpenRouter, hỗ trợ đa ngôn ngữ.

## Giới thiệu

Gen-Chat là một ứng dụng web cho phép người dùng trò chuyện với các mô hình AI thông qua nền tảng OpenRouter. Dự án này được phát triển bởi Louis Kien như một giải pháp chat AI đơn giản nhưng mạnh mẽ, với giao diện thân thiện và hỗ trợ đa ngôn ngữ.

### Tính năng chính

- Chat với các mô hình AI thông qua OpenRouter
- Hỗ trợ 2 ngôn ngữ chính: Tiếng Anh và Tiếng Việt
- Lưu trữ lịch sử chat hoàn toàn trên local storage
- Giao diện người dùng hiện đại và đáp ứng
- Khả năng tùy chỉnh mô hình AI

## Công nghệ sử dụng

- ReactJS
- TypeScript
- Vite
- Tailwind CSS
- OpenRouter API

## Cài đặt và Chạy

### Yêu cầu

- Node.js (v14.0.0 trở lên)
- npm hoặc yarn

### Các bước cài đặt

1. Clone repository về máy:
   ```
   git clone https://github.com/yourusername/gen-chat.git
   cd gen-chat
   ```

2. Cài đặt các dependencies:
   ```
   npm install
   ```

3. Tạo file `.env` tại thư mục gốc và thêm API key của OpenRouter:
   ```
   VITE_OPENROUTER_API_KEY=your_api_key_here
   ```

4. Khởi chạy ứng dụng ở chế độ development:
   ```
   npm run dev
   ```

5. Mở trình duyệt và truy cập `http://localhost:5173`

### Build cho production

```
npm run build
```

## Cách sử dụng

1. Chọn ngôn ngữ giao diện (Tiếng Anh hoặc Tiếng Việt)
2. Chọn mô hình AI bạn muốn sử dụng từ danh sách
3. Nhập tin nhắn và gửi để bắt đầu cuộc trò chuyện
4. Lịch sử chat sẽ tự động được lưu vào local storage của trình duyệt

## Đóng góp

Dự án này được phát triển bởi Louis Kien. Nếu bạn muốn đóng góp, vui lòng tạo pull request hoặc liên hệ trực tiếp với tác giả.

## Giấy phép

[MIT License](LICENSE)

## Tác giả

- **Louis Kien** - Nhà phát triển chính

---

*Lưu ý: Đây là dự án cá nhân và không liên kết với OpenRouter. OpenRouter là một dịch vụ độc lập, và bạn cần đăng ký tài khoản để lấy API key.*

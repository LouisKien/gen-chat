# GenChat

Ứng dụng chat AI đơn giản với giao diện người dùng đẹp mắt.

## Tính năng

- Giao diện người dùng hiện đại và phản hồi nhanh
- Hỗ trợ đa ngôn ngữ (Tiếng Anh, Tiếng Việt)
- Chuyển đổi giữa chế độ sáng và tối
- Sử dụng OpenRouter API để gọi các model AI khác nhau
- Tuỳ chọn sử dụng Google Gemini API
- Lưu lịch sử trò chuyện

## Yêu cầu hệ thống

- Node.js 16+
- NPM hoặc Yarn

## Cài đặt

1. Clone repository:
```
git clone https://github.com/LouisKien/gen-chat.git
cd gen-chat
```

2. Cài đặt dependencies:
```
npm install
```

3. Tạo file `.env` từ file `.env.example` và thêm API key của bạn:
```
cp .env.example .env
```

4. Chỉnh sửa file `.env` và thêm API key:
```
# Chọn API provider: "openrouter" hoặc "gemini"
VITE_API_PROVIDER=openrouter

# API key cho OpenRouter
VITE_OPENROUTER_API_KEY=your_openrouter_api_key

# API key cho Google Gemini (nếu sử dụng)
VITE_GEMINI_API_KEY=your_gemini_api_key
```

5. Khởi chạy dự án ở chế độ phát triển:
```
npm run dev
```

## Cấu hình API

### OpenRouter API

1. Đăng ký tài khoản tại [OpenRouter](https://openrouter.ai)
2. Tạo API key
3. Thêm vào file `.env`:
```
VITE_API_PROVIDER=openrouter
VITE_OPENROUTER_API_KEY=your_openrouter_api_key
```

### Google Gemini API

1. Đăng ký tài khoản Google Cloud Platform
2. Tạo một dự án và kích hoạt Gemini API
3. Tạo API key cho Gemini
4. Thêm vào file `.env`:
```
VITE_API_PROVIDER=gemini
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Gemini API hỗ trợ các model sau:
- `gemini-2.0-flash` - Model tiêu chuẩn với tốc độ cao
- `gemini-2.0-flash-thinking-exp-01-21` - Model với khả năng suy luận mạnh mẽ
- `gemini-2.0-flash-lite` - Phiên bản nhẹ, nhanh và tiết kiệm token
- `gemini-2.5-pro-preview-03-25` - Phiên bản mới nhất và mạnh mẽ nhất

## Công nghệ sử dụng

- React + Vite + TypeScript
- TailwindCSS cho styling
- Framer Motion cho animations
- i18next cho đa ngôn ngữ
- OpenRouter API, Gemini API

## Giới thiệu

GenChat là một ứng dụng web cho phép người dùng trò chuyện với các mô hình AI thông qua nền tảng OpenRouter. Dự án này được phát triển bởi Louis Kien như một giải pháp chat AI đơn giản nhưng mạnh mẽ, với giao diện thân thiện và hỗ trợ đa ngôn ngữ.

### Tính năng chính

- Chat với các mô hình AI thông qua OpenRouter
- Hỗ trợ 2 ngôn ngữ chính: Tiếng Anh và Tiếng Việt
- Lưu trữ lịch sử chat hoàn toàn trên local storage
- Giao diện người dùng hiện đại và đáp ứng
- Khả năng tùy chỉnh mô hình AI

## Cài đặt và Chạy

### Yêu cầu

- Node.js (v14.0.0 trở lên)
- npm hoặc yarn

### Các bước cài đặt

1. Clone repository về máy:
   ```
   git clone https://github.com/LouisKien/gen-chat
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

# HTPH — Cổng chọn Portfolio nhóm

Trang chủ có bốn lựa chọn: ThanhPhuong, TienDat, TranHieu, Nhóm. Phong cách thiết kế dựa trên HTPH; chỉ HTML/CSS; dark/light bằng checkbox CSS (trạng thái không lưu qua lần tải lại), responsive desktop/tablet/mobile. Không dùng JavaScript, framework hay ảnh raster nên không có ảnh cần đổi WebP trong phần xây dựng mới.

## Chạy
Mở `index.html` bằng trình duyệt. Tất cả đường dẫn là tương đối. Có thể triển khai bằng GitHub Pages hoặc Cloudflare Pages với thư mục `PortfolioNhom3` làm thư mục gốc.

## Hoạt động 1 — The Bug Hunter
Ba vấn đề nhận diện từ mã nguồn HTPH cũ để kiểm thử: (1) phần hero có vòng tròn rộng 390px, dễ tràn trên màn hình 320–375px; (2) menu nhiều mục có nguy cơ chật ở mobile; (3) nút gửi tin nhắn chỉ hiện toast, không gửi liên hệ thật. Đây là các điểm cần xác nhận bằng DevTools, chưa phải lỗi được xác nhận trên iPhone 12. Bản mới dùng lưới responsive, chiều rộng co giãn và liên kết thật thay cho nút giả.

Checklist kiểm thử DevTools: 320px, 375px, 390px (iPhone 12), 768px, 1024px, 1440px; kiểm tra tràn ngang, tương phản chữ, focus bàn phím, dark/light, link cả bốn ô. Ghi ảnh chụp màn hình và kết quả sau khi thực sự kiểm tra.

## Hoạt động 2 — Speed Up!
CSS tập trung trong `assets/css/style.css`; các lớp `.glass`, `.panel`, `.choice` tái sử dụng; giảm hiệu ứng nặng, không có script và không có ảnh PNG/JPEG cần chuyển WebP trong sản phẩm mới. Font từ Google Fonts là tài nguyên ngoài; có thể bỏ link font để giảm thêm request. Chưa chạy Lighthouse, không khẳng định điểm 80/90.

## Hoạt động 3 — Showcase & Peer Review (5 phút)
- 0:00–0:45: Giới thiệu cổng chọn bốn Portfolio.
- 0:45–1:45: Design System: xanh/tím, typography Manrope, glass cards, spacing và dark/light.
- 1:45–2:45: Demo responsive và hiệu ứng CSS, hỗ trợ reduced-motion.
- 2:45–3:45: Cách phân nhánh GitHub, nhánh cá nhân và nhánh nhóm.
- 3:45–5:00: Demo các trang, UX, nhận phản biện về điều hướng, độ tương phản và tính dễ đọc.

## Ghi chú
Trang TienDat và TranHieu có nội dung mẫu tối thiểu, chờ chính thành viên xác nhận thông tin và dự án. Không thay đổi nhánh cá nhân. Đây là phiên bản dựng lại theo phong cách mã nguồn HTPH trên GitHub; chưa xác minh pixel-perfect với trang đang chạy trên workers.dev.

# NID Remote Office

ระบบควบคุมประตูม้วนเหล็กระยะไกล (Remote Rolling Shutter Door Control)

## 🚀 Features

- **OTP Authentication** - ยืนยันตัวตนผ่าน OTP
- **Door Control** - เปิด/หยุด/ปิด ประตูระยะไกล
- **CCTV Monitor** - ดูกล้องวงจรปิด
- **Usage History** - ประวัติการใช้งานระบบและประตู
- **User Profile** - ข้อมูลผู้ใช้งาน

## 📦 Tech Stack

- **Framework:** Next.js 16
- **State Management:** Zustand
- **Styling:** Inline CSS
- **Icons:** Lucide React

## ⚙️ Installation

```bash
# Clone repository
git clone <your-repo-url>
cd nid-remote-web

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🔐 Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=xxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_CCTV_URL=xxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_APP_NAME="NID Remote Office"
```

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/           # Auth pages (login, otp)
│   ├── api/              # API proxy routes
│   │   ├── auth/         # sendOTP, verifyOTP, getUserData, logout
│   │   └── door/         # openDoor, closeDoor, stopDoor
│   ├── dashboard/        # Main dashboard
│   ├── history/          # Usage history pages
│   └── profile/          # User profile
├── components/
│   ├── dashboard/        # Dashboard components
│   └── ui/               # UI components (Sidebar)
├── services/             # API services
├── store/                # Zustand stores
└── hooks/                # Custom hooks
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/sendOTP` | POST | ส่ง OTP |
| `/api/auth/verifyOTP` | POST | ยืนยัน OTP |
| `/api/auth/getUserData` | POST | ดึงข้อมูล User |
| `/api/auth/logout` | POST | ออกจากระบบ |
| `/api/door/openDoor` | POST | เปิดประตู |
| `/api/door/closeDoor` | POST | ปิดประตู |
| `/api/door/stopDoor` | POST | หยุดประตู |

## 🚀 Deploy to Render

1. Push code to GitHub/GitLab
2. Connect repository to Render
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables

## 📝 License

Private - NID Progress Technology

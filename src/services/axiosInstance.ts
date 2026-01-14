import axios from 'axios';

// สร้าง Instance ของ Axios
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000, // รอสูงสุด 10 วินาที
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor: ดักจับก่อนส่ง Request (เอาไว้ใส่ Token อัตโนมัติ)
api.interceptors.request.use(
    (config) => {
        // เดี๋ยวเราจะมาแก้ตรงนี้ตอนทำ AuthStore เสร็จ
        // const token = useAuthStore.getState().token;
        const token = localStorage.getItem('nid_token'); // แบบบ้านๆ ไปก่อน

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor: ดักจับ Response (เช่น ถ้า Token หมดอายุ ให้เด้งออก)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token หมดอายุ หรือ ผิดพลาด -> เคลียร์ Token แล้ว Redirect ไปหน้า Login
            // window.location.href = '/login'; // เดี๋ยวค่อยเปิดใช้
        }
        return Promise.reject(error);
    }
);

export default api;
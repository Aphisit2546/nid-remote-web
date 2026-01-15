import api from './axiosInstance';

export const AuthService = {
    // 1. ส่ง OTP
    sendOTP: async (phone_number: string) => {
        // API: sendOTP
        const response = await api.post('/sendOTP', { phone_number });
        return response.data;
    },

    // 2. ยืนยัน OTP
    verifyOTP: async (phone_number: string, otp_code: string) => {
        // API: verifyOTP (สมมติว่าส่ง phone + code)
        const response = await api.post('/verifyOTP', {
            phone_number,
            otp_code
        });
        return response.data; // ควร return { token: '...' } กลับมา
    },

    // 3. ดึงข้อมูล User (ต้องส่ง phone_number ตามโจทย์)
    getUserData: async (phone_number: string) => {
        // API: getUserData
        // หมายเหตุ: ส่วนใหญ่ GET จะส่ง params แต่ถ้า API บังคับ Body ให้เปลี่ยนเป็น .post
        const response = await api.post('/getUserData', { phone_number });
        return response.data;
    },

    // 4. Logout (ต้องส่ง phone_number ตามโจทย์)
    logout: async (phone_number: string) => {
        try {
            await api.post('/logout', { phone_number });
        } catch (error) {
            console.error('Logout error', error);
        }
    }
};
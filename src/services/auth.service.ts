// AuthService - ใช้ API Proxy ผ่าน Next.js เพื่อ bypass CORS

export const AuthService = {
    // 1. ส่ง OTP
    sendOTP: async (phone_number: string) => {
        const response = await fetch('/api/auth/sendOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone_number }),
        });

        if (!response.ok) {
            throw new Error('Failed to send OTP');
        }

        return response.json();
    },

    // 2. ยืนยัน OTP
    verifyOTP: async (phone_number: string, otp_code: string, ref_code: string) => {
        const response = await fetch('/api/auth/verifyOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone_number, otp_code, ref_code }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.message || 'Failed to verify OTP');
        }

        return data;
    },

    // 3. ดึงข้อมูล User
    getUserData: async (phone_number: string) => {
        const token = localStorage.getItem('nid_token');

        const response = await fetch('/api/auth/getUserData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            body: JSON.stringify({ phone_number }),
        });

        if (!response.ok) {
            throw new Error('Failed to get user data');
        }

        return response.json();
    },

    // 4. Logout
    logout: async (phone_number: string) => {
        const token = localStorage.getItem('nid_token');

        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` }),
                },
                body: JSON.stringify({ phone_number }),
            });
        } catch (error) {
            // Silent fail for logout
        }
    }
};
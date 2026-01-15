import { create } from 'zustand';

interface AuthState {
    phoneNumber: string;
    token: string | null;
    refCode: string | null; // เก็บ ref_code จาก sendOTP
    setPhoneNumber: (phone: string) => void;
    setToken: (token: string) => void;
    setRefCode: (refCode: string) => void; // เพิ่ม setter
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    phoneNumber: '',
    token: null,
    refCode: null,
    setPhoneNumber: (phone) => set({ phoneNumber: phone }),
    setToken: (token) => {
        localStorage.setItem('nid_token', token);
        set({ token });
    },
    setRefCode: (refCode) => set({ refCode }),
    logout: () => {
        localStorage.removeItem('nid_token');
        set({ token: null, phoneNumber: '', refCode: null });
    },
}));
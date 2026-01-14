import { create } from 'zustand';

interface AuthState {
    phoneNumber: string;
    token: string | null;
    setPhoneNumber: (phone: string) => void;
    setToken: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    phoneNumber: '',
    token: null,
    setPhoneNumber: (phone) => set({ phoneNumber: phone }),
    setToken: (token) => {
        localStorage.setItem('nid_token', token); // เก็บลงเครื่องด้วย
        set({ token });
    },
    logout: () => {
        localStorage.removeItem('nid_token');
        set({ token: null, phoneNumber: '' });
    },
}));
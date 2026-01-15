import api from './axiosInstance';

// Helper เพื่อดึงเบอร์โทรปัจจุบันจาก Store
import { useAuthStore } from '@/store/useAuthStore';

const getPhone = () => useAuthStore.getState().phoneNumber;

export const DoorService = {
    openDoor: async () => {
        const phone_number = getPhone();
        // API: OpenDoor
        const response = await api.post('/OpenDoor', { phone_number });
        return response.data;
    },

    closeDoor: async () => {
        const phone_number = getPhone();
        // API: CloseDoor
        const response = await api.post('/CloseDoor', { phone_number });
        return response.data;
    },

    stopDoor: async () => {
        const phone_number = getPhone();
        // API: StopDoor
        const response = await api.post('/StopDoor', { phone_number });
        return response.data;
    }
};
// DoorService - ใช้ API Proxy ผ่าน Next.js เพื่อ bypass CORS

import { useAuthStore } from '@/store/useAuthStore';

const getPhone = () => useAuthStore.getState().phoneNumber;
const getToken = () => localStorage.getItem('nid_token');

export const DoorService = {
    openDoor: async () => {
        const phone_number = getPhone();
        const token = getToken();

        const response = await fetch('/api/door/openDoor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            body: JSON.stringify({ phone_number }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to open door');
        }

        return data;
    },

    closeDoor: async () => {
        const phone_number = getPhone();
        const token = getToken();

        const response = await fetch('/api/door/closeDoor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            body: JSON.stringify({ phone_number }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to close door');
        }

        return data;
    },

    stopDoor: async () => {
        const phone_number = getPhone();
        const token = getToken();

        const response = await fetch('/api/door/stopDoor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            body: JSON.stringify({ phone_number }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to stop door');
        }

        return data;
    }
};
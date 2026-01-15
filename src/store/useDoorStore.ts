import { create } from 'zustand';

// เพิ่ม 'UNKNOWN' เข้าไปใน Type
export type DoorStatus = 'UNKNOWN' | 'OPEN' | 'CLOSED' | 'OPENING' | 'CLOSING' | 'STOPPED';

interface DoorState {
    status: DoorStatus;
    percentage: number;
    setStatus: (status: DoorStatus) => void;
    setPercentage: (percentage: number | ((prev: number) => number)) => void;
}

export const useDoorStore = create<DoorState>((set) => ({
    status: 'UNKNOWN', // ✅ เริ่มต้นเป็น UNKNOWN (จะไม่แสดง %)
    percentage: 0,
    setStatus: (status) => set({ status }),
    setPercentage: (input) =>
        set((state) => {
            const newPercentage = typeof input === 'function' ? input(state.percentage) : input;
            const clamped = Math.min(Math.max(newPercentage, 0), 100);
            return { percentage: clamped };
        }),
}));
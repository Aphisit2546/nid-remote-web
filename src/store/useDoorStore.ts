import { create } from 'zustand';

export type DoorStatus = 'OPEN' | 'CLOSED' | 'OPENING' | 'CLOSING' | 'STOPPED';

interface DoorState {
    status: DoorStatus;
    percentage: number; // 0 - 100
    setStatus: (status: DoorStatus) => void;
    setPercentage: (percentage: number | ((prev: number) => number)) => void;
}

export const useDoorStore = create<DoorState>((set) => ({
    status: 'CLOSED', // เริ่มต้นสมมติว่าปิดสนิท
    percentage: 0,
    setStatus: (status) => set({ status }),
    setPercentage: (input) =>
        set((state) => {
            const newPercentage = typeof input === 'function' ? input(state.percentage) : input;
            // กันค่าไม่ให้เกิน 0-100
            const clamped = Math.min(Math.max(newPercentage, 0), 100);
            return { percentage: clamped };
        }),
}));
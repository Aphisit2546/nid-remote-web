import { useRef, useEffect, useCallback } from 'react';
import { useDoorStore, DoorStatus } from '@/store/useDoorStore';

// Config เวลา (วินาที)
const DURATION_OPEN = 46;
const DURATION_CLOSE = 44;

// ความถี่ในการอัปเดต (ms) - ยิ่งน้อยยิ่งลื่น แต่กิน CPU
const TICK_RATE = 100;

export const useDoorControl = () => {
    const { status, percentage, setStatus, setPercentage } = useDoorStore();

    // ใช้ Ref เพื่อเก็บ Interval ID (ตัวนับเวลา)
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // ฟังก์ชันเคลียร์ตัวนับเวลา (หยุดคำนวณ)
    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    // 1. Logic สั่งเปิดประตู (OPEN)
    const openDoor = useCallback(() => {
        if (status === 'OPEN' || status === 'OPENING') return; // กันกดซ้ำ

        setStatus('OPENING');
        clearTimer();

        // คำนวณ: ต้องเพิ่มทีละกี่ % ถึงจะครบ 100 ใน 46 วิ
        // สูตร: (100% / 46วิ) * (0.1วิ คือ Tick Rate)
        const step = (100 / DURATION_OPEN) * (TICK_RATE / 1000);

        timerRef.current = setInterval(() => {
            setPercentage((prev) => {
                const next = prev + step;
                if (next >= 100) {
                    clearTimer();
                    setStatus('OPEN'); // ถึงเป้าหมาย
                    return 100;
                }
                return next;
            });
        }, TICK_RATE);
    }, [status, setStatus, setPercentage, clearTimer]);

    // 2. Logic สั่งปิดประตู (CLOSE)
    const closeDoor = useCallback(() => {
        if (status === 'CLOSED' || status === 'CLOSING') return; // กันกดซ้ำ

        setStatus('CLOSING');
        clearTimer();

        // คำนวณ: ต้องลดทีละกี่ % ถึงจะเหลือ 0 ใน 44 วิ
        const step = (100 / DURATION_CLOSE) * (TICK_RATE / 1000);

        timerRef.current = setInterval(() => {
            setPercentage((prev) => {
                const next = prev - step;
                if (next <= 0) {
                    clearTimer();
                    setStatus('CLOSED'); // ถึงเป้าหมาย
                    return 0;
                }
                return next;
            });
        }, TICK_RATE);
    }, [status, setStatus, setPercentage, clearTimer]);

    // 3. Logic สั่งหยุด (STOP)
    const stopDoor = useCallback(() => {
        clearTimer();
        setStatus('STOPPED');
        // เปอร์เซ็นต์ค้างที่เท่าไหร่ ก็อยู่ที่เดิม
    }, [clearTimer, setStatus]);

    // Cleanup: ถ้า Component ถูกทำลาย ให้หยุด Loop ทันที (กัน Memory Leak)
    useEffect(() => {
        return () => clearTimer();
    }, [clearTimer]);

    return {
        status,
        percentage,
        openDoor,
        closeDoor,
        stopDoor,
    };
};
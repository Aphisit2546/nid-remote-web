import { useRef, useState, useCallback, useEffect } from 'react';
import { useDoorStore } from '@/store/useDoorStore';
import { DoorService } from '@/services/door.service';

// ✅ Config เวลาตามโจทย์เป๊ะๆ
const DURATION_OPEN = 46;  // 0 -> 100 ใช้ 46 วินาที
const DURATION_CLOSE = 44; // 100 -> 0 ใช้ 44 วินาที
const TICK_RATE = 100;     // อัปเดตทุก 0.1 วินาที

export const useDoorControl = () => {
    const { status, percentage, setStatus, setPercentage } = useDoorStore();
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // ฟังก์ชันช่วยเคลียร์ Timer
    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    // ----------------------------------------------------
    // 1. OPEN LOGIC
    // ----------------------------------------------------
    const openDoor = useCallback(async () => {
        // ✅ กฏเหล็ก:
        // 1. ห้ามกดถ้ากำลังโหลด
        // 2. ห้ามกดถ้าเปิดสุดแล้ว (OPEN)
        // 3. ห้ามกดถ้าประตูกำลังเลื่อนไม่ว่าทิศทางไหน (OPENING หรือ CLOSING) -> ต้องกด STOP ก่อน
        if (isLoading || status === 'OPEN' || status === 'OPENING' || status === 'CLOSING') return;

        try {
            setIsLoading(true);
            await DoorService.openDoor(); // ยิง API

            setStatus('OPENING');
            clearTimer();

            // สูตรคำนวณ Step: (100% / 46วิ) * 0.1วิ
            const step = (100 / DURATION_OPEN) * (TICK_RATE / 1000);

            timerRef.current = setInterval(() => {
                setPercentage((prev) => {
                    const next = prev + step;
                    if (next >= 100) {
                        clearTimer();
                        setStatus('OPEN'); // ถึง 100% คือ FULLY OPEN
                        return 100;
                    }
                    return next;
                });
            }, TICK_RATE);

        } catch (error) {
            console.error(error);
            alert('Error connecting to server');
        } finally {
            setIsLoading(false);
        }
    }, [status, isLoading, setStatus, setPercentage, clearTimer]);

    // ----------------------------------------------------
    // 2. CLOSE LOGIC
    // ----------------------------------------------------
    const closeDoor = useCallback(async () => {
        // ✅ กฏเหล็กเดียวกัน: ถ้ากำลังเลื่อน (ไม่ว่าทางไหน) ห้ามกด ต้อง STOP ก่อน
        if (isLoading || status === 'CLOSED' || status === 'CLOSING' || status === 'OPENING') return;

        try {
            setIsLoading(true);
            await DoorService.closeDoor();

            setStatus('CLOSING');
            clearTimer();

            // สูตรคำนวณ Step: (100% / 44วิ) * 0.1วิ (เร็วกว่าตอนเปิดนิดนึง)
            const step = (100 / DURATION_CLOSE) * (TICK_RATE / 1000);

            timerRef.current = setInterval(() => {
                setPercentage((prev) => {
                    const next = prev - step;
                    if (next <= 0) {
                        clearTimer();
                        setStatus('CLOSED'); // ถึง 0% คือ FULLY CLOSED
                        return 0;
                    }
                    return next;
                });
            }, TICK_RATE);

        } catch (error) {
            console.error(error);
            alert('Error connecting to server');
        } finally {
            setIsLoading(false);
        }
    }, [status, isLoading, setStatus, setPercentage, clearTimer]);

    // ----------------------------------------------------
    // 3. STOP LOGIC
    // ----------------------------------------------------
    const stopDoor = useCallback(async () => {
        try {
            setIsLoading(true);
            await DoorService.stopDoor();

            clearTimer();
            setStatus('STOPPED'); // ✅ หยุดแล้ว สถานะเป็น STOPPED (กด Open/Close ต่อได้)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [clearTimer, setStatus]);

    useEffect(() => {
        return () => clearTimer();
    }, [clearTimer]);

    return { status, percentage, isLoading, openDoor, closeDoor, stopDoor };
};
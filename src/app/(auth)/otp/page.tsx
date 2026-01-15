'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { ChevronLeft } from 'lucide-react';
import { AuthService } from '@/services/auth.service'; // 1. Import Service

// Assets
import desktopBg from '@/image/DesktopBG.png';
import logo from '@/image/Logo.png';

export default function OTPPage() {
    const router = useRouter();
    const phoneNumber = useAuthStore((state) => state.phoneNumber);
    const setToken = useAuthStore((state) => state.setToken);

    // OTP 6 หลัก
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [countdown, setCountdown] = useState(88);
    const [isLoading, setIsLoading] = useState(false); // 2. เพิ่ม Loading State

    useEffect(() => {
        // ถ้าไม่มีเบอร์โทร (Refresh หน้า) ให้กลับไป Login
        if (!phoneNumber) router.push('/login');
    }, [phoneNumber, router]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const formatCountdown = () => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        const fullOtp = newOtp.join('');
        // ถ้ากรอกครบ 6 หลัก และไม่ได้กำลังโหลดอยู่ ให้ Verify ทันที
        if (fullOtp.length === 6 && index === 5 && value && !isLoading) {
            verifyOTP(fullOtp);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // 3. ฟังก์ชัน Verify OTP กับ API จริง
    const verifyOTP = async (code: string) => {
        if (isLoading) return; // ป้องกันการเรียกซ้ำ

        try {
            setIsLoading(true); // เริ่มโหลด

            // เรียก API (ส่งเบอร์โทรและรหัส OTP)
            const response = await AuthService.verifyOTP(phoneNumber, code);

            // เช็คว่ามี Token กลับมาไหม (โครงสร้างขึ้นอยู่กับ API จริง ส่วนใหญ่จะอยู่ใน response.token หรือ response.data.token)
            const token = response.token || response.data?.token;

            if (token) {
                setToken(token); // เก็บ Token
                router.push('/dashboard'); // ไปหน้า Dashboard
            } else {
                throw new Error('ไม่ได้รับ Token จากระบบ');
            }

        } catch (error) {
            console.error('Verify OTP Error:', error);
            alert('รหัส OTP ไม่ถูกต้อง หรือหมดอายุ กรุณาลองใหม่');

            // เคลียร์ค่าเพื่อให้กรอกใหม่
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setIsLoading(false); // หยุดโหลด
        }
    };

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            {/* Background Image */}
            <Image
                src={desktopBg}
                alt="Background"
                fill
                style={{ objectFit: 'cover' }}
                priority
                quality={100}
            />

            {/* Content */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem'
            }}>

                {/* Back Button */}
                <button
                    onClick={() => !isLoading && router.back()} // ห้ามกดกลับตอนโหลด
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        padding: '0.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '0.75rem',
                        border: 'none',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: isLoading ? 0.5 : 1
                    }}
                    disabled={isLoading}
                    suppressHydrationWarning
                >
                    <ChevronLeft style={{ width: '1.5rem', height: '1.5rem', color: '#1e3a5f' }} />
                </button>

                {/* Logo Section */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginTop: '3rem',
                    marginBottom: '1rem'
                }}>
                    <div style={{ width: '9rem', marginBottom: '0.5rem' }}>
                        <Image
                            src={logo}
                            alt="NID Progress Technology"
                            width={180}
                            height={100}
                            style={{ width: '100%', height: 'auto' }}
                            priority
                        />
                    </div>
                </div>

                {/* OTP Title */}
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#000',
                        marginBottom: '0.5rem',
                        margin: 0
                    }}>
                        {isLoading ? 'กำลังตรวจสอบ...' : 'ยืนยันรหัส OTP'}
                    </h2>
                    <p style={{
                        color: 'rgba(0, 0, 0, 0.7)',
                        fontSize: '0.8rem',
                        margin: '0.5rem 0 0 0'
                    }}>
                        กรุณากรอก OTP 6 หลัก ที่ส่งไปยัง {phoneNumber || '08x-xxx-xxxx'}
                    </p>
                </div>

                {/* OTP Input Boxes - Responsive */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    marginBottom: '1.25rem',
                    width: '100%',
                    maxWidth: '20rem',
                    padding: '0 0.5rem',
                    boxSizing: 'border-box'
                }}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el }}
                            type="tel"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            disabled={isLoading} // ล็อคช่องเมื่อกำลังโหลด
                            style={{
                                flex: 1,
                                minWidth: 0,
                                maxWidth: '2.8rem',
                                height: '2.8rem',
                                border: '2px solid rgba(59, 130, 246, 0.5)',
                                backgroundColor: isLoading ? '#f3f4f6' : 'rgba(255, 255, 255, 0.95)',
                                borderRadius: '0.6rem',
                                textAlign: 'center',
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                color: '#1f2937',
                                outline: 'none',
                                boxSizing: 'border-box',
                                opacity: isLoading ? 0.7 : 1
                            }}
                            suppressHydrationWarning
                        />
                    ))}
                </div>

                {/* Resend Timer */}
                <div style={{ textAlign: 'center' }}>
                    <p style={{
                        color: 'rgba(0, 0, 0, 0.7)',
                        fontSize: '0.875rem',
                        margin: 0
                    }}>
                        ส่งรหัสอีกครั้ง <span style={{ color: '#2563eb', fontWeight: 'bold' }}>{formatCountdown()}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { AuthService } from '@/services/auth.service'; // เพิ่ม Import Service

// Assets
import desktopBg from '@/image/DesktopBG.png';
import logo from '@/image/Logo.png';

export default function LoginPage() {
    const router = useRouter();
    const setPhoneNumber = useAuthStore((state) => state.setPhoneNumber);
    const [inputPhone, setInputPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false); // เพิ่ม State Loading เพื่อกันกดซ้ำ

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate Phone (10 digits)
        if (inputPhone.length !== 10 || isNaN(Number(inputPhone))) {
            alert('กรุณากรอกเบอร์โทรศัพท์ 10 หลักให้ถูกต้อง');
            return;
        }

        try {
            setIsLoading(true); // เริ่มโหลด

            // 1. เรียก API ส่ง OTP จริง
            // (ต้องมั่นใจว่าไฟล์ src/services/auth.service.ts สร้างเสร็จแล้วตามขั้นตอนก่อนหน้า)
            await AuthService.sendOTP(inputPhone);

            // 2. ถ้า API ผ่าน ให้เก็บเบอร์ลง Store แล้วไปหน้าถัดไป
            setPhoneNumber(inputPhone);
            router.push('/otp');

        } catch (error) {
            console.error('Login Error:', error);
            // แจ้งเตือนเมื่อส่ง OTP ไม่ผ่าน
            alert('ไม่สามารถส่ง OTP ได้ กรุณาตรวจสอบเบอร์โทรศัพท์ หรือการเชื่อมต่อ Server');
        } finally {
            setIsLoading(false); // หยุดโหลด
        }
    };

    // Styles (เหมือนเดิมทุกประการ)
    const containerStyle: React.CSSProperties = {
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
    };

    const contentStyle: React.CSSProperties = {
        position: 'relative',
        zIndex: 10,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem 1.25rem'
    };

    const logoSectionStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '1rem'
    };

    const cardStyle: React.CSSProperties = {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        width: '100%',
        maxWidth: '22rem',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)'
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '1.25rem',
        color: '#2563eb'
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '0.5rem'
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '0.875rem 1rem',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        fontSize: '1rem',
        color: '#1f2937',
        outline: 'none',
        boxSizing: 'border-box'
    };

    const hintStyle: React.CSSProperties = {
        fontSize: '0.7rem',
        color: '#9ca3af',
        textAlign: 'center',
        marginTop: '0.5rem'
    };

    const buttonStyle: React.CSSProperties = {
        width: '100%',
        backgroundColor: isLoading ? '#93c5fd' : '#3b82f6', // เปลี่ยนสีตอนโหลด
        color: 'white',
        fontWeight: '600',
        padding: '0.875rem',
        borderRadius: '9999px',
        border: 'none',
        cursor: isLoading ? 'not-allowed' : 'pointer', // ห้ามกดตอนโหลด
        fontSize: '1rem',
        marginTop: '1rem',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)',
        transition: 'background-color 0.2s'
    };

    return (
        <div style={containerStyle}>
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
            <div style={contentStyle}>

                {/* Logo Section */}
                <div style={logoSectionStyle}>
                    <div style={{ width: '10rem', marginBottom: '0.75rem' }}>
                        <Image
                            src={logo}
                            alt="NID Progress Technology"
                            width={200}
                            height={120}
                            style={{ width: '100%', height: 'auto' }}
                            priority
                        />
                    </div>

                    <h1 style={{ color: '#000000ff', fontWeight: 'bold', fontSize: '1rem', lineHeight: '1.4', textAlign: 'center', margin: 0 }}>
                        ระบบเปิด-ปิดประตูม้วนเหล็กระยะไกล
                    </h1>
                    <p style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        Remote Rolling Shutter Door Control Application
                    </p>
                </div>

                {/* Login Card */}
                <div style={cardStyle}>
                    <h2 style={titleStyle}>เข้าสู่ระบบ</h2>

                    <form onSubmit={handleLogin} suppressHydrationWarning>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <label htmlFor="phone" style={labelStyle}>
                                เบอร์โทรศัพท์
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                maxLength={10}
                                placeholder="กรอกเบอร์โทรศัพท์ 10 หลัก"
                                style={inputStyle}
                                value={inputPhone}
                                onChange={(e) => setInputPhone(e.target.value)}
                                disabled={isLoading} // ล็อกช่องกรอกตอนโหลด
                                suppressHydrationWarning
                            />
                            <p style={hintStyle}>
                                ***เบอร์โทรศัพท์ที่ลงทะเบียนในระบบ***
                            </p>
                        </div>

                        <button type="submit" style={buttonStyle} disabled={isLoading}>
                            {isLoading ? 'กำลังส่งข้อมูล...' : 'ขอรหัส OTP'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
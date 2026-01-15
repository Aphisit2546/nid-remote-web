'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/ui/Sidebar';
import { useAuthStore } from '@/store/useAuthStore';

// Assets
import desktopBg from '@/image/DesktopBG.png';
import mobileBg from '@/image/MobileBG.png';
import logo from '@/image/Logo.png';

export default function HistoryPage() {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token, router]);

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Background Image */}
            <Image
                src={desktopBg}
                alt="Background"
                fill
                style={{ objectFit: 'cover', zIndex: 0 }}
                priority
                quality={100}
            />

            {/* Sidebar Component */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Header - Compact */}
            <header style={{
                position: 'relative',
                zIndex: 20,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0.75rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '2rem' }}>
                        <Image
                            src={logo}
                            alt="NID"
                            width={40}
                            height={24}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <h1 style={{
                        fontWeight: 'bold',
                        color: '#000',
                        fontSize: '0.875rem',
                        margin: 0
                    }}>
                        NID Remote Office
                    </h1>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    style={{
                        padding: '0.375rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    suppressHydrationWarning
                >
                    <Menu style={{ width: '1.25rem', height: '1.25rem', color: '#000' }} />
                </button>
            </header>

            {/* Main Content */}
            <main style={{
                position: 'relative',
                zIndex: 10,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                maxWidth: '24rem',
                margin: '0 auto',
                width: '100%'
            }}>
                {/* Content Card */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    width: '100%',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)'
                }}>
                    {/* Title */}
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        textAlign: 'center',
                        marginBottom: '1rem'
                    }}>
                        จัดการข้อมูล
                    </h2>

                    {/* Grid Buttons */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '0.75rem'
                    }}>
                        {/* ปุ่ม 1: ประวัติการใช้งานระบบ */}
                        <button
                            onClick={() => router.push('/history/System')}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '0',
                                border: 'none',
                                borderRadius: '0.75rem',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            {/* Icon Area with MobileBG background */}
                            <div style={{
                                width: '100%',
                                aspectRatio: '1',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                <Image
                                    src={mobileBg}
                                    alt="Background"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                {/* Document Icon */}
                                <svg width="60" height="70" viewBox="0 0 60 70" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                                    <rect x="5" y="0" width="45" height="60" rx="4" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                                    <rect x="10" y="5" width="10" height="10" rx="2" fill="#f59e0b" />
                                    <line x1="25" y1="8" x2="45" y2="8" stroke="#d1d5db" strokeWidth="2" />
                                    <line x1="25" y1="12" x2="40" y2="12" stroke="#d1d5db" strokeWidth="2" />
                                    <line x1="10" y1="22" x2="45" y2="22" stroke="#d1d5db" strokeWidth="2" />
                                    <line x1="10" y1="28" x2="45" y2="28" stroke="#d1d5db" strokeWidth="2" />
                                    <line x1="10" y1="34" x2="45" y2="34" stroke="#d1d5db" strokeWidth="2" />
                                    <line x1="10" y1="40" x2="35" y2="40" stroke="#d1d5db" strokeWidth="2" />
                                    <line x1="10" y1="46" x2="45" y2="46" stroke="#d1d5db" strokeWidth="2" />
                                    <line x1="10" y1="52" x2="30" y2="52" stroke="#d1d5db" strokeWidth="2" />
                                </svg>
                            </div>
                            {/* Label - Orange */}
                            <div style={{
                                width: '100%',
                                backgroundColor: '#f59e0b',
                                padding: '0.5rem',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.7rem',
                                textAlign: 'center'
                            }}>
                                ประวัติการใช้งานระบบ
                            </div>
                        </button>

                        {/* ปุ่ม 2: ประวัติการใช้งานประตู */}
                        <button
                            onClick={() => router.push('/history/door')}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '0',
                                border: 'none',
                                borderRadius: '0.75rem',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            {/* Icon Area with MobileBG background */}
                            <div style={{
                                width: '100%',
                                aspectRatio: '1',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}>
                                <Image
                                    src={mobileBg}
                                    alt="Background"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                {/* Door/Shutter Icon */}
                                <svg width="60" height="70" viewBox="0 0 60 70" fill="none" style={{ position: 'relative', zIndex: 1 }}>
                                    <rect x="5" y="0" width="45" height="60" rx="4" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                                    <line x1="10" y1="8" x2="45" y2="8" stroke="#d1d5db" strokeWidth="3" />
                                    <line x1="10" y1="15" x2="45" y2="15" stroke="#d1d5db" strokeWidth="3" />
                                    <line x1="10" y1="22" x2="45" y2="22" stroke="#d1d5db" strokeWidth="3" />
                                    <line x1="10" y1="29" x2="45" y2="29" stroke="#d1d5db" strokeWidth="3" />
                                    <line x1="10" y1="36" x2="45" y2="36" stroke="#d1d5db" strokeWidth="3" />
                                    <line x1="10" y1="43" x2="45" y2="43" stroke="#d1d5db" strokeWidth="3" />
                                    <line x1="10" y1="50" x2="45" y2="50" stroke="#d1d5db" strokeWidth="3" />
                                </svg>
                            </div>
                            {/* Label - Orange */}
                            <div style={{
                                width: '100%',
                                backgroundColor: '#f59e0b',
                                padding: '0.5rem',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '0.7rem',
                                textAlign: 'center'
                            }}>
                                ประวัติการใช้งานประตู
                            </div>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
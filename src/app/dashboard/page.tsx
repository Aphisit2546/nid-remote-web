'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { useDoorControl } from '@/hooks/useDoorControl';
import { Menu } from 'lucide-react';
import CCTVView from '@/components/dashboard/CCTVView';
import DoorStatus from '@/components/dashboard/DoorStatus';
import Sidebar from '@/components/ui/Sidebar';

// Assets
import desktopBg from '@/image/DesktopBG.png';
import logo from '@/image/Logo.png';

export default function DashboardPage() {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { status, percentage, openDoor, closeDoor, stopDoor } = useDoorControl();

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

            {/* Main Content - Compact */}
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
                width: '100%',
                gap: '0.5rem'
            }}>
                {/* CCTV View Card */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '1rem',
                    padding: '0.5rem',
                    width: '100%',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)'
                }}>
                    <CCTVView />
                </div>

                {/* Control Card */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '1rem',
                    padding: '0.75rem',
                    width: '100%',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <DoorStatus percentage={percentage} status={status} />

                    {/* Control Buttons - Compact */}
                    <div style={{ width: '100%', marginTop: '0.5rem' }}>
                        {/* OPEN Button */}
                        <button
                            onClick={openDoor}
                            disabled={status === 'OPENING' || status === 'OPEN'}
                            style={{
                                width: '100%',
                                backgroundColor: status === 'OPENING' || status === 'OPEN' ? '#d1d5db' : '#22c55e',
                                color: 'white',
                                padding: '0.625rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: status === 'OPENING' || status === 'OPEN' ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                marginBottom: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.25rem'
                            }}
                        >
                            ↑ OPEN/เปิด
                        </button>

                        {/* STOP Button */}
                        <button
                            onClick={stopDoor}
                            style={{
                                width: '100%',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                padding: '0.625rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                marginBottom: '0.5rem'
                            }}
                        >
                            STOP/หยุด
                        </button>

                        {/* CLOSE Button */}
                        <button
                            onClick={closeDoor}
                            disabled={status === 'CLOSING' || status === 'CLOSED'}
                            style={{
                                width: '100%',
                                backgroundColor: status === 'CLOSING' || status === 'CLOSED' ? '#d1d5db' : '#f59e0b',
                                color: 'white',
                                padding: '0.625rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                cursor: status === 'CLOSING' || status === 'CLOSED' ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.25rem'
                            }}
                        >
                            ↓ CLOSE/ปิด
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
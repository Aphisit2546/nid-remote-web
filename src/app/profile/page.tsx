'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/ui/Sidebar';
import { useAuthStore } from '@/store/useAuthStore';

// Assets
import desktopBg from '@/image/DesktopBG.png';
import logo from '@/image/Logo.png';

// User data type - จะถูกดึงจาก API
interface UserData {
    name: string;
    email: string;
    position: string;
    phone: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // User data - ว่างเปล่าจนกว่าจะดึงข้อมูลจาก API
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }

        // TODO: ดึงข้อมูลจาก getUserData API
        // สำหรับตอนนี้จะแสดง placeholder
        setIsLoading(false);
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

            {/* Header */}
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
                    <h1 style={{ fontWeight: 'bold', color: '#000', fontSize: '0.875rem', margin: 0 }}>
                        NID Remote Office
                    </h1>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    style={{ padding: '0.375rem', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
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
                {/* Profile Card */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '0.75rem',
                    padding: '1.25rem 1rem',
                    width: '100%',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)'
                }}>
                    {/* Page Title */}
                    <h2 style={{
                        fontSize: '1.125rem',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        margin: 0,
                        marginBottom: '1.25rem',
                        textAlign: 'center'
                    }}>
                        ข้อมูลโปรไฟล์
                    </h2>

                    {isLoading ? (
                        <div style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
                            กำลังโหลด...
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                            {/* ชื่อ */}
                            <div>
                                <span style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    color: '#1f2937'
                                }}>
                                    ชื่อ :
                                </span>
                                <span style={{
                                    fontSize: '0.9rem',
                                    color: '#6b7280',
                                    marginLeft: '0.5rem'
                                }}>
                                    {userData?.name || 'xxxx xxxxx'}
                                </span>
                            </div>

                            {/* อีเมล */}
                            <div>
                                <span style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    color: '#1f2937'
                                }}>
                                    อีเมล :
                                </span>
                                <span style={{
                                    fontSize: '0.9rem',
                                    color: '#6b7280',
                                    marginLeft: '0.5rem'
                                }}>
                                    {userData?.email || 'xxxx@xxxxx.com'}
                                </span>
                            </div>

                            {/* ตำแหน่ง */}
                            <div>
                                <span style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    color: '#1f2937'
                                }}>
                                    ตำแหน่ง :
                                </span>
                                <span style={{
                                    fontSize: '0.9rem',
                                    color: '#6b7280',
                                    marginLeft: '0.5rem'
                                }}>
                                    {userData?.position || 'xxxxxxxx'}
                                </span>
                            </div>

                            {/* เบอร์โทรศัพท์ */}
                            <div>
                                <span style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    color: '#1f2937'
                                }}>
                                    เบอร์โทรศัพท์ :
                                </span>
                                <span style={{
                                    fontSize: '0.9rem',
                                    color: '#6b7280',
                                    marginLeft: '0.5rem'
                                }}>
                                    {userData?.phone || 'xxxxxxxxxx'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { X, Home, FileText, LogOut, User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const logout = useAuthStore((state) => state.logout);
    const prevPathnameRef = useRef(pathname);

    // ปิดเมนูอัตโนมัติเมื่อเปลี่ยนหน้า (เฉพาะเมื่อ pathname เปลี่ยนจริงๆ)
    useEffect(() => {
        if (prevPathnameRef.current !== pathname) {
            prevPathnameRef.current = pathname;
            onClose();
        }
    }, [pathname, onClose]);

    const handleLogout = () => {
        onClose();
        logout();
        router.push('/login');
    };

    const handleMenuClick = (path: string) => {
        onClose();
        router.push(path);
    };

    const menuItems = [
        { icon: Home, label: 'หน้าหลัก', path: '/dashboard' },
        { icon: FileText, label: 'จัดการข้อมูล / ประวัติ', path: '/history' },
        { icon: User, label: 'โปรไฟล์', path: '/profile' },
    ];

    // ถ้าไม่เปิด ไม่ต้อง render อะไรเลย
    if (!isOpen) {
        return null;
    }

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 60,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)'
                }}
            />

            {/* Drawer */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    zIndex: 70,
                    height: '100%',
                    width: '280px',
                    backgroundColor: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header ของเมนู */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.5rem',
                    borderBottom: '1px solid #e5e7eb'
                }}>
                    <h2 style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937', margin: 0 }}>
                        เมนูหลัก
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.25rem',
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '50%'
                        }}
                    >
                        <X style={{ width: '1.5rem', height: '1.5rem', color: '#6b7280' }} />
                    </button>
                </div>

                {/* รายการเมนู */}
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => handleMenuClick(item.path)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '0.75rem',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: pathname === item.path ? '#eff6ff' : 'transparent',
                                color: pathname === item.path ? '#2563eb' : '#4b5563',
                                fontWeight: pathname === item.path ? 'bold' : 'normal',
                                fontSize: '1rem',
                                textAlign: 'left'
                            }}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* ปุ่ม Logout ด้านล่างสุด */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    padding: '1rem',
                    borderTop: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb'
                }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            justifyContent: 'center',
                            color: '#dc2626',
                            padding: '0.75rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: 'transparent',
                            fontWeight: '500',
                            fontSize: '1rem'
                        }}
                    >
                        <LogOut size={20} />
                        ออกจากระบบ
                    </button>
                </div>
            </div>
        </>
    );
}
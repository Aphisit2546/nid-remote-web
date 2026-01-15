'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Menu, ChevronLeft, Search, Printer, ChevronRight } from 'lucide-react';
import Sidebar from '@/components/ui/Sidebar';
import { useAuthStore } from '@/store/useAuthStore';

// Assets
import desktopBg from '@/image/DesktopBG.png';
import logo from '@/image/Logo.png';

// Mock data for demonstration
const mockData: { id: number; action: string; datetime: string }[] = [];

export default function SystemHistoryPage() {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [statusFilters, setStatusFilters] = useState<{ login: boolean; logout: boolean }>({
        login: false,
        logout: false
    });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token, router]);

    const totalItems = 50;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

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
                {/* Content Card */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '1rem',
                    padding: '0.75rem',
                    width: '100%',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)'
                }}>
                    {/* Page Title with Back Button */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <button
                            onClick={() => router.back()}
                            style={{
                                padding: '0.25rem',
                                backgroundColor: 'transparent',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.375rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <ChevronLeft style={{ width: '1rem', height: '1rem', color: '#374151' }} />
                        </button>
                        <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                            ประวัติการใช้งานระบบ
                        </h2>
                    </div>

                    {/* Status Filter (Checkbox) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#374151' }}>สถานะ</span>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#374151' }}>
                            <input
                                type="checkbox"
                                checked={statusFilters.login}
                                onChange={(e) => setStatusFilters(prev => ({ ...prev, login: e.target.checked }))}
                                style={{ width: '0.875rem', height: '0.875rem' }}
                                suppressHydrationWarning
                            />
                            เข้าสู่ระบบ
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#374151' }}>
                            <input
                                type="checkbox"
                                checked={statusFilters.logout}
                                onChange={(e) => setStatusFilters(prev => ({ ...prev, logout: e.target.checked }))}
                                style={{ width: '0.875rem', height: '0.875rem' }}
                                suppressHydrationWarning
                            />
                            ออกจากระบบ
                        </label>
                    </div>

                    {/* Date Filters - Two Column Layout */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                    }}>
                        {/* วันเริ่มต้น */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <span style={{
                                fontSize: '0.65rem',
                                color: '#374151',
                                marginBottom: '0.125rem'
                            }}>
                                วันเริ่มต้น
                            </span>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                style={{
                                    width: '100%',
                                    minWidth: 0,
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.25rem',
                                    padding: '0.375rem 0.25rem',
                                    backgroundColor: 'white',
                                    fontSize: '0.7rem',
                                    color: '#374151',
                                    boxSizing: 'border-box'
                                }}
                                suppressHydrationWarning
                            />
                        </div>

                        {/* วันสิ้นสุด */}
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <span style={{
                                fontSize: '0.65rem',
                                color: '#374151',
                                marginBottom: '0.125rem'
                            }}>
                                วันสิ้นสุด
                            </span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                style={{
                                    width: '100%',
                                    minWidth: 0,
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.25rem',
                                    padding: '0.375rem 0.25rem',
                                    backgroundColor: 'white',
                                    fontSize: '0.7rem',
                                    color: '#374151',
                                    boxSizing: 'border-box'
                                }}
                                suppressHydrationWarning
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <button style={{
                        width: '100%',
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '0.5rem',
                        borderRadius: '1.5rem',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        marginBottom: '0.5rem'
                    }}>
                        <Search style={{ width: '1rem', height: '1rem' }} />
                        ค้นหา
                    </button>

                    {/* Items Per Page & Print */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <span style={{ fontSize: '0.7rem', color: '#374151' }}>แสดง</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                style={{
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.25rem',
                                    padding: '0.125rem 0.25rem',
                                    fontSize: '0.7rem',
                                    backgroundColor: 'white'
                                }}
                                suppressHydrationWarning
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                            </select>
                            <span style={{ fontSize: '0.7rem', color: '#374151' }}>รายการ</span>
                        </div>
                        <button style={{
                            padding: '0.25rem',
                            backgroundColor: 'transparent',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.25rem',
                            cursor: 'pointer'
                        }}>
                            <Printer style={{ width: '1rem', height: '1rem', color: '#6b7280' }} />
                        </button>
                    </div>

                    {/* Data Table */}
                    <div style={{ overflowX: 'auto', marginBottom: '0.5rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.7rem' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f3f4f6' }}>
                                    <th style={{ padding: '0.375rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>ลำดับ</th>
                                    <th style={{ padding: '0.375rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>การใช้งาน</th>
                                    <th style={{ padding: '0.375rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>วันที่สร้าง</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockData.map((item, index) => (
                                    <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                                        <td style={{ padding: '0.375rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>{item.id}</td>
                                        <td style={{ padding: '0.375rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>{item.action}</td>
                                        <td style={{ padding: '0.375rem', textAlign: 'center', borderBottom: '1px solid #e5e7eb', color: '#374151' }}>{item.datetime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination - แสดงเมื่อมีข้อมูลจาก API */}
                    {mockData.length > 0 && (
                        <>
                            {/* Pagination Info */}
                            <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#374151', marginBottom: '0.5rem' }}>
                                แสดง 1 ถึง {itemsPerPage} จาก {mockData.length} รายการ
                            </p>

                            {/* Pagination Buttons */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        backgroundColor: 'transparent',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer',
                                        fontSize: '0.65rem',
                                        color: '#374151'
                                    }}
                                >
                                    หน้าแรก
                                </button>
                                <button
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        backgroundColor: '#f59e0b',
                                        border: 'none',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer',
                                        fontSize: '0.65rem',
                                        color: 'white'
                                    }}
                                >
                                    หน้าสุดท้าย
                                </button>
                                {[1, 2, 3, 4].map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        style={{
                                            width: '1.5rem',
                                            height: '1.5rem',
                                            backgroundColor: currentPage === page ? '#3b82f6' : 'transparent',
                                            border: currentPage === page ? 'none' : '1px solid #d1d5db',
                                            borderRadius: '0.25rem',
                                            cursor: 'pointer',
                                            fontSize: '0.65rem',
                                            color: currentPage === page ? 'white' : '#374151'
                                        }}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        backgroundColor: 'transparent',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer',
                                        fontSize: '0.65rem',
                                        color: '#374151'
                                    }}
                                >
                                    ก่อนหน้า
                                </button>
                                <button
                                    style={{
                                        padding: '0.25rem 0.5rem',
                                        backgroundColor: '#3b82f6',
                                        border: 'none',
                                        borderRadius: '0.25rem',
                                        cursor: 'pointer',
                                        fontSize: '0.65rem',
                                        color: 'white'
                                    }}
                                >
                                    ถัดไป
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

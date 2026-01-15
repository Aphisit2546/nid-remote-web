'use client';

import { useState, useEffect } from 'react';

export default function CCTVView() {
    // ดึง URL จาก .env แทนการ Hardcode
    // (ถ้ายังไม่ได้ตั้งค่า ให้ไปที่ไฟล์ .env.local แล้วเพิ่มบรรทัด: NEXT_PUBLIC_CCTV_URL=https://accessio.nidpro.tech/cctv.jpg)
    const cctvUrl = process.env.NEXT_PUBLIC_CCTV_URL || '';

    const [imageUrl, setImageUrl] = useState(cctvUrl);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!cctvUrl) return; // ถ้าไม่มี URL ไม่ต้องทำงาน

        const updateImage = () => {
            // เติม timestamp เพื่อบังคับโหลดภาพใหม่ (กัน Cache)
            setImageUrl(`${cctvUrl}?t=${Date.now()}`);
        };

        // Refresh ทุก 0.5 วินาที
        const intervalId = setInterval(updateImage, 500);
        return () => clearInterval(intervalId);
    }, [cctvUrl]);

    return (
        <div style={{
            width: '100%',
            aspectRatio: '16/9',
            backgroundColor: '#000',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {!error && cctvUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={imageUrl}
                    alt="Live CCTV"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    onError={() => setError(true)}
                />
            ) : (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280',
                    backgroundColor: '#e5e7eb',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <p style={{ margin: 0 }}>ไม่สามารถเชื่อมต่อกล้องได้</p>
                    {!cctvUrl && <p style={{ fontSize: '0.7rem', color: '#ef4444' }}>(ไม่พบ URL กล้องใน .env)</p>}
                </div>
            )}

            {/* Badge สถานะ LIVE */}
            <div style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: 'rgba(0,0,0,0.6)',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem'
            }}>
                <span style={{
                    width: '0.4rem',
                    height: '0.4rem',
                    borderRadius: '50%',
                    backgroundColor: '#ef4444'
                }}></span>
                <span style={{
                    fontSize: '0.6rem',
                    color: 'white',
                    fontWeight: 'bold'
                }}>LIVE</span>
            </div>
        </div>
    );
}
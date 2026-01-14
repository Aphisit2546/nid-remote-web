'use client';

import { useState, useEffect } from 'react';

// URL กล้องจาก Requirement
const CCTV_URL = 'https://accessio.nidpro.tech/cctv.jpg';

export default function CCTVView() {
    const [imageUrl, setImageUrl] = useState(CCTV_URL);
    const [error, setError] = useState(false);

    useEffect(() => {
        const updateImage = () => {
            setImageUrl(`${CCTV_URL}?t=${Date.now()}`);
        };

        const intervalId = setInterval(updateImage, 500);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div style={{
            width: '100%',
            aspectRatio: '16/9',
            backgroundColor: '#000',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            position: 'relative'
        }}>
            {!error ? (
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
                    backgroundColor: '#e5e7eb'
                }}>
                    <p>ไม่สามารถเชื่อมต่อกล้องได้</p>
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
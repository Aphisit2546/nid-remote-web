import { DoorStatus as StatusType } from '@/store/useDoorStore';

interface DoorStatusProps {
    percentage: number;
    status: StatusType;
}

export default function DoorStatus({ percentage, status }: DoorStatusProps) {
    // คำนวณเส้นรอบวง - ลดขนาดสำหรับ Mobile
    const radius = 45; // ลดจาก 60
    const stroke = 8; // ลดจาก 12
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const getStatusText = (s: StatusType) => {
        switch (s) {
            case 'OPEN': return 'เปิดสุด';
            case 'CLOSED': return 'ปิดสนิท';
            case 'OPENING': return 'กำลังเปิด...';
            case 'CLOSING': return 'กำลังปิด...';
            case 'STOPPED': return 'หยุด';
            default: return '';
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem 0'
        }}>
            <h2 style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '0.5rem'
            }}>สถานะ</h2>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    style={{ transform: 'rotate(-90deg)', transition: 'all 0.3s' }}
                >
                    {/* วงกลมพื้นหลัง */}
                    <circle
                        stroke="#e5e7eb"
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    {/* วงกลม Progress */}
                    <circle
                        stroke={status === 'OPENING' || status === 'CLOSING' ? '#f97316' : '#9ca3af'}
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset, transition: 'all 0.1s linear' }}
                        strokeLinecap="round"
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                </svg>

                {/* ข้อความตรงกลาง */}
                <div style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    inset: 0
                }}>
                    <span style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#4b5563'
                    }}>
                        {Math.round(percentage)}%
                    </span>
                </div>
            </div>

            <p style={{
                marginTop: '0.5rem',
                color: '#2563eb',
                fontWeight: 'bold',
                fontSize: '0.875rem'
            }}>
                {getStatusText(status)}
            </p>

            <p style={{
                fontSize: '0.65rem',
                color: 'rgba(37, 99, 235, 0.7)',
                marginTop: '0.25rem',
                textAlign: 'center'
            }}>
                กดปุ่ม OPEN/เปิด หรือ CLOSE/ปิด เพื่อเปิด-ปิดประตู
            </p>
        </div>
    );
}
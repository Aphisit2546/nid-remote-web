import { DoorStatus as StatusType } from '@/store/useDoorStore';

interface DoorStatusProps {
    percentage: number;
    status: StatusType;
}

export default function DoorStatus({ percentage, status }: DoorStatusProps) {
    // คำนวณเส้นรอบวง - ลดขนาดสำหรับ Mobile
    const radius = 45;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // เช็คว่าควรแสดงเปอร์เซ็นต์หรือไม่ (ถ้าสถานะเป็น UNKNOWN คือเพิ่งเข้าระบบ ให้ซ่อน)
    const showPercentage = status !== 'UNKNOWN';

    const getStatusText = (s: StatusType) => {
        switch (s) {
            case 'UNKNOWN': return 'พร้อมใช้งาน'; // หรือ 'รอคำสั่ง'
            case 'OPEN': return 'เปิดสุด (100%)';
            case 'CLOSED': return 'ปิดสนิท (0%)';
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
                        // ถ้าไม่แสดงเปอร์เซ็นต์ ให้ปรับเส้น Progress ให้หายไป (เท่ากับเส้นรอบวง)
                        style={{
                            strokeDashoffset: showPercentage ? strokeDashoffset : circumference,
                            transition: 'all 0.1s linear'
                        }}
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
                    {showPercentage ? (
                        <span style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: '#4b5563'
                        }}>
                            {Math.round(percentage)}%
                        </span>
                    ) : (
                        <span style={{
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            color: '#9ca3af'
                        }}>
                            --
                        </span>
                    )}
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
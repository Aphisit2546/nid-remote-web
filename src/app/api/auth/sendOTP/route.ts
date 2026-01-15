import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://accessio.nidpro.tech/remote-office/index.php/api';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // เพิ่ม AbortController สำหรับ timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        try {
            const response = await fetch(`${API_BASE_URL}/sendOTP`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(body),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const text = await response.text();

            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = { raw: text, status: response.status };
            }

            return NextResponse.json(data, { status: response.status });
        } catch (fetchError) {
            clearTimeout(timeoutId);
            throw fetchError;
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Proxy sendOTP error:', errorMessage);

        return NextResponse.json(
            {
                error: 'Failed to send OTP',
                message: 'ไม่สามารถเชื่อมต่อกับ Server ได้ กรุณาลองใหม่อีกครั้ง',
                details: errorMessage
            },
            { status: 503 }
        );
    }
}

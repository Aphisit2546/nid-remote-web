import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://accessio.nidpro.tech/remote-office/index.php/api';

export async function POST(request: NextRequest) {
    const targetUrl = `${API_BASE_URL}/sendOTP`;

    console.log('[sendOTP] Starting request to:', targetUrl);
    console.log('[sendOTP] API_BASE_URL from env:', process.env.NEXT_PUBLIC_API_URL);

    try {
        const body = await request.json();
        console.log('[sendOTP] Request body:', JSON.stringify(body));

        // เพิ่ม AbortController สำหรับ timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        try {
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'User-Agent': 'NID-Remote-Web/1.0',
                },
                body: JSON.stringify(body),
                signal: controller.signal,
                cache: 'no-store' as RequestCache,
            });

            clearTimeout(timeoutId);

            console.log('[sendOTP] Response status:', response.status);

            const text = await response.text();
            console.log('[sendOTP] Response text length:', text.length);

            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = { raw: text, status: response.status };
            }

            return NextResponse.json(data, { status: response.status });
        } catch (fetchError) {
            clearTimeout(timeoutId);

            const err = fetchError as Error;
            console.error('[sendOTP] Fetch error name:', err.name);
            console.error('[sendOTP] Fetch error message:', err.message);
            console.error('[sendOTP] Fetch error cause:', (err as NodeJS.ErrnoException).cause);

            throw fetchError;
        }
    } catch (error) {
        const err = error as Error;
        const errorMessage = err.message || 'Unknown error';
        const errorCause = (err as NodeJS.ErrnoException).cause;

        console.error('[sendOTP] Final error:', errorMessage);
        console.error('[sendOTP] Error cause:', errorCause);

        return NextResponse.json(
            {
                error: 'Failed to send OTP',
                message: 'ไม่สามารถเชื่อมต่อกับ Server ได้ กรุณาลองใหม่อีกครั้ง',
                details: errorMessage,
                cause: errorCause ? String(errorCause) : undefined,
                targetUrl: targetUrl,
            },
            { status: 503 }
        );
    }
}

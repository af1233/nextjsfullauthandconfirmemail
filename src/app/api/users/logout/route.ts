import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout Success",
            status: 200,
            success: true,
        });
        
        // Set the token cookie to expire immediately
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

        return response;
    } catch (error:any) {
        return NextResponse.json({ error: error.message });
    }
}

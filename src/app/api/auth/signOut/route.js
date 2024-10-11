import { NextResponse } from "next/server";

export async function GET() { 
  const response = NextResponse.json({ status: 200, message: 'Successfully logged out' });
  response.cookies.set('accessToken', '', {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 0, // Удалить куки
    sameSite: 'none',
  });

  response.cookies.set('refreshToken', '', {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 0, // Удалить куки
    sameSite: 'none',
  });

  return response;
}

// app/api/verify-captcha/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { token } = await req.json()

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: 'POST',
    }
  )

  const data = await response.json()

  if (!data.success || data.score < 0.5) {
    return NextResponse.json({ success: false, message: 'Bot suspected', score: data.score }, { status: 400 })
  }

  return NextResponse.json({ success: true, message: 'Verified as human', score: data.score })
}

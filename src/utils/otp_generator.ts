import crypto from 'crypto';

export default function generateOTP(): string {
  return crypto.randomInt(100000000, 999999999).toString(); // 9-digit OTP
}
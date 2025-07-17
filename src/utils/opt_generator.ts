export default function generateOTP(): string {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  const otp = (arr[0] % 900_000) + 100_000; // ensures 6 digits
  return otp.toString();
}
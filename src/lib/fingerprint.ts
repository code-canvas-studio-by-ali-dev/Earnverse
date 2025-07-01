// lib/fingerprint.ts
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { load } from '@fingerprintjs/botd';

export async function getFingerprint() {
  const fp = await FingerprintJS.load();
  const fpResult = await fp.get();
  const botd = await load();
  const botResult = await botd.detect();
  return {
    visitorId: fpResult.visitorId,
    isBot: botResult.bot,
    botConfidence: botResult.bot ? botResult.botKind : null,
  };
}
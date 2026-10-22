/**
 * In-App Browser (IAB) detection and breakout utility functions
 */

export function isInstagramBrowser(userAgent: string): boolean {
  if (!userAgent) return false;
  return /Instagram|FBAN|FBAV/i.test(userAgent);
}

export function isAndroidDevice(userAgent: string): boolean {
  if (!userAgent) return false;
  return /android/i.test(userAgent);
}

export function isIOSDevice(userAgent: string): boolean {
  if (!userAgent) return false;
  return /iPhone|iPad|iPod/i.test(userAgent);
}

export function getAndroidIntentUrl(url: string): string {
  const cleanUrl = url.replace(/https?:\/\//, '');
  return `intent://${cleanUrl}#Intent;scheme=https;action=android.intent.action.VIEW;end;`;
}

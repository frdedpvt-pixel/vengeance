import React, { useEffect, useState } from 'react';
import { isInstagramBrowser, isAndroidDevice, getAndroidIntentUrl } from '../utils/iab';

interface InstagramBreakoutModalProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export const InstagramBreakoutModal: React.FC<InstagramBreakoutModalProps> = ({
  forceOpen = false,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [copied, setCopied] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // If forced via props or ?test_iab=1 query param, open immediately for testing
    const urlParams = new URLSearchParams(window.location.search);
    const testParam = urlParams.get('test_iab') === '1' || urlParams.get('iab') === '1';

    if (forceOpen || testParam) {
      setIsOpen(true);
      return;
    }

    // Check if dismissed in this session
    try {
      if (sessionStorage.getItem('iab_breakout_dismissed') === 'true') {
        return;
      }
    } catch {
      // sessionStorage unavailable
    }

    const ua = navigator.userAgent || '';
    const isInsta = isInstagramBrowser(ua);
    const android = isAndroidDevice(ua);
    setIsAndroid(android);

    if (isInsta) {
      // On Android: attempt automatic Intent breakout
      if (android) {
        try {
          const intentUrl = getAndroidIntentUrl(window.location.href);
          window.location.href = intentUrl;
        } catch (e) {
          console.warn('Android intent breakout error:', e);
        }
      }
      // Show breakout screen for iOS / fallback
      setIsOpen(true);
    }
  }, [forceOpen]);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem('iab_breakout_dismissed', 'true');
    } catch {
      // ignore
    }
    setIsOpen(false);
    onClose?.();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleManualAndroidBreakout = () => {
    const intentUrl = getAndroidIntentUrl(window.location.href);
    window.location.href = intentUrl;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/90 backdrop-blur-md animate-fade-in">
      {/* Visual Indicator pointing to Instagram's top-right triple-dot menu */}
      <div className="fixed top-3 right-5 flex flex-col items-end pointer-events-none z-50">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e2b48] text-[#93c5fd] border border-[#2e406b] shadow-xl text-xs font-mono animate-bounce">
          <span>Tap <strong>···</strong> above</span>
          <span className="material-symbols-outlined text-sm">north_east</span>
        </div>
      </div>

      <div className="relative w-full max-w-lg bg-[#0d1527] border border-[#253556] shadow-2xl p-6 sm:p-8 rounded-xl text-[#e2e8f0] overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -left-12 w-44 h-44 bg-[#3b82f6]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-[#10172a] border border-[#1e293b] flex items-center justify-center text-[#93c5fd] shrink-0">
              <span className="material-symbols-outlined text-2xl">open_in_browser</span>
            </div>
            <div>
              <h3 className="text-xl font-serif-title text-[#f1f5f9] font-normal leading-tight">
                Open in Full Browser
              </h3>
              <p className="text-xs text-[#94a3b8] font-mono mt-0.5">
                Enhanced Nocturnal Reading Experience
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-[#94a3b8] hover:text-[#f1f5f9] p-1.5 rounded hover:bg-[#1e293b] cursor-pointer"
            aria-label="Dismiss and continue in Instagram"
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Informative text */}
        <p className="text-sm text-[#cbd5e1] font-body-ui leading-relaxed mb-6">
          You're viewing this in Instagram's restricted in-app preview. For audio ambience, responsive
          typography, and undisturbed reading, open this page in Safari or Chrome.
        </p>

        {/* Steps Box */}
        <div className="p-4 rounded-lg bg-[#10172a] border border-[#1e293b] space-y-3 mb-6 text-xs font-mono text-[#cbd5e1]">
          <p className="text-[11px] uppercase tracking-wider text-[#93c5fd] font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">touch_app</span>
            <span>How to open in your browser:</span>
          </p>
          <div className="flex items-start gap-2.5">
            <span className="size-5 rounded-full bg-[#1e2b48] text-[#93c5fd] flex items-center justify-center font-bold shrink-0 text-[11px]">
              1
            </span>
            <p>
              Tap the <strong className="text-[#f1f5f9] bg-[#162038] px-1.5 py-0.5 rounded border border-[#253556]">···</strong> icon in the top right corner of Instagram.
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="size-5 rounded-full bg-[#1e2b48] text-[#93c5fd] flex items-center justify-center font-bold shrink-0 text-[11px]">
              2
            </span>
            <p>
              Select <strong className="text-[#93c5fd]">"Open in System Browser"</strong> or <strong className="text-[#93c5fd]">"Open in Safari"</strong>.
            </p>
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="space-y-2.5">
          {isAndroid && (
            <button
              onClick={handleManualAndroidBreakout}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#93c5fd] hover:bg-[#bfdbfe] text-[#0a0f1d] font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-md shadow-[#93c5fd]/20 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">android</span>
              <span>[ Open Directly in Chrome ]</span>
            </button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#1e293b] hover:bg-[#253556] text-[#f1f5f9] text-xs font-mono border border-[#334155] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm text-[#93c5fd]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Link URL'}</span>
            </button>

            <button
              onClick={handleDismiss}
              className="py-2.5 px-4 rounded-lg bg-[#10172a] hover:bg-[#162038] text-[#94a3b8] hover:text-[#f1f5f9] text-xs font-mono border border-[#1e293b] transition-colors cursor-pointer text-center"
            >
              Continue in Instagram →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

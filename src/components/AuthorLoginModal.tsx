import React, { useState } from 'react';
import { validateAuthorPassword } from '../utils/auth';

interface AuthorLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthorLoginModal: React.FC<AuthorLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError(false);

    setTimeout(() => {
      if (validateAuthorPassword(password)) {
        setIsVerifying(false);
        setPassword('');
        onLoginSuccess();
        onClose();
      } else {
        setIsVerifying(false);
        setError(true);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-md bg-[#0d1527] border border-[#253556] shadow-2xl p-7 rounded-xl text-[#e2e8f0] overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-12 -left-12 w-44 h-44 bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-[#10172a] border border-[#1e293b] flex items-center justify-center text-[#93c5fd] shrink-0">
              <span className="material-symbols-outlined text-2xl">lock_person</span>
            </div>
            <div>
              <h3 className="text-xl font-serif-title text-[#f1f5f9] font-normal leading-tight">
                Author Sign In
              </h3>
              <p className="text-xs text-[#94a3b8] font-mono mt-0.5">
                Curator session access for DivyaShree
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f1f5f9] p-1.5 rounded hover:bg-[#1e293b] cursor-pointer"
            aria-label="Close"
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

        <p className="text-sm text-[#cbd5e1] font-body-ui leading-relaxed mb-5">
          Enter the designated author master password to unlock editing permissions, the manuscript composer, and vault controls.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="author-password-input"
                className="text-xs font-mono uppercase tracking-wider text-[#94a3b8]"
              >
                Author Master Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] font-mono text-[#93c5fd] hover:underline cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="relative">
              <input
                id="author-password-input"
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Enter author key..."
                className="w-full bg-[#10172a] border border-[#253556] focus:border-[#93c5fd] focus:ring-1 focus:ring-[#93c5fd]/50 rounded-lg px-3.5 py-2.5 text-sm text-[#f1f5f9] placeholder-[#475569] font-mono focus:outline-none transition-all"
              />
            </div>

            {error && (
              <p className="text-xs font-mono text-[#ffb4ab] mt-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>Incorrect author credentials. Access denied.</span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#93c5fd] hover:bg-[#bfdbfe] text-[#0a0f1d] font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-md shadow-[#93c5fd]/20 cursor-pointer disabled:opacity-60"
            >
              {isVerifying ? (
                <>
                  <div className="size-4 border-2 border-[#0a0f1d] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">key</span>
                  <span>Unlock Author Studio</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-xs font-mono uppercase tracking-wider text-[#94a3b8] hover:text-[#e2e8f0] transition-colors text-center cursor-pointer"
            >
              ← Return to Reader View
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

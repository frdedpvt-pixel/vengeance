import React, { useState } from 'react';
import { Post, validatePassword } from '../utils/blog';

interface DecryptModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (post: Post) => void;
}

export const DecryptModal: React.FC<DecryptModalProps> = ({
  post,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPassword = post.password || 'nocturne';
    if (validatePassword(password, targetPassword)) {
      setError(false);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setPassword('');
        onSuccess(post);
      }, 700);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/80 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-lg backdrop-blur-md bg-[#0d1527] border border-[#253556] shadow-2xl p-7 sm:p-8 rounded-xl text-[#e2e8f0] overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-12 -left-12 w-44 h-44 bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />

        {isLoading ? (
          /* Loading State inside Modal */
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="size-10 border-2 border-[#1e293b] border-t-[#93c5fd] rounded-full animate-spin mb-4" />
            <p className="text-[#f1f5f9] font-medium text-sm mb-1 tracking-wide font-body-ui">
              Verifying secure session...
            </p>
            <p className="text-xs font-mono-code text-[#94a3b8]">
              Generating ephemeral cryptographic session token
            </p>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-[#10172a] border border-[#1e293b] flex items-center justify-center text-[#93c5fd]">
                  <span className="material-symbols-outlined text-xl">key</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif-title text-[#f1f5f9] font-normal leading-tight">
                    Encrypted Manuscript
                  </h3>
                  <p className="text-xs text-[#94a3b8] font-mono-code mt-0.5">
                    Author-Encrypted Archive • Protected Draft
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-[#94a3b8] hover:text-[#f1f5f9] transition-colors p-1.5 rounded hover:bg-[#1e293b] cursor-pointer"
                aria-label="Close modal"
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

            {/* Target identifier badge */}
            <div className="mb-4 p-2.5 rounded-lg bg-[#10172a] border border-[#253556] flex items-center gap-2 text-xs font-mono-code text-[#cbd5e1]">
              <span className="material-symbols-outlined text-sm text-[#93c5fd]">lock</span>
              <span className="text-[#64748b]">Target:</span>
              <span className="text-[#93c5fd] truncate font-medium">
                {post.title} ({post.draftNumber || 'Vault Draft'})
              </span>
            </div>

            <p className="text-[#94a3b8] text-sm leading-relaxed mb-5 font-body-ui">
              This draft has been encrypted by the author with a custom keyphrase. Enter the designated
              password to decrypt and read this post.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mb-2">
              <div>
                <label
                  htmlFor="post-password-input"
                  className="block text-xs font-mono-code uppercase tracking-wider text-[#94a3b8] mb-1.5 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <span className="text-[#93c5fd]">#</span> PASSWORD:
                  </span>
                  <span className="text-[11px] text-[#64748b] font-mono-code">
                    (HINT: "{post.password?.toUpperCase() || 'NOCTURNE'}")
                  </span>
                </label>

                <div className="relative">
                  <input
                    id="post-password-input"
                    type="password"
                    autoFocus
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="Enter post password..."
                    required
                    className="w-full bg-[#10172a] border border-[#253556] focus:border-[#93c5fd] focus:ring-1 focus:ring-[#93c5fd]/50 rounded-lg px-3.5 py-2.5 text-sm text-[#f1f5f9] placeholder-[#475569] font-mono-code focus:outline-none transition-all"
                  />
                </div>

                {error && (
                  <p className="text-xs font-mono-code text-[#ffb4ab] mt-1.5 flex items-center gap-1 animate-shake">
                    <span className="material-symbols-outlined text-xs">error</span>
                    Incorrect password. Access denied.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#93c5fd] hover:bg-[#bfdbfe] text-[#0a0f1d] font-semibold text-sm transition-all shadow-[0_0_20px_rgba(147,197,253,0.2)] hover:shadow-[0_0_25px_rgba(147,197,253,0.35)] active:scale-[0.99] cursor-pointer border border-[#93c5fd]/60 font-mono-code"
                >
                  <span className="material-symbols-outlined text-base">lock_open</span>
                  <span>[ Decrypt &amp; Read Post ]</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-xs font-mono-code uppercase tracking-wider text-[#94a3b8] hover:text-[#e2e8f0] transition-colors text-center cursor-pointer"
                >
                  ← RETURN TO PUBLIC ESSAYS
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

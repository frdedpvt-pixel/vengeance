import React, { useState } from 'react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteTitle: string;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  siteTitle,
}) => {
  const [email, setEmail] = useState('');
  const [tier, setTier] = useState('full');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-md bg-[#0d1527] border border-[#253556] shadow-2xl p-7 rounded-xl text-[#e2e8f0] overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#3b82f6]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-[#1e293b] mb-4">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#93c5fd]">mail</span>
            <div>
              <h3 className="text-lg font-serif-title text-[#f1f5f9] font-medium">
                Subscribe to {siteTitle}
              </h3>
              <p className="text-xs text-[#94a3b8] font-mono-code">Nocturnal dispatches &amp; unredacted drafts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f1f5f9] p-1 rounded hover:bg-[#1e293b] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-2">
            <span className="material-symbols-outlined text-3xl text-emerald-400">check_circle</span>
            <h4 className="text-base font-serif-title text-[#f1f5f9]">Welcome to the sanctuary</h4>
            <p className="text-xs font-mono-code text-[#94a3b8]">
              A verification dispatch has been routed to {email}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-[#cbd5e1] font-body-ui leading-relaxed">
              Receive new essays, fragments, and private vault draft keyphrases directly to your inbox. No tracking, no sponsors.
            </p>

            <div>
              <label className="block text-xs font-mono-code uppercase text-[#94a3b8] mb-1">
                Reader Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="reader@anthemsofheart.com"
                className="w-full bg-[#10172a] border border-[#1e293b] focus:border-[#93c5fd] rounded-lg px-3.5 py-2.5 text-sm text-[#f1f5f9] placeholder-[#475569] font-mono-code focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code uppercase text-[#94a3b8] mb-1">
                Dispatch Frequency
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
                <button
                  type="button"
                  onClick={() => setTier('full')}
                  className={`p-2.5 rounded border text-left cursor-pointer transition-colors ${
                    tier === 'full'
                      ? 'bg-[#1e2b48] border-[#2e406b] text-[#93c5fd]'
                      : 'bg-[#10172a] border-[#1e293b] text-[#94a3b8] hover:border-[#334155]'
                  }`}
                >
                  <p className="font-medium text-[#f1f5f9]">Full Archive</p>
                  <span className="text-[10px] text-[#64748b]">Essays + Encrypted Vault</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTier('essays')}
                  className={`p-2.5 rounded border text-left cursor-pointer transition-colors ${
                    tier === 'essays'
                      ? 'bg-[#1e2b48] border-[#2e406b] text-[#93c5fd]'
                      : 'bg-[#10172a] border-[#1e293b] text-[#94a3b8] hover:border-[#334155]'
                  }`}
                >
                  <p className="font-medium text-[#f1f5f9]">Public Essays Only</p>
                  <span className="text-[10px] text-[#64748b]">Monthly curated digest</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#93c5fd] hover:bg-[#bfdbfe] text-[#0a0f1d] font-semibold text-xs font-mono-code uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md shadow-[#93c5fd]/20"
              >
                Join 8.4k Readers
              </button>
              <p className="text-center text-[11px] font-mono-code text-[#64748b] mt-2">
                Unsubscribe at any time with a single click.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

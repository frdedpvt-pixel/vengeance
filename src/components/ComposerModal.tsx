import React, { useState } from 'react';
import { Post, estimateReadingTime } from '../utils/blog';

interface ComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (newPost: Post) => void;
}

export const ComposerModal: React.FC<ComposerModalProps> = ({
  isOpen,
  onClose,
  onPublish,
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Essay' | 'Fragment' | 'Private Journal' | 'Vault Draft'>('Essay');
  const [readTime, setReadTime] = useState('5 min read');
  const [synopsis, setSynopsis] = useState('');
  const [body, setBody] = useState('');
  const [isRestricted, setIsRestricted] = useState(false);
  const [password, setPassword] = useState('nocturne');

  if (!isOpen) return null;

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setBody(text);
    if (text.length > 50) {
      setReadTime(estimateReadingTime(text));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !synopsis.trim()) return;

    const newPost: Post = {
      id: `essay-${Date.now()}`,
      title: title.trim(),
      type,
      readTime: readTime || '4 min read',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      synopsis: synopsis.trim(),
      body: body.trim() || synopsis.trim(),
      isRestricted,
      password: isRestricted ? (password.trim() || 'nocturne') : undefined,
      draftNumber: isRestricted ? `Vault Draft #${Math.floor(Math.random() * 50) + 20}` : undefined,
      published: true,
    };

    onPublish(newPost);
    // Reset form
    setTitle('');
    setSynopsis('');
    setBody('');
    setIsRestricted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-2xl bg-[#0d1527] border border-[#253556] shadow-2xl p-6 sm:p-8 rounded-xl text-[#e2e8f0] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1e293b] mb-5">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#93c5fd]">stylus_note</span>
            <div>
              <h3 className="text-lg font-serif-title text-[#f1f5f9] font-medium">
                Write New Manuscript Draft
              </h3>
              <p className="text-xs text-[#94a3b8] font-mono-code">
                Author curation desk • Autosaved locally
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f1f5f9] p-1.5 rounded-lg hover:bg-[#1e293b] cursor-pointer"
            aria-label="Close composer"
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1 flex-1">
          <div>
            <label className="block text-xs font-mono-code uppercase tracking-wider text-[#94a3b8] mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., The Architecture of Unspoken Thoughts"
              className="w-full bg-[#10172a] border border-[#1e293b] focus:border-[#93c5fd] rounded-lg px-3.5 py-2.5 text-sm text-[#f1f5f9] focus:outline-none font-body-ui"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono-code uppercase tracking-wider text-[#94a3b8] mb-1">
                Type / Category
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as unknown as Post['type'])}
                className="w-full bg-[#10172a] border border-[#1e293b] focus:border-[#93c5fd] rounded-lg px-3 py-2 text-sm text-[#cbd5e1] focus:outline-none font-mono-code"
              >
                <option value="Essay">Essay</option>
                <option value="Fragment">Fragment</option>
                <option value="Private Journal">Private Journal</option>
                <option value="Vault Draft">Vault Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono-code uppercase tracking-wider text-[#94a3b8] mb-1">
                Estimated Reading Time
              </label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                placeholder="e.g. 5 min read"
                className="w-full bg-[#10172a] border border-[#1e293b] focus:border-[#93c5fd] rounded-lg px-3 py-2 text-sm text-[#f1f5f9] focus:outline-none font-mono-code"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-code uppercase tracking-wider text-[#94a3b8] mb-1">
              Synopsis / Lead
            </label>
            <textarea
              required
              rows={2}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              placeholder="A brief contemplative summary for the archive reader..."
              className="w-full bg-[#10172a] border border-[#1e293b] focus:border-[#93c5fd] rounded-lg p-3 text-sm text-[#cbd5e1] focus:outline-none font-body-ui"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code uppercase tracking-wider text-[#94a3b8] mb-1">
              Manuscript Body (Markdown / Freeform)
            </label>
            <textarea
              rows={6}
              value={body}
              onChange={handleBodyChange}
              placeholder="Begin writing at 3 AM... Use blockquotes with > and headers with #"
              className="w-full bg-[#10172a] border border-[#1e293b] focus:border-[#93c5fd] rounded-lg p-3 text-sm text-[#cbd5e1] focus:outline-none font-body-reading"
            />
          </div>

          <div className="p-3 bg-[#10172a] border border-[#1e293b] rounded-lg space-y-2">
            <div className="flex items-center gap-2">
              <input
                id="composer-subscribers-only"
                type="checkbox"
                checked={isRestricted}
                onChange={(e) => setIsRestricted(e.target.checked)}
                className="rounded bg-[#10172a] border-[#1e293b] text-[#93c5fd] focus:ring-0 size-4 cursor-pointer"
              />
              <label
                htmlFor="composer-subscribers-only"
                className="text-xs text-[#cbd5e1] font-mono-code cursor-pointer"
              >
                Restrict to verified subscribers only (Author Encrypted)
              </label>
            </div>

            {isRestricted && (
              <div className="pt-2 pl-6">
                <label className="block text-xs font-mono-code text-[#94a3b8] mb-1">
                  Decryption Keyphrase / Password
                </label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="e.g. nocturne"
                  className="w-full max-w-xs bg-[#0d1527] border border-[#253556] rounded px-3 py-1.5 text-xs text-[#93c5fd] font-mono-code focus:outline-none"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#1e293b]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-mono-code uppercase tracking-wider text-[#94a3b8] hover:text-[#f1f5f9] hover:bg-[#10172a] transition-colors cursor-pointer"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#93c5fd] hover:bg-[#bfdbfe] text-[#0a0f1d] font-semibold text-xs font-mono-code uppercase tracking-wider transition-colors shadow-md shadow-[#93c5fd]/20 cursor-pointer"
            >
              Publish to Feed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

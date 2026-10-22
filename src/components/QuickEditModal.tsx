import React, { useState, useEffect } from 'react';

interface QuickEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  initialTitle: string;
  initialSynopsis: string;
  onSave: (postId: string, newTitle: string, newSynopsis: string) => void;
}

export const QuickEditModal: React.FC<QuickEditModalProps> = ({
  isOpen,
  onClose,
  postId,
  initialTitle,
  initialSynopsis,
  onSave,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [synopsis, setSynopsis] = useState(initialSynopsis);

  useEffect(() => {
    setTitle(initialTitle);
    setSynopsis(initialSynopsis);
  }, [initialTitle, initialSynopsis]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(postId, title, synopsis);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-lg bg-[#0d1527] border border-[#253556] shadow-2xl p-6 rounded-xl text-[#e2e8f0]">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e293b] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#93c5fd]">edit</span>
            <h3 className="text-base font-serif-title text-[#f1f5f9] font-medium">
              Quick Edit Manuscript Entry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f1f5f9] p-1 rounded hover:bg-[#1e293b] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono-code uppercase text-[#94a3b8] mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#10172a] border border-[#1e293b] rounded-lg px-3.5 py-2.5 text-sm text-[#f1f5f9] focus:outline-none focus:border-[#93c5fd] font-serif-title"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code uppercase text-[#94a3b8] mb-1">
              Synopsis / Lead
            </label>
            <textarea
              required
              rows={3}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              className="w-full bg-[#10172a] border border-[#1e293b] rounded-lg p-3 text-sm text-[#cbd5e1] focus:outline-none focus:border-[#93c5fd] font-body-ui"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#1e293b]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono-code text-[#94a3b8] hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#93c5fd] hover:bg-[#bfdbfe] text-[#0a0f1d] font-semibold text-xs font-mono-code rounded-lg transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

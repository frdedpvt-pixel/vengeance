import React, { useEffect } from 'react';
import { Post } from '../utils/blog';

interface DeletePostModalProps {
  isOpen: boolean;
  post: Post | null;
  onClose: () => void;
  onConfirm: (postId: string) => void;
}

export const DeletePostModal: React.FC<DeletePostModalProps> = ({
  isOpen,
  post,
  onClose,
  onConfirm,
}) => {
  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0d1527] border border-[#3b1d28] shadow-2xl p-6 sm:p-7 rounded-xl text-[#e2e8f0] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Danger Glow */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#ef4444]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-3.5 mb-4">
          <div className="size-10 shrink-0 rounded-lg bg-[#24141c] border border-[#4d1f2b] flex items-center justify-center text-[#ffb4ab]">
            <span className="material-symbols-outlined text-xl">delete_forever</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3
              id="delete-dialog-title"
              className="text-lg font-serif-title text-[#f1f5f9] font-normal leading-tight"
            >
              Delete Manuscript Entry
            </h3>
            <p className="text-xs text-[#94a3b8] font-mono-code mt-0.5">
              Permanent Deletion Confirmation
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f1f5f9] p-1 rounded hover:bg-[#1e293b] cursor-pointer transition-colors"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Post Preview Card */}
        <div className="my-4 p-3.5 rounded-lg bg-[#10172a] border border-[#1e293b] text-left">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-mono-code uppercase tracking-wider text-[#94a3b8]">
              {post.isRestricted ? (post.draftNumber || 'Encrypted Archive') : `${post.type.toUpperCase()}`}
            </span>
            <span className="text-[11px] font-mono-code text-[#64748b]">
              {post.readTime}
            </span>
          </div>
          <h4 className="text-base font-serif-title text-[#f1f5f9] mb-1 font-normal line-clamp-2">
            {post.title}
          </h4>
          <p className="text-xs text-[#94a3b8] font-body-ui line-clamp-2 leading-relaxed">
            {post.synopsis}
          </p>
        </div>

        <p className="text-xs text-[#ffb4ab]/90 font-body-ui mb-5 leading-relaxed bg-[#24141c]/60 border border-[#4d1f2b]/60 rounded-md p-2.5 flex items-start gap-2">
          <span className="material-symbols-outlined text-sm shrink-0 text-[#ffb4ab] mt-0.5">warning</span>
          <span>
            This post will be permanently deleted from your site feed and saved storage. This action cannot be undone.
          </span>
        </p>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1e293b]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono-code text-[#94a3b8] hover:text-white rounded-lg hover:bg-[#1e293b] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm(post.id);
            }}
            className="px-4 py-2 bg-[#991b1b] hover:bg-[#b91c1c] active:bg-[#7f1d1d] text-white font-semibold text-xs font-mono-code rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-md border border-[#ef4444]/30"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            <span>Delete Post</span>
          </button>
        </div>
      </div>
    </div>
  );
};

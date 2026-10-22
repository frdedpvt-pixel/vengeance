import React from 'react';
import { Post } from '../utils/blog';

interface VaultModalProps {
  posts: Post[];
  isOpen: boolean;
  onClose: () => void;
  onOpenInReader: (post: Post) => void;
  onOpenComposerWithDraft: (title: string, synopsis: string) => void;
  onRequestDeletePost?: (post: Post) => void;
}

export const VaultModal: React.FC<VaultModalProps> = ({
  posts,
  isOpen,
  onClose,
  onOpenInReader,
  onOpenComposerWithDraft,
  onRequestDeletePost,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-xl bg-[#0d1527] border border-[#253556] shadow-2xl p-6 rounded-xl text-[#e2e8f0]">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e293b] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#93c5fd]">folder_zip</span>
            <div>
              <h3 className="text-base font-serif-title text-[#f1f5f9] font-medium">
                Archive &amp; Draft Vault Manager
              </h3>
              <p className="text-xs text-[#94a3b8] font-mono-code">
                {posts.length + 1} drafts recorded • {posts.filter(p => !p.isRestricted).length} Public •{' '}
                {posts.filter(p => p.isRestricted).length} Encrypted
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f1f5f9] p-1 rounded hover:bg-[#1e293b] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 font-mono-code text-xs">
          {posts.map((post, idx) => (
            <div
              key={post.id}
              className={`flex items-center justify-between p-2.5 rounded bg-[#10172a] border ${
                post.isRestricted ? 'border-[#253556]' : 'border-[#1e293b]'
              }`}
            >
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-[#f1f5f9] font-medium font-body-ui text-sm truncate">{post.title}</p>
                <span className={post.isRestricted ? 'text-[#93c5fd]' : 'text-[#64748b]'}>
                  {post.date} • {post.isRestricted ? `${post.draftNumber || 'Vault'} (Encrypted)` : 'Public'}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  className="text-[#93c5fd] hover:underline cursor-pointer text-xs"
                  onClick={() => {
                    onClose();
                    onOpenInReader(post);
                  }}
                >
                  {post.isRestricted ? 'Open in Reader' : `History (v${3 - (idx % 2)})`}
                </button>
                {onRequestDeletePost && (
                  <button
                    onClick={() => {
                      onRequestDeletePost(post);
                    }}
                    className="p-1 rounded text-[#94a3b8] hover:text-[#ffb4ab] hover:bg-[#24141c] transition-colors cursor-pointer"
                    title="Delete manuscript"
                    aria-label={`Delete ${post.title}`}
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Staging Unpublished Draft */}
          <div className="flex items-center justify-between p-2.5 rounded bg-[#10172a]/60 border border-dashed border-[#1e293b]">
            <div>
              <p className="text-[#94a3b8] font-medium font-body-ui text-sm">
                Untitled Fragment: Echoes in White Paint
              </p>
              <span className="text-[#64748b]">Unpublished Staging • 400 words</span>
            </div>
            <button
              className="text-[#cbd5e1] hover:underline cursor-pointer ml-2 text-xs"
              onClick={() => {
                onClose();
                onOpenComposerWithDraft(
                  'Echoes in White Paint',
                  'A study in silence and incomplete layers of canvas.'
                );
              }}
            >
              Resume
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-[#1e293b] mt-4">
          <span className="text-[11px] font-mono-code text-[#64748b] flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">security</span>
            <span>Encrypted via DivyaShree KeyRing</span>
          </span>
          <button
            className="px-4 py-1.5 bg-[#1e293b] hover:bg-[#253556] text-[#e2e8f0] text-xs font-mono-code rounded transition-colors cursor-pointer"
            onClick={onClose}
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};

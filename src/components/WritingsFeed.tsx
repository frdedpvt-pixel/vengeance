import React, { useState } from 'react';
import { Post } from '../utils/blog';
import { EditableText } from './EditableText';

interface WritingsFeedProps {
  posts: Post[];
  isInlineEditMode: boolean;
  isAuthorMode?: boolean;
  onOpenPost: (post: Post) => void;
  onOpenComposer: () => void;
  onQuickEditPost: (postId: string, currentTitle: string, currentSynopsis: string) => void;
  onUpdatePostField: (postId: string, field: keyof Post, value: string | boolean) => void;
  onDeletePost?: (postId: string) => void;
  onRequestDeletePost?: (post: Post) => void;
  activeFilter: string;
  onSetFilter: (filter: string) => void;
}

export const WritingsFeed: React.FC<WritingsFeedProps> = ({
  posts,
  isInlineEditMode,
  isAuthorMode = true,
  onOpenPost,
  onOpenComposer,
  onQuickEditPost,
  onUpdatePostField,
  onDeletePost,
  onRequestDeletePost,
  activeFilter,
  onSetFilter,
}) => {
  const canManage = isAuthorMode;
  const canEditInline = isAuthorMode && isInlineEditMode;
  const [searchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === 'essays' && post.type !== 'Essay') return false;
    if (activeFilter === 'fragments' && post.type !== 'Fragment') return false;
    if (activeFilter === 'archive' && !post.isRestricted && post.type !== 'Vault Draft') return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return post.title.toLowerCase().includes(q) || post.synopsis.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="px-4 md:px-0 pb-16">
      {/* Writings Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#1e293b] pb-3 mb-6 gap-3">
        <div className="flex items-center gap-4">
          <h2 className="text-[#f1f5f9] text-xl md:text-2xl font-normal leading-tight font-serif-title tracking-[-0.015em]">
            Selected Writings
          </h2>
          {/* Subtle Category Chips */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono-code">
            <button
              onClick={() => onSetFilter('all')}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#1e2b48] text-[#93c5fd] border border-[#2e406b]'
                  : 'text-[#64748b] hover:text-[#94a3b8]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => onSetFilter('essays')}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                activeFilter === 'essays'
                  ? 'bg-[#1e2b48] text-[#93c5fd] border border-[#2e406b]'
                  : 'text-[#64748b] hover:text-[#94a3b8]'
              }`}
            >
              Essays
            </button>
            <button
              onClick={() => onSetFilter('fragments')}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                activeFilter === 'fragments'
                  ? 'bg-[#1e2b48] text-[#93c5fd] border border-[#2e406b]'
                  : 'text-[#64748b] hover:text-[#94a3b8]'
              }`}
            >
              Fragments
            </button>
            <button
              onClick={() => onSetFilter('archive')}
              className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                activeFilter === 'archive'
                  ? 'bg-[#1e2b48] text-[#93c5fd] border border-[#2e406b]'
                  : 'text-[#64748b] hover:text-[#94a3b8]'
              }`}
            >
              Archive
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {canManage && (
            <button
              onClick={onOpenComposer}
              className="text-xs text-[#93c5fd] hover:text-white font-mono-code flex items-center gap-1 bg-[#10172a] hover:bg-[#162038] px-3 py-1.5 rounded border border-[#1e293b] hover:border-[#334155] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>+ Draft Post</span>
            </button>
          )}
          <span className="text-xs text-[#64748b] font-mono-code">
            {posts.length} {posts.length === 1 ? 'Entry' : 'Entries'} Available
          </span>
        </div>
      </div>

      {/* Writings Feed List */}
      <div className="flex flex-col gap-5">
        {filteredPosts.length === 0 ? (
          <div className="py-12 text-center text-[#64748b] font-mono-code text-sm border border-dashed border-[#1e293b] rounded-lg">
            No manuscripts found matching the selected filter.
          </div>
        ) : (
          filteredPosts.map((post, idx) => {
            const isRestricted = post.isRestricted;

            if (isRestricted) {
              return (
                <article
                  key={post.id}
                  onClick={() => onOpenPost(post)}
                  className="relative overflow-hidden border border-[#253556] bg-[#0d1527] hover:border-[#3b82f6]/60 transition-all rounded-lg p-6 sm:p-7 cursor-pointer group shadow-xl shadow-[#050811]"
                >
                  <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#1d4ed8]/10 rounded-full blur-2xl group-hover:bg-[#1d4ed8]/20 transition-colors pointer-events-none" />

                  <div className="flex items-center justify-between gap-4 mb-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono-code tracking-wider font-semibold uppercase bg-[#1e2b48] text-[#93c5fd] border border-[#2e406b]">
                        <svg
                          className="size-3"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>Subscribers Only</span>
                      </span>
                      <EditableText
                        value={post.draftNumber || `Vault Draft #${idx + 1}`}
                        onSave={(val) => onUpdatePostField(post.id, 'draftNumber', val)}
                        isAuthorMode={canEditInline}
                        className="text-xs font-mono-code uppercase tracking-wider text-[#64748b]"
                        ariaLabel="Edit draft identifier"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#64748b] font-mono-code">Encrypted</span>
                      {canManage && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onQuickEditPost(post.id, post.title, post.synopsis);
                            }}
                            className="text-[#94a3b8] hover:text-[#93c5fd] p-1.5 rounded hover:bg-[#1e293b] transition-colors cursor-pointer"
                            title="Edit this encrypted post"
                            aria-label={`Edit ${post.title}`}
                          >
                            <span className="material-symbols-outlined text-sm">edit</span>
                          </button>
                          {(onRequestDeletePost || onDeletePost) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                if (onRequestDeletePost) {
                                  onRequestDeletePost(post);
                                } else if (onDeletePost) {
                                  onDeletePost(post.id);
                                }
                              }}
                              className="text-[#94a3b8] hover:text-[#ffb4ab] p-1.5 rounded hover:bg-[#24141c] hover:border hover:border-[#4d1f2b] transition-colors cursor-pointer"
                              title="Delete this manuscript"
                              aria-label={`Delete ${post.title}`}
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title directly editable */}
                  <h3 className="text-xl md:text-2xl font-serif-title text-[#f1f5f9] font-normal group-hover:text-[#93c5fd] transition-colors flex items-center gap-2 mb-2 tracking-[-0.015em]">
                    <EditableText
                      value={post.title}
                      onSave={(val) => onUpdatePostField(post.id, 'title', val)}
                      isAuthorMode={canEditInline}
                      className="text-xl md:text-2xl font-serif-title text-[#f1f5f9]"
                      ariaLabel="Edit encrypted post title"
                    />
                  </h3>

                  {/* Synopsis directly editable */}
                  <div className="mb-5">
                    <EditableText
                      value={post.synopsis}
                      onSave={(val) => onUpdatePostField(post.id, 'synopsis', val)}
                      isAuthorMode={canEditInline}
                      multiline={true}
                      className="text-[#94a3b8] text-sm md:text-base leading-relaxed font-body-ui block"
                      ariaLabel="Edit encrypted post synopsis"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-[#1e293b]">
                    <span className="text-xs text-[#64748b] font-mono-code flex items-center gap-1">
                      <span>Estimated reading:</span>
                      <EditableText
                        value={post.readTime}
                        onSave={(val) => onUpdatePostField(post.id, 'readTime', val)}
                        isAuthorMode={canEditInline}
                        className="text-xs font-mono-code text-[#64748b]"
                        ariaLabel="Edit read time"
                      />
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-[#93c5fd] group-hover:translate-x-1 transition-transform">
                      <span>Unlock Archive</span>
                      <svg
                        className="size-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              );
            }

            // Public Article Card (Essay 01, Essay 02, etc.)
            return (
              <article
                key={post.id}
                onClick={() => onOpenPost(post)}
                className="relative border border-[#1e293b] bg-[#10172a] hover:border-[#334155] hover:bg-[#141d33] transition-all rounded-lg p-6 sm:p-7 group cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="text-xs font-mono-code uppercase tracking-wider text-[#64748b] flex items-center gap-1">
                    <span>{post.type.toUpperCase()} 0{idx + 1} •</span>
                    <EditableText
                      value={post.readTime}
                      onSave={(val) => onUpdatePostField(post.id, 'readTime', val)}
                      isAuthorMode={canEditInline}
                      className="text-xs font-mono-code text-[#64748b]"
                      ariaLabel="Edit read time"
                    />
                  </span>
                  <div className="flex items-center gap-2">
                    <EditableText
                      value={post.date}
                      onSave={(val) => onUpdatePostField(post.id, 'date', val)}
                      isAuthorMode={canEditInline}
                      className="text-xs text-[#64748b] font-mono-code"
                      ariaLabel="Edit date"
                    />
                    {canManage && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickEditPost(post.id, post.title, post.synopsis);
                          }}
                          className="text-[#94a3b8] hover:text-[#93c5fd] p-1.5 rounded hover:bg-[#1e293b] transition-colors cursor-pointer"
                          title="Edit this essay"
                          aria-label={`Edit ${post.title}`}
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        {(onRequestDeletePost || onDeletePost) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              if (onRequestDeletePost) {
                                onRequestDeletePost(post);
                              } else if (onDeletePost) {
                                onDeletePost(post.id);
                              }
                            }}
                            className="text-[#94a3b8] hover:text-[#ffb4ab] p-1.5 rounded hover:bg-[#24141c] hover:border hover:border-[#4d1f2b] transition-colors cursor-pointer"
                            title="Delete this manuscript"
                            aria-label={`Delete ${post.title}`}
                          >
                            <span className="material-symbols-outlined text-sm">delete</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Title directly editable */}
                <h3 className="text-xl md:text-2xl font-serif-title text-[#f1f5f9] font-normal group-hover:text-[#93c5fd] transition-colors mb-2 tracking-[-0.015em]">
                  <EditableText
                    value={post.title}
                    onSave={(val) => onUpdatePostField(post.id, 'title', val)}
                    isAuthorMode={canEditInline}
                    className="text-xl md:text-2xl font-serif-title text-[#f1f5f9]"
                    ariaLabel="Edit post title"
                  />
                </h3>

                {/* Synopsis directly editable */}
                <div className="mb-4">
                  <EditableText
                    value={post.synopsis}
                    onSave={(val) => onUpdatePostField(post.id, 'synopsis', val)}
                    isAuthorMode={canEditInline}
                    multiline={true}
                    className="text-[#94a3b8] text-sm md:text-base leading-relaxed font-body-ui block"
                    ariaLabel="Edit post synopsis"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#e2e8f0] group-hover:text-[#93c5fd] transition-colors">
                    <span>Read Essay</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                  <span className="text-xs font-mono-code text-[#64748b] bg-[#162038] px-2 py-0.5 rounded border border-[#1e293b]">
                    Public
                  </span>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};

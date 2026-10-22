import React, { useEffect, useState, useRef } from 'react';
import { Post, calculateReadingProgress } from '../utils/blog';
import { EditableText } from './EditableText';

interface ReaderViewProps {
  post: Post;
  authorName: string;
  onBack: () => void;
  onUpdatePost: (updatedPost: Post) => void;
  onDeletePost?: (post: Post) => void;
  isAuthorMode?: boolean;
  onLogout?: () => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  post,
  authorName,
  onBack,
  onUpdatePost,
  onDeletePost,
  isAuthorMode = true,
  onLogout,
}) => {
  const [progress, setProgress] = useState(15);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Scroll listener for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const pct = calculateReadingProgress(scrollTop, totalHeight, clientHeight);
      setProgress(Math.max(10, pct));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [post.id]);

  // Ambient sound generator (soft nocturnal rain / pink noise using Web Audio API)
  const toggleAmbientSound = () => {
    if (isAmbientPlaying) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsAmbientPlaying(false);
    } else {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 450;

        const gain = ctx.createGain();
        gain.gain.value = 0.2;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(0);

        setIsAmbientPlaying(true);
      } catch (err) {
        console.warn('Audio context init skipped:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Split paragraphs for granular editing, filtering out any redundant markdown # header lines
  const paragraphs = post.body
    .split('\n\n')
    .filter((p) => p.trim() && !p.trim().startsWith('# '));

  const handleUpdateParagraph = (index: number, newText: string) => {
    const updated = [...paragraphs];
    updated[index] = newText;
    onUpdatePost({
      ...post,
      body: updated.join('\n\n'),
    });
  };

  const handleAddParagraph = () => {
    const updated = [...paragraphs, 'New reflection written at 3 AM...'];
    onUpdatePost({
      ...post,
      body: updated.join('\n\n'),
    });
  };

  const handleAddQuote = () => {
    const updated = [...paragraphs, '> "A new thought to preserve in silence."'];
    onUpdatePost({
      ...post,
      body: updated.join('\n\n'),
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0f1d] flex flex-col text-[#e2e8f0]">
      {/* Reader Top Sticky Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-[#1e293b] px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#f1f5f9] transition-colors py-1 px-2.5 -ml-2 rounded hover:bg-[#10172a] cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span className="font-medium">Return to essays</span>
          </button>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 font-mono-code text-xs text-[#94a3b8]">
          {/* Author Mode Toggle inside Reader */}
          {isAuthorMode && (
            <>
              <button
                onClick={() => setIsEditingContent(!isEditingContent)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-xs cursor-pointer transition-colors ${
                  isEditingContent
                    ? 'bg-[#1e2b48] border-[#2e406b] text-[#93c5fd] font-bold'
                    : 'bg-[#10172a] border-[#1e293b] text-[#cbd5e1] hover:text-white'
                }`}
                title="Toggle Author In-Place Editor for this essay"
              >
                <span className="material-symbols-outlined text-sm">edit_note</span>
                <span>{isEditingContent ? 'Editing: ON' : 'Edit In-Place'}</span>
              </button>
              {onDeletePost && (
                <button
                  onClick={() => onDeletePost(post)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded border border-[#4d1f2b] bg-[#24141c] hover:bg-[#3b1d28] text-[#ffb4ab] hover:text-white text-xs cursor-pointer transition-colors"
                  title="Permanently delete this manuscript"
                  aria-label="Delete manuscript"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                  <span>Delete</span>
                </button>
              )}
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#4d1f2b] bg-[#24141c] hover:bg-[#331a26] text-[#ffb4ab] text-xs cursor-pointer transition-colors"
                  title="Log out and see reader view"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  <span>Log Out</span>
                </button>
              )}
            </>
          )}

          {/* Ambient Night Rain Toggle */}
          <button
            onClick={toggleAmbientSound}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] transition-colors cursor-pointer ${
              isAmbientPlaying
                ? 'bg-[#1e2b48] border-[#2e406b] text-[#93c5fd]'
                : 'bg-[#10172a] border-[#1e293b] text-[#64748b] hover:text-[#cbd5e1]'
            }`}
            title="Toggle ambient rain audio"
          >
            <span className="material-symbols-outlined text-sm">
              {isAmbientPlaying ? 'volume_up' : 'graphic_eq'}
            </span>
            <span>{isAmbientPlaying ? '3 AM Rain (ON)' : 'Night Ambience'}</span>
          </button>

          <span className="hidden sm:inline">{post.draftNumber || post.type}</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-[#93c5fd]">{post.readTime}</span>

          <div className="w-24 bg-[#162038] h-1.5 rounded-full overflow-hidden hidden md:block">
            <div
              className="bg-[#93c5fd] h-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Reading Container */}
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 md:py-20 w-full">
        {/* Author In-Place Editing Banner */}
        {isEditingContent && (
          <div className="mb-8 p-3 rounded-lg bg-[#162038] border border-[#2e406b] flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-[#cbd5e1]">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#93c5fd] animate-pulse" />
              <span>Editing Active: Click any title, lead, quote or paragraph below to edit.</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddParagraph}
                className="px-2 py-1 bg-[#1e293b] hover:bg-[#253556] text-[#93c5fd] rounded border border-[#334155] cursor-pointer"
              >
                + Add Paragraph
              </button>
              <button
                onClick={handleAddQuote}
                className="px-2 py-1 bg-[#1e293b] hover:bg-[#253556] text-[#93c5fd] rounded border border-[#334155] cursor-pointer"
              >
                + Add Pull-Quote
              </button>
            </div>
          </div>
        )}

        {/* Article Meta Header */}
        <div className="border-b border-[#1e293b] pb-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono-code tracking-wider font-semibold uppercase bg-[#1e2b48] text-[#93c5fd] border border-[#2e406b]">
              {post.isRestricted ? 'Verified Subscriber Access' : 'Public Archive Entry'}
            </span>
            <span className="text-xs text-[#64748b] font-mono-code">Written at 3:14 AM</span>
          </div>

          {/* Title - Directly editable */}
          <div className="mb-4">
            <EditableText
              value={post.title}
              onSave={(title) => onUpdatePost({ ...post, title })}
              isAuthorMode={isEditingContent}
              tag="h1"
              className="text-2xl md:text-4xl lg:text-[40px] font-serif-title text-[#f1f5f9] font-normal leading-tight md:leading-[1.25] tracking-tight block"
              ariaLabel="Edit essay headline"
            />
          </div>

          {/* Subtitle / Synopsis - Directly editable */}
          <div>
            <EditableText
              value={post.synopsis}
              onSave={(synopsis) => onUpdatePost({ ...post, synopsis })}
              isAuthorMode={isEditingContent}
              multiline={true}
              tag="p"
              className="text-[#94a3b8] text-base md:text-lg font-body-reading italic block"
              ariaLabel="Edit essay lead/synopsis"
            />
          </div>
        </div>

        {/* Article Body */}
        <article className="text-[#e2e8f0] font-body-reading text-[17px] md:text-[18px] leading-[1.85] space-y-8 tracking-wide font-light">
          {paragraphs.map((para, idx) => {
            if (para.startsWith('>')) {
              const quoteContent = para.replace(/^>\s*/, '').replace(/^"|"$/g, '');
              return (
                <div key={idx} className="my-8">
                  <blockquote className="border-l-2 border-[#93c5fd]/60 pl-6 py-2 text-xl md:text-2xl font-serif-title text-[#f1f5f9] italic">
                    <EditableText
                      value={quoteContent}
                      onSave={(newQuote) => handleUpdateParagraph(idx, `> "${newQuote}"`)}
                      isAuthorMode={isEditingContent}
                      multiline={true}
                      className="block"
                      ariaLabel="Edit pull quote"
                    />
                  </blockquote>
                </div>
              );
            }

            const isFirst = idx === 0 || (idx === 1 && paragraphs[0].startsWith('>'));

            return (
              <div key={idx}>
                <div className={isFirst && !isEditingContent ? 'drop-cap' : ''}>
                  <EditableText
                    value={para}
                    onSave={(newPara) => handleUpdateParagraph(idx, newPara)}
                    isAuthorMode={isEditingContent}
                    multiline={true}
                    className="block"
                    ariaLabel={`Edit paragraph ${idx + 1}`}
                  />
                </div>
              </div>
            );
          })}

          {/* Author sign-off */}
          <div className="pt-8 border-t border-[#1e293b] flex items-center justify-between">
            <div>
              <p className="text-sm font-serif-title text-[#f1f5f9] font-normal flex items-center gap-1">
                <span>—</span>
                <EditableText
                  value={authorName}
                  onSave={(name) => {
                    /* updated in site meta */
                  }}
                  isAuthorMode={false}
                  className="text-sm font-serif-title text-[#f1f5f9]"
                />
              </p>
              <p className="text-xs text-[#64748b] font-mono-code">Bangalore, Karnataka</p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 rounded text-xs font-mono-code uppercase tracking-wider text-[#cbd5e1] bg-[#10172a] hover:bg-[#1e293b] transition-colors border border-[#1e293b] cursor-pointer"
            >
              Finished Reading
            </button>
          </div>
        </article>

        {/* Reader Telemetry / Handshake Confirmation */}
        <div className="mt-20 pt-6 border-t border-dashed border-[#1e293b] flex items-center justify-between text-xs font-mono-code text-[#64748b]">
          <div className="flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-[#93c5fd]" />
            <span>Active session handshake successful. Reader telemetry logged.</span>
          </div>
          <span className="text-[#475569]">ID: sess_942_anthemsofheart</span>
        </div>
      </main>
    </div>
  );
};

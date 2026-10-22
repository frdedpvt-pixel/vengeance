import React, { useState } from 'react';
import { SiteMeta } from '../data/initialData';
import { EditableText } from './EditableText';

interface AboutModalProps {
  meta: SiteMeta;
  isOpen: boolean;
  onClose: () => void;
  onUpdateMeta?: (updates: Partial<SiteMeta>) => void;
  onOpenAvatarEditor?: () => void;
  isAuthorMode?: boolean;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  meta,
  isOpen,
  onClose,
  onUpdateMeta,
  onOpenAvatarEditor,
  isAuthorMode = true,
}) => {
  const [statement, setStatement] = useState(
    'DivyaShree writes about the quiet interiors of modern life—the dissonance between our digital presence and somatic reality, the architecture of solitude, and the necessary courage to remain unhurried in a world intoxicated by speed.'
  );
  const [quote, setQuote] = useState(
    'We build sanctuaries not to hide from the world, but to hear ourselves think when the world refuses to stop shouting.'
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-xl bg-[#0d1527] border border-[#253556] shadow-2xl p-7 sm:p-8 rounded-xl text-[#e2e8f0] overflow-y-auto max-h-[85vh]">
        <div className="flex items-center justify-between pb-4 border-b border-[#1e293b] mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`relative rounded-full border border-[#334155] shrink-0 ${
                isAuthorMode && onOpenAvatarEditor
                  ? 'cursor-pointer group hover:border-[#93c5fd] transition-colors'
                  : ''
              }`}
              onClick={() => {
                if (isAuthorMode && onOpenAvatarEditor) {
                  onClose();
                  onOpenAvatarEditor();
                }
              }}
              title={isAuthorMode ? 'Click to change profile picture' : undefined}
            >
              <div
                className="size-11 sm:size-12 rounded-full bg-cover bg-center overflow-hidden bg-[#162038]"
                style={{ backgroundImage: `url('${meta.avatarUrl}')` }}
              />
              {isAuthorMode && onOpenAvatarEditor && (
                <div className="absolute inset-0 rounded-full bg-black/55 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[#93c5fd]">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-serif-title text-[#f1f5f9] font-medium flex items-center gap-1.5">
                <EditableText
                  value={meta.authorName}
                  onSave={(authorName) => onUpdateMeta?.({ authorName })}
                  isAuthorMode={isAuthorMode}
                  className="text-xl font-serif-title text-[#f1f5f9]"
                  ariaLabel="Edit author name"
                />
              </h3>
              <div className="flex items-center gap-2">
                <p className="text-xs text-[#94a3b8] font-mono-code">{meta.location} • Editorial Sanctuary</p>
                {isAuthorMode && onOpenAvatarEditor && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAvatarEditor();
                    }}
                    className="text-[11px] text-[#93c5fd] hover:text-white font-mono-code underline cursor-pointer"
                  >
                    Change Photo
                  </button>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f1f5f9] p-1.5 rounded hover:bg-[#1e293b] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 font-body-reading text-[16px] text-[#cbd5e1] leading-relaxed">
          <p>
            Welcome to <strong className="text-[#f1f5f9]">{meta.title}</strong>, a living repository of personal essays, fragments of unfinished thought, and vault manuscripts composed primarily between midnight and dawn.
          </p>

          <div>
            <EditableText
              value={statement}
              onSave={setStatement}
              isAuthorMode={isAuthorMode}
              multiline={true}
              className="block"
              ariaLabel="Edit author literary statement"
            />
          </div>

          <blockquote className="my-6 border-l-2 border-[#93c5fd]/60 pl-4 py-1 italic text-[#f1f5f9] font-serif-title text-lg">
            "
            <EditableText
              value={quote}
              onSave={setQuote}
              isAuthorMode={isAuthorMode}
              multiline={true}
              className="inline"
              ariaLabel="Edit quote"
            />
            "
          </blockquote>

          <div className="pt-4 border-t border-[#1e293b] font-mono-code text-xs text-[#94a3b8] space-y-2">
            <p className="text-[#f1f5f9] font-semibold uppercase tracking-wider text-[11px]">
              Colophon &amp; Typography
            </p>
            <p>
              Typeset in <em>Playfair Display</em> for long-form literature, paired with <em>Inter</em> for structural UI and <em>JetBrains Mono</em> for metadata and cryptographic stamps.
            </p>
            <p>
              Rendered on a high-contrast nocturnal canvas (<code className="text-[#93c5fd]">#0A0F1D</code>) calibrated to reduce ocular strain during extended low-light reading.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#1e293b] flex justify-between items-center text-xs font-mono-code">
          <span className="text-[#64748b]">{meta.issueNo} • Bangalore, India</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1e293b] hover:bg-[#253556] text-[#e2e8f0] rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

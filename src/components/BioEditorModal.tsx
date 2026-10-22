import React, { useState } from 'react';
import { SiteMeta } from '../data/initialData';

interface BioEditorModalProps {
  meta: SiteMeta;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<SiteMeta>) => void;
  onOpenAvatarEditor?: () => void;
}

export const BioEditorModal: React.FC<BioEditorModalProps> = ({
  meta,
  isOpen,
  onClose,
  onSave,
  onOpenAvatarEditor,
}) => {
  const [title, setTitle] = useState(meta.title);
  const [subtitle, setSubtitle] = useState(meta.authorSubtitle);
  const [bio, setBio] = useState(meta.bio);
  const [issueNo, setIssueNo] = useState(meta.issueNo);
  const [location, setLocation] = useState(meta.location);
  const [readers, setReaders] = useState(meta.readers);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      authorSubtitle: subtitle,
      bio,
      issueNo,
      location,
      readers,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-lg bg-[#0d1527] border border-[#253556] shadow-2xl p-6 rounded-xl text-[#e2e8f0]">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e293b] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#93c5fd]">edit_document</span>
            <h3 className="text-base font-serif-title text-[#f1f5f9] font-medium">
              Edit About &amp; Header Colophon
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f1f5f9] p-1 rounded hover:bg-[#1e293b] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Author Profile Picture preview & quick edit trigger */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#10172a] border border-[#1e293b]">
            <div className="flex items-center gap-3">
              <div
                className="size-11 rounded-full bg-cover bg-center border border-[#334155] bg-[#162038] shrink-0"
                style={{ backgroundImage: `url('${meta.avatarUrl}')` }}
              />
              <div>
                <p className="text-xs font-semibold text-[#f1f5f9]">{meta.authorName}</p>
                <p className="text-[11px] text-[#94a3b8] font-mono-code">Author Profile Picture</p>
              </div>
            </div>
            {onOpenAvatarEditor && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAvatarEditor();
                }}
                className="px-3 py-1.5 bg-[#1e293b] hover:bg-[#253556] text-[#93c5fd] hover:text-white rounded text-xs font-mono-code transition-colors flex items-center gap-1 cursor-pointer border border-[#334155]"
              >
                <span className="material-symbols-outlined text-sm">photo_camera</span>
                <span>Change Photo</span>
              </button>
            )}
          </div>
          <div>
            <label className="block text-xs font-mono-code uppercase text-[#94a3b8] mb-1">
              Archive Header Title
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#10172a] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-[#f1f5f9] focus:outline-none focus:border-[#93c5fd]"
              />
              <button
                type="button"
                onClick={() => setTitle('Anthems of Heart')}
                className="text-[11px] font-mono-code text-[#93c5fd] hover:underline shrink-0 bg-[#162038] px-2 py-1.5 rounded border border-[#1e293b] cursor-pointer"
                title="Switch to alternate title from screenshot 2"
              >
                "Anthems of Heart"
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono-code uppercase text-[#94a3b8] mb-1">
              Author Subtitle
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-[#10172a] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-[#f1f5f9] focus:outline-none focus:border-[#93c5fd]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code uppercase text-[#94a3b8] mb-1">
              Curator Notes / Bio Paragraph
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#10172a] border border-[#1e293b] rounded-lg p-3 text-sm text-[#cbd5e1] focus:outline-none focus:border-[#93c5fd]"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-mono-code uppercase text-[#94a3b8] mb-1">
                Issue No.
              </label>
              <input
                type="text"
                value={issueNo}
                onChange={(e) => setIssueNo(e.target.value)}
                className="w-full bg-[#10172a] border border-[#1e293b] rounded px-2.5 py-1.5 text-xs text-[#cbd5e1] font-mono-code focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono-code uppercase text-[#94a3b8] mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#10172a] border border-[#1e293b] rounded px-2.5 py-1.5 text-xs text-[#cbd5e1] font-mono-code focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono-code uppercase text-[#94a3b8] mb-1">
                Readers
              </label>
              <input
                type="text"
                value={readers}
                onChange={(e) => setReaders(e.target.value)}
                className="w-full bg-[#10172a] border border-[#1e293b] rounded px-2.5 py-1.5 text-xs text-[#cbd5e1] font-mono-code focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#1e293b]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-mono-code text-[#94a3b8] hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#93c5fd] hover:bg-[#bfdbfe] text-[#0a0f1d] font-semibold text-xs font-mono-code rounded-lg transition-colors cursor-pointer"
            >
              Save Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

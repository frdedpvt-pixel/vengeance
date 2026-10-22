import React, { useState, useRef, useEffect } from 'react';
import { initialSiteMeta } from '../data/initialData';

interface AvatarEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatarUrl: string;
  authorName: string;
  onSaveAvatar: (newUrl: string) => void;
}

// Built-in poetic & literary avatar presets encoded as reliable SVG data URIs
const PRESET_AVATARS = [
  {
    id: 'original',
    name: 'Original',
    description: 'DivyaShree classical portrait',
    url: initialSiteMeta.avatarUrl,
  },
  {
    id: 'nocturne-bw',
    name: 'Nocturne Noir',
    description: 'High-contrast monochrome studio',
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cdefs%3E%3CradialGradient id='g1' cx='50%25' cy='45%25' r='60%25'%3E%3Cstop offset='0%25' stop-color='%23334155'/%3E%3Cstop offset='100%25' stop-color='%23090d16'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='160' height='160' fill='url(%23g1)'/%3E%3Ccircle cx='80' cy='62' r='32' fill='%23cbd5e1'/%3E%3Cpath d='M80 50 Q66 48 58 68 Q72 82 80 82 Q88 82 102 68 Q94 48 80 50 Z' fill='%231e293b' opacity='0.75'/%3E%3Cellipse cx='80' cy='134' rx='52' ry='34' fill='%2394a3b8'/%3E%3Cpath d='M80 94 L73 115 L87 115 Z' fill='%230f172a' opacity='0.4'/%3E%3Ccircle cx='80' cy='80' r='78' fill='none' stroke='%23475569' stroke-width='3' stroke-dasharray='4 3'/%3E%3C/svg%3E",
  },
  {
    id: 'ink-minimal',
    name: 'Ink & Paper',
    description: 'Minimalist editorial pen aesthetic',
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%230f172a'/%3E%3Ccircle cx='80' cy='80' r='68' fill='%23182234' stroke='%232e406b' stroke-width='2'/%3E%3Cpath d='M80 32 L92 78 L80 128 L68 78 Z' fill='%2393c5fd' opacity='0.85'/%3E%3Ccircle cx='80' cy='84' r='4' fill='%230a0f1d'/%3E%3Cline x1='80' y1='88' x2='80' y2='126' stroke='%230a0f1d' stroke-width='2'/%3E%3Cpath d='M50 128 C65 118 95 118 110 128' stroke='%2360a5fa' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E",
  },
  {
    id: 'night-silhouette',
    name: '3 AM Solitude',
    description: 'Nocturnal silhouette against indigo moon',
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23080c18'/%3E%3Ccircle cx='96' cy='64' r='38' fill='%231e293b' stroke='%2338bdf8' stroke-width='1.5' stroke-opacity='0.4'/%3E%3Ccircle cx='70' cy='72' r='26' fill='%230a0f1d'/%3E%3Cpath d='M40 148 C42 108 98 108 100 148 Z' fill='%230f172a' stroke='%231e293b' stroke-width='2'/%3E%3Cpath d='M56 148 C56 122 84 122 84 148 Z' fill='%23080c18'/%3E%3Ccircle cx='124' cy='36' r='1.5' fill='%2393c5fd'/%3E%3Ccircle cx='38' cy='46' r='1' fill='%2393c5fd'/%3E%3Ccircle cx='136' cy='80' r='1' fill='%2393c5fd'/%3E%3C/svg%3E",
  },
  {
    id: 'emerald-archive',
    name: 'Quiet Room',
    description: 'Verdant shadow & studio illumination',
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%2309141a'/%3E%3Ccircle cx='80' cy='80' r='66' fill='%230d232a' stroke='%23164e63' stroke-width='2'/%3E%3Ccircle cx='80' cy='62' r='28' fill='%2367e8f9' opacity='0.7'/%3E%3Cpath d='M44 136 C46 102 114 102 116 136 Z' fill='%23083344'/%3E%3Cpath d='M65 52 Q80 44 95 52 Q88 74 65 52 Z' fill='%2309141a'/%3E%3C/svg%3E",
  },
];

export const AvatarEditorModal: React.FC<AvatarEditorModalProps> = ({
  isOpen,
  onClose,
  currentAvatarUrl,
  authorName,
  onSaveAvatar,
}) => {
  const [selectedUrl, setSelectedUrl] = useState(currentAvatarUrl);
  const [urlInput, setUrlInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedUrl(currentAvatarUrl);
    setUrlInput('');
    setErrorMessage(null);
  }, [currentAvatarUrl, isOpen]);

  // Handle ESC dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleProcessFile = (file: File) => {
    setErrorMessage(null);
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WEBP, or SVG).');
      return;
    }

    // Limit to 8MB for performance and storage
    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage('Image size exceeds 8MB. Please select a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setSelectedUrl(result);
        setUrlInput('');
      }
    };
    reader.onerror = () => {
      setErrorMessage('Could not read the selected image file. Please try another.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleProcessFile(files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setErrorMessage('Please enter an image URL.');
      return;
    }
    try {
      new URL(trimmed);
      setSelectedUrl(trimmed);
      setErrorMessage(null);
    } catch {
      setErrorMessage('Invalid URL format. Please enter a valid https:// image link.');
    }
  };

  const handleSave = () => {
    onSaveAvatar(selectedUrl);
    onClose();
  };

  const handleResetToDefault = () => {
    setSelectedUrl(initialSiteMeta.avatarUrl);
    setUrlInput('');
    setErrorMessage(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="avatar-editor-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0d1527] border border-[#253556] shadow-2xl p-6 sm:p-7 rounded-xl text-[#e2e8f0] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1e293b] mb-5">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#93c5fd] text-xl">account_circle</span>
            <div>
              <h3
                id="avatar-editor-title"
                className="text-base font-serif-title text-[#f1f5f9] font-medium leading-tight"
              >
                Author Profile Picture
              </h3>
              <p className="text-xs text-[#94a3b8] font-mono-code mt-0.5">
                Update avatar for {authorName} across header, essays &amp; colophon
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f1f5f9] p-1.5 rounded-lg hover:bg-[#1e293b] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Live Preview Strip */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#10172a] border border-[#1e293b] mb-5">
          <div className="relative group shrink-0">
            <div
              className="size-16 sm:size-20 rounded-full bg-cover bg-center border-2 border-[#334155] shadow-lg ring-2 ring-[#0a0f1d] overflow-hidden bg-[#162038]"
              style={{ backgroundImage: `url('${selectedUrl}')` }}
            />
            <span
              className="absolute bottom-0 right-0 size-3.5 rounded-full bg-emerald-400 ring-2 ring-[#0a0f1d]"
              title="Active author portrait"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-[#f1f5f9] truncate">{authorName}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-code uppercase bg-[#1e2b48] text-[#93c5fd] border border-[#2e406b]">
                Active Portrait
              </span>
            </div>
            <p className="text-xs text-[#94a3b8] font-mono-code truncate">
              {selectedUrl.startsWith('data:')
                ? 'Custom Uploaded / Preset Vector'
                : selectedUrl.length > 45
                ? `${selectedUrl.substring(0, 45)}...`
                : selectedUrl}
            </p>
            <button
              type="button"
              onClick={handleResetToDefault}
              className="mt-2 text-[11px] text-[#93c5fd] hover:text-white font-mono-code underline cursor-pointer"
            >
              Reset to original portrait
            </button>
          </div>
        </div>

        {/* Error notification if any */}
        {errorMessage && (
          <div className="mb-4 p-2.5 rounded-lg bg-[#24141c] border border-[#4d1f2b] text-[#ffb4ab] text-xs font-mono-code flex items-center gap-2">
            <span className="material-symbols-outlined text-sm shrink-0">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Option 1: Upload from Device */}
        <div className="mb-5">
          <label className="block text-xs font-mono-code uppercase text-[#94a3b8] mb-1.5">
            1. Upload Photo from Device
          </label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all ${
              isDragOver
                ? 'border-[#93c5fd] bg-[#1e2b48]/40'
                : 'border-[#1e293b] hover:border-[#334155] bg-[#10172a]/70 hover:bg-[#141d33]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
            <div className="flex flex-col items-center justify-center gap-1.5">
              <div className="size-10 rounded-full bg-[#1e293b] flex items-center justify-center text-[#93c5fd]">
                <span className="material-symbols-outlined text-xl">upload_file</span>
              </div>
              <p className="text-xs font-medium text-[#f1f5f9] mt-1">
                Click to browse photo or drag &amp; drop here
              </p>
              <p className="text-[11px] text-[#64748b] font-mono-code">
                PNG, JPG, WEBP, or SVG (square 1:1 recommended)
              </p>
            </div>
          </div>
        </div>

        {/* Option 2: Curated Poetic Presets */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-mono-code uppercase text-[#94a3b8]">
              2. Or Select a Curated Portrait Preset
            </label>
            <span className="text-[10px] font-mono-code text-[#64748b]">
              {PRESET_AVATARS.length} Presets
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2.5">
            {PRESET_AVATARS.map((preset) => {
              const isSelected = selectedUrl === preset.url;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setSelectedUrl(preset.url);
                    setErrorMessage(null);
                  }}
                  className={`group relative flex flex-col items-center p-1.5 rounded-lg border transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'border-[#93c5fd] bg-[#1e2b48] shadow-md shadow-[#93c5fd]/10 ring-1 ring-[#93c5fd]'
                      : 'border-[#1e293b] bg-[#10172a] hover:border-[#334155] hover:bg-[#162038]'
                  }`}
                  title={`${preset.name} — ${preset.description}`}
                >
                  <div
                    className="size-11 rounded-full bg-cover bg-center border border-[#334155] mb-1.5 shrink-0 bg-[#0a0f1d]"
                    style={{ backgroundImage: `url('${preset.url}')` }}
                  />
                  <span
                    className={`text-[10px] font-mono-code truncate w-full px-0.5 leading-tight ${
                      isSelected ? 'text-[#93c5fd] font-semibold' : 'text-[#94a3b8] group-hover:text-white'
                    }`}
                  >
                    {preset.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Option 3: Custom Web Image URL */}
        <div className="mb-6">
          <label className="block text-xs font-mono-code uppercase text-[#94a3b8] mb-1.5">
            3. Or Paste Direct Image URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="url"
              placeholder="https://example.com/author-portrait.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 bg-[#10172a] border border-[#1e293b] rounded-lg px-3 py-2 text-xs font-mono-code text-[#f1f5f9] placeholder:text-[#475569] focus:outline-none focus:border-[#93c5fd]"
            />
            <button
              type="button"
              onClick={handleApplyUrl}
              className="px-3 py-2 bg-[#1e293b] hover:bg-[#253556] text-xs font-mono-code text-[#cbd5e1] hover:text-white rounded-lg transition-colors cursor-pointer shrink-0 border border-[#334155]"
            >
              Preview
            </button>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-between pt-3.5 border-t border-[#1e293b]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono-code text-[#94a3b8] hover:text-white rounded-lg hover:bg-[#1e293b] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-[#93c5fd] hover:bg-[#bfdbfe] text-[#0a0f1d] font-semibold text-xs font-mono-code rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <span className="material-symbols-outlined text-sm">check</span>
              <span>Apply Profile Picture</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

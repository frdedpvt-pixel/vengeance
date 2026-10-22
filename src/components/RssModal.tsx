import React, { useState } from 'react';
import { Post } from '../utils/blog';

interface RssModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteTitle: string;
  posts: Post[];
}

export const RssModal: React.FC<RssModalProps> = ({
  isOpen,
  onClose,
  siteTitle,
  posts,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const feedUrl = `${window.location.origin}/feed.xml`;

  const handleCopy = () => {
    navigator.clipboard.writeText(feedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const xmlPreview = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${siteTitle}</title>
    <link>${window.location.origin}</link>
    <description>Essays, fragments &amp; observations by DivyaShree</description>
    <language>en-us</language>
    ${posts
      .slice(0, 3)
      .map(
        (p) => `
    <item>
      <title>${p.title}</title>
      <link>${window.location.origin}#${p.id}</link>
      <description>${p.synopsis}</description>
      <pubDate>${p.date} 2024 03:14:00 GMT</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-xl bg-[#0d1527] border border-[#253556] shadow-2xl p-6 sm:p-7 rounded-xl text-[#e2e8f0]">
        <div className="flex items-center justify-between pb-3 border-b border-[#1e293b] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#93c5fd]">rss_feed</span>
            <h3 className="text-base font-serif-title text-[#f1f5f9] font-medium">
              RSS Feed Syndication
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#94a3b8] hover:text-[#f1f5f9] p-1 rounded hover:bg-[#1e293b] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <p className="text-xs font-body-ui text-[#94a3b8] mb-3">
          Subscribe in your preferred RSS / Atom reader (NetNewsWire, Reeder, Feedly, Feedbin).
        </p>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            readOnly
            value={feedUrl}
            className="w-full bg-[#10172a] border border-[#1e293b] rounded px-3 py-2 text-xs text-[#93c5fd] font-mono-code focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 bg-[#1e2b48] hover:bg-[#2e406b] text-[#93c5fd] border border-[#2e406b] rounded text-xs font-mono-code shrink-0 cursor-pointer transition-colors"
          >
            {copied ? 'Copied!' : 'Copy Feed URL'}
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono-code uppercase text-[#64748b]">
            Raw XML Manifest Preview:
          </label>
          <pre className="p-3 bg-[#0a0f1d] border border-[#1e293b] rounded-lg text-[11px] font-mono-code text-[#cbd5e1] overflow-x-auto max-h-48 leading-tight">
            {xmlPreview}
          </pre>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#1e293b] mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1e293b] hover:bg-[#253556] text-[#e2e8f0] text-xs font-mono-code rounded cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

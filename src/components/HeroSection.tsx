import React from 'react';
import { SiteMeta } from '../data/initialData';
import { EditableText } from './EditableText';

interface HeroSectionProps {
  meta: SiteMeta;
  onUpdateMeta: (updates: Partial<SiteMeta>) => void;
  isInlineEditMode: boolean;
  onOpenBioEditor: () => void;
  onOpenAvatarEditor?: () => void;
  onOpenRss: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  meta,
  onUpdateMeta,
  isInlineEditMode,
  onOpenBioEditor,
  onOpenAvatarEditor,
  onOpenRss,
}) => {
  return (
    <section className="px-4 md:px-0 pt-8 pb-4">
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div className="flex min-w-72 flex-col gap-2 max-w-2xl">
          {/* Site Title - Directly editable */}
          <EditableText
            value={meta.title}
            onSave={(title) => onUpdateMeta({ title })}
            isAuthorMode={isInlineEditMode}
            tag="h1"
            className="text-[#f1f5f9] text-3xl md:text-4xl lg:text-[40px] font-normal leading-tight font-serif-title tracking-[-0.02em]"
            ariaLabel="Edit site title"
          />

          {/* Subtitle - Directly editable */}
          <EditableText
            value={meta.authorSubtitle}
            onSave={(authorSubtitle) => onUpdateMeta({ authorSubtitle })}
            isAuthorMode={isInlineEditMode}
            tag="p"
            className="text-[#94a3b8] text-base md:text-lg font-normal leading-normal font-body-ui"
            ariaLabel="Edit author subtitle"
          />
        </div>

        {/* RSS Feed button */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenRss}
            className="flex items-center gap-2 px-3.5 py-2 rounded bg-[#10172a] hover:bg-[#162038] border border-[#1e293b] hover:border-[#334155] text-xs font-mono-code text-[#cbd5e1] hover:text-[#93c5fd] transition-all cursor-pointer"
            title="View XML RSS Feed"
          >
            <span className="material-symbols-outlined text-base text-[#93c5fd]">rss_feed</span>
            <span>RSS Feed</span>
          </button>
        </div>
      </div>

      {/* Bio Paragraph - Directly editable */}
      <div className="pt-3 pb-3 max-w-2xl">
        <EditableText
          value={meta.bio}
          onSave={(bio) => onUpdateMeta({ bio })}
          isAuthorMode={isInlineEditMode}
          multiline={true}
          tag="p"
          className="text-[#cbd5e1] font-body-reading text-base md:text-[17px] font-light leading-relaxed block"
          ariaLabel="Edit curator bio notes"
        />
      </div>

      {/* Metadata Badges - Each directly editable */}
      <div className="flex flex-wrap items-center gap-2 text-[#64748b] font-mono-code text-xs tracking-wider uppercase pb-4 pt-1">
        <EditableText
          value={meta.issueNo}
          onSave={(issueNo) => onUpdateMeta({ issueNo })}
          isAuthorMode={isInlineEditMode}
          tag="span"
          ariaLabel="Edit issue badge"
        />
        <span>•</span>
        <EditableText
          value={meta.location}
          onSave={(location) => onUpdateMeta({ location })}
          isAuthorMode={isInlineEditMode}
          tag="span"
          ariaLabel="Edit location"
        />
        <span>•</span>
        <EditableText
          value={meta.readers}
          onSave={(readers) => onUpdateMeta({ readers })}
          isAuthorMode={isInlineEditMode}
          tag="span"
          ariaLabel="Edit reader count"
        />

        {isInlineEditMode && (
          <span className="ml-3 inline-flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenBioEditor}
              className="text-[11px] text-[#93c5fd] hover:underline flex items-center gap-1 font-mono-code bg-[#162038] px-2.5 py-0.5 rounded border border-[#2e406b] cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">edit</span> Full Bio Editor
            </button>
            {onOpenAvatarEditor && (
              <button
                type="button"
                onClick={onOpenAvatarEditor}
                className="text-[11px] text-[#93c5fd] hover:underline flex items-center gap-1 font-mono-code bg-[#162038] px-2.5 py-0.5 rounded border border-[#2e406b] cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">photo_camera</span> Change Avatar
              </button>
            )}
          </span>
        )}
      </div>
    </section>
  );
};

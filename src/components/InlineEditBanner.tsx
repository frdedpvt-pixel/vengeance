import React from 'react';

interface InlineEditBannerProps {
  onOpenComposer: () => void;
  onExitEditMode: () => void;
  onLogout?: () => void;
}

export const InlineEditBanner: React.FC<InlineEditBannerProps> = ({
  onOpenComposer,
  onExitEditMode,
  onLogout,
}) => {
  return (
    <div className="mx-4 md:mx-0 mb-6 p-3 rounded-lg bg-[#162038] border border-[#2e406b] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code text-[#cbd5e1] shadow-lg shadow-[#050811]">
      <div className="flex items-center gap-2.5">
        <span className="size-2 rounded-full bg-[#93c5fd] animate-pulse" />
        <span className="text-[#f1f5f9] font-medium">Author Inline Editing Active:</span>
        <span className="text-[#94a3b8] hidden sm:inline">
          Click inline edit buttons on cards to revise title &amp; synopsis.
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-2.5 py-1 rounded bg-[#1e293b] hover:bg-[#253556] text-[#93c5fd] border border-[#334155] transition-colors cursor-pointer"
          onClick={onOpenComposer}
        >
          + New Draft
        </button>
        {onLogout && (
          <button
            className="px-2.5 py-1 rounded bg-[#24141c] hover:bg-[#331a26] text-[#ffb4ab] hover:text-white border border-[#4d1f2b] transition-colors cursor-pointer flex items-center gap-1"
            onClick={onLogout}
            title="Log out to view site as reader"
          >
            <span className="material-symbols-outlined text-xs">logout</span>
            <span>Log Out (Reader View)</span>
          </button>
        )}
        <button
          className="px-2 py-1 text-[#94a3b8] hover:text-[#f1f5f9] transition-colors cursor-pointer"
          onClick={onExitEditMode}
          title="Hide this banner"
        >
          Hide Banner
        </button>
      </div>
    </div>
  );
};

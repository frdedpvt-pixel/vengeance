import React, { useState, useRef, useEffect } from 'react';
import { EditableText } from './EditableText';

interface HeaderProps {
  siteTitle: string;
  onUpdateSiteTitle: (newTitle: string) => void;
  avatarUrl: string;
  isAuthorSessionActive: boolean;
  isInlineEditMode: boolean;
  onToggleInlineEdit: () => void;
  onOpenComposer: () => void;
  onOpenBioEditor: () => void;
  onOpenAvatarEditor?: () => void;
  onOpenVault: () => void;
  onOpenSubscribe: () => void;
  onNavigateTab: (tab: string) => void;
  activeTab: string;
  onResetDefaults?: () => void;
  onPreviewIab?: () => void;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  siteTitle,
  onUpdateSiteTitle,
  avatarUrl,
  isAuthorSessionActive,
  isInlineEditMode,
  onToggleInlineEdit,
  onOpenComposer,
  onOpenBioEditor,
  onOpenAvatarEditor,
  onOpenVault,
  onOpenSubscribe,
  onNavigateTab,
  activeTab,
  onResetDefaults,
  onPreviewIab,
  onLogout,
  onOpenLogin,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResetConfirming, setIsResetConfirming] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
        setIsResetConfirming(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="relative flex items-center justify-between whitespace-nowrap border-b border-[#1e293b] px-4 md:px-10 py-3 bg-[#0a0f1d]/90 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4 text-[#f1f5f9]">
        <div className="flex items-center gap-3 text-left">
          <div className="size-4 text-[#93c5fd] shrink-0">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
                fill="currentColor"
              />
              <path
                clipRule="evenodd"
                d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <EditableText
            value={siteTitle}
            onSave={onUpdateSiteTitle}
            isAuthorMode={isAuthorSessionActive && isInlineEditMode}
            tag="h2"
            className="text-[#f1f5f9] text-lg font-bold leading-tight font-serif-title tracking-[-0.01em]"
          />
        </div>
      </div>

      <div className="flex flex-1 justify-end items-center gap-4 md:gap-8">
        <nav className="hidden md:flex items-center gap-7 font-body-ui text-sm">
          <button
            onClick={() => onNavigateTab('essays')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'essays' ? 'text-[#93c5fd] font-semibold' : 'text-[#cbd5e1] hover:text-[#f8fafc]'
            }`}
          >
            Essays
          </button>
          <button
            onClick={() => onNavigateTab('fragments')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'fragments' ? 'text-[#93c5fd] font-semibold' : 'text-[#cbd5e1] hover:text-[#f8fafc]'
            }`}
          >
            Fragments
          </button>
          <button
            onClick={() => onNavigateTab('archive')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'archive' ? 'text-[#93c5fd] font-semibold' : 'text-[#cbd5e1] hover:text-[#f8fafc]'
            }`}
          >
            Archive
          </button>
          <button
            onClick={() => onNavigateTab('about')}
            className={`transition-colors cursor-pointer ${
              activeTab === 'about' ? 'text-[#93c5fd] font-semibold' : 'text-[#cbd5e1] hover:text-[#f8fafc]'
            }`}
          >
            About
          </button>
        </nav>

        <button
          onClick={onOpenSubscribe}
          className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded h-9 px-4 bg-[#1e293b] hover:bg-[#334155] text-[#e2e8f0] text-sm font-medium border border-[#334155] leading-normal tracking-[0.015em] transition-colors focus:ring-1 focus:ring-[#93c5fd]"
        >
          <span>Subscribe</span>
        </button>

        {/* Author Avatar & Session Controls */}
        <div className="flex items-center gap-2">
          {isAuthorSessionActive && onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1e293b]/80 hover:bg-[#28151f] border border-[#334155] hover:border-[#6b2131] text-xs font-mono-code text-[#cbd5e1] hover:text-[#ffb4ab] transition-all cursor-pointer shadow-sm"
              title="Log out to view site from the reader's perspective"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span className="font-medium">Reader View</span>
              <span className="text-[10px] text-[#94a3b8] hidden sm:inline">(Log Out)</span>
            </button>
          )}

          <div className="relative" ref={dropdownRef}>
            {isAuthorSessionActive ? (
              /* Author Session Active: dropdown toggle with green dot */
              <button
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                aria-label="Author menu and settings"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="group flex items-center gap-1.5 p-1 rounded-full border border-[#334155] hover:border-[#93c5fd]/70 bg-[#10172a] hover:bg-[#162038] transition-all focus:outline-none focus:ring-2 focus:ring-[#93c5fd]/50 cursor-pointer"
              >
                <div className="relative">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 md:size-9"
                    style={{ backgroundImage: `url('${avatarUrl}')` }}
                    title="Author Studio: DivyaShree"
                  />
                  <span
                    className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0a0f1d]"
                    title="Author session active"
                  />
                </div>
                <span className="material-symbols-outlined text-xs text-[#94a3b8] group-hover:text-[#93c5fd] transition-transform duration-200 pr-1">
                  expand_more
                </span>
              </button>
            ) : (
              /* Reader Mode (Logged Out): Clean Avatar matching Image 5, clicking opens login */
              <button
                aria-label="Author Sign In"
                onClick={onOpenLogin}
                className="group flex items-center gap-2 p-1 pr-2.5 rounded-full border border-transparent hover:border-[#334155] bg-transparent hover:bg-[#10172a] transition-all focus:outline-none cursor-pointer"
                title="Sign in as Author (DivyaShree)"
              >
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 md:size-9 opacity-85 group-hover:opacity-100 transition-opacity ring-1 ring-[#1e293b] group-hover:ring-[#93c5fd]/40"
                  style={{ backgroundImage: `url('${avatarUrl}')` }}
                />
                <span className="hidden sm:inline text-xs font-mono-code text-[#94a3b8] group-hover:text-[#93c5fd] transition-colors">
                  Author Login
                </span>
              </button>
            )}

            {/* Author Access Dropdown Menu (Only when session is active) */}
          {isAuthorSessionActive && isDropdownOpen && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 rounded-xl bg-[#0d1527] border border-[#253556] shadow-2xl p-4 text-[#e2e8f0] z-50 backdrop-blur-xl transition-all duration-200 origin-top-right">
              {/* Header with author info */}
              <div className="flex items-center gap-3 pb-3.5 border-b border-[#1e293b]">
                <div
                  className="relative group shrink-0 cursor-pointer"
                  onClick={() => {
                    if (onOpenAvatarEditor) {
                      setIsDropdownOpen(false);
                      onOpenAvatarEditor();
                    }
                  }}
                  title="Click to change profile picture"
                >
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-[#334155] group-hover:border-[#93c5fd] transition-all overflow-hidden bg-[#162038]"
                    style={{ backgroundImage: `url('${avatarUrl}')` }}
                  />
                  <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[#93c5fd]">
                    <span className="material-symbols-outlined text-base">photo_camera</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#f1f5f9] truncate">DivyaShree</p>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono-code uppercase bg-[#1e2b48] text-[#93c5fd] border border-[#2e406b]">
                      Author
                    </span>
                  </div>
                  <p className="text-xs text-[#94a3b8] font-mono-code truncate">Editor &amp; Curator Session</p>
                  {onOpenAvatarEditor && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onOpenAvatarEditor();
                      }}
                      className="text-[11px] text-[#93c5fd] hover:text-white font-mono-code flex items-center gap-1 mt-0.5 cursor-pointer underline"
                    >
                      <span className="material-symbols-outlined text-[13px]">add_a_photo</span>
                      <span>Change Picture</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Author Quick Actions */}
              <div className="py-3 space-y-1.5">
                {/* Write New Post Button */}
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#1e293b] hover:bg-[#253556] text-[#f1f5f9] transition-all text-left group cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onOpenComposer();
                  }}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#93c5fd] text-lg">edit_square</span>
                    <span>+ Write New Essay / Draft</span>
                  </span>
                  <span className="text-[11px] font-mono-code text-[#94a3b8] group-hover:text-[#93c5fd]">
                    Composer →
                  </span>
                </button>

                {/* Change Profile Picture Action Button */}
                {onOpenAvatarEditor && (
                  <button
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#10172a] hover:bg-[#162038] text-[#cbd5e1] hover:text-[#f1f5f9] transition-all text-left border border-[#1e293b] cursor-pointer"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onOpenAvatarEditor();
                    }}
                  >
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span className="material-symbols-outlined text-[#93c5fd] text-lg">account_box</span>
                      <span>Change Profile Picture</span>
                    </span>
                    <span className="text-[11px] font-mono-code text-[#94a3b8] group-hover:text-[#93c5fd]">
                      Photo / Presets →
                    </span>
                  </button>
                )}

                {/* Toggle Inline Editing Mode */}
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#10172a] hover:bg-[#162038] text-[#cbd5e1] hover:text-[#f1f5f9] transition-all text-left border border-[#1e293b] cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onToggleInlineEdit();
                  }}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#94a3b8] text-lg">edit_note</span>
                    <span>Inline Editing Mode</span>
                  </span>
                  <span
                    className={`text-[10px] uppercase font-mono-code px-2 py-0.5 rounded ${
                      isInlineEditMode
                        ? 'bg-[#1e2b48] text-[#93c5fd] font-bold border border-[#2e406b]'
                        : 'bg-[#162038] text-[#94a3b8]'
                    }`}
                  >
                    {isInlineEditMode ? 'ACTIVE' : 'OFF'}
                  </span>
                </button>

                {/* Edit About & Colophon */}
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#10172a] hover:bg-[#162038] text-[#cbd5e1] hover:text-[#f1f5f9] transition-all text-left border border-[#1e293b] cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onOpenBioEditor();
                  }}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#94a3b8] text-lg">person_edit</span>
                    <span>Edit About &amp; Colophon</span>
                  </span>
                  <span className="text-xs text-[#64748b] font-mono-code">Bio notes</span>
                </button>

                {/* Archive & Draft Vault Manager */}
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#10172a] hover:bg-[#162038] text-[#cbd5e1] hover:text-[#f1f5f9] transition-all text-left border border-[#1e293b] cursor-pointer"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onOpenVault();
                  }}
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span className="material-symbols-outlined text-[#93c5fd] text-lg">folder_special</span>
                    <span>Archive &amp; Draft Vault</span>
                  </span>
                  <span className="text-[11px] font-mono-code text-[#93c5fd]">Vault Desk</span>
                </button>

                {/* Test Instagram IAB Breakout Screen */}
                {onPreviewIab && (
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#10172a] hover:bg-[#162038] text-[#cbd5e1] hover:text-[#f1f5f9] transition-all text-left border border-[#1e293b] cursor-pointer text-xs font-mono-code"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      onPreviewIab();
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#93c5fd] text-base">
                        open_in_browser
                      </span>
                      <span>Test Instagram Breakout UI</span>
                    </span>
                    <span className="text-[10px] text-[#94a3b8] font-mono-code">Preview</span>
                  </button>
                )}

                {/* Reset to Defaults */}
                {onResetDefaults && (
                  <button
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left border cursor-pointer text-xs font-mono-code ${
                      isResetConfirming
                        ? 'bg-[#24141c] hover:bg-[#331a26] text-[#ffdad6] border-[#4d1f2b]'
                        : 'bg-[#10172a]/70 hover:bg-[#162038] text-[#94a3b8] hover:text-[#cbd5e1] border-[#1e293b]'
                    }`}
                    onClick={() => {
                      if (isResetConfirming) {
                        onResetDefaults();
                        setIsDropdownOpen(false);
                        setIsResetConfirming(false);
                      } else {
                        setIsResetConfirming(true);
                      }
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">restart_alt</span>
                      <span>{isResetConfirming ? 'Click again to confirm reset' : 'Reset Texts to Default'}</span>
                    </span>
                  </button>
                )}
              </div>

              {/* Dedicated Logout Button (Prominent) */}
              <div className="pt-2 border-t border-[#1e293b]">
                <button
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#24141c] hover:bg-[#331a26] text-[#ffdad6] border border-[#4d1f2b] transition-all text-left cursor-pointer group"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onLogout();
                  }}
                >
                  <span className="flex items-center gap-2 text-xs font-mono-code font-semibold text-[#ffb4ab]">
                    <span className="material-symbols-outlined text-base">logout</span>
                    <span>Log Out (Switch to Reader View)</span>
                  </span>
                  <span className="text-[10px] font-mono-code uppercase text-[#ffdad6]/70 group-hover:text-white">
                    Public Mode →
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </header>
  );
};

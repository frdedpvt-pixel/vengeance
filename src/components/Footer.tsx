import React from 'react';
import { EditableText } from './EditableText';

interface FooterProps {
  authorName: string;
  onUpdateAuthorName?: (name: string) => void;
  isAuthorMode?: boolean;
  isAuthorAuthenticated?: boolean;
  onOpenAuthorLogin?: () => void;
  onOpenColophon: () => void;
  onOpenPrivacy: () => void;
  onOpenIndex: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  authorName,
  onUpdateAuthorName,
  isAuthorMode = false,
  isAuthorAuthenticated = true,
  onOpenAuthorLogin,
  onOpenColophon,
  onOpenPrivacy,
  onOpenIndex,
}) => {
  return (
    <footer className="border-t border-[#1e293b] py-8 px-4 text-xs text-[#64748b] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-code max-w-[960px] mx-auto w-full">
      <div className="flex items-center gap-1.5">
        <span>© 2024</span>
        {onUpdateAuthorName && isAuthorMode ? (
          <EditableText
            value={authorName}
            onSave={onUpdateAuthorName}
            isAuthorMode={isAuthorMode}
            className="text-xs text-[#64748b]"
            ariaLabel="Edit author name"
          />
        ) : (
          <span>{authorName}</span>
        )}
        <span>. All rights reserved.</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onOpenColophon}
          className="hover:text-[#e2e8f0] transition-colors cursor-pointer"
        >
          Colophon
        </button>
        <span>/</span>
        <button
          onClick={onOpenPrivacy}
          className="hover:text-[#e2e8f0] transition-colors cursor-pointer"
        >
          Privacy Note
        </button>
        <span>/</span>
        <button
          onClick={onOpenIndex}
          className="hover:text-[#e2e8f0] transition-colors cursor-pointer"
        >
          Index
        </button>
        {!isAuthorAuthenticated && onOpenAuthorLogin && (
          <>
            <span>/</span>
            <button
              onClick={onOpenAuthorLogin}
              className="text-[#93c5fd] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Author Login"
            >
              <span className="material-symbols-outlined text-xs">lock</span>
              <span>Author Access</span>
            </button>
          </>
        )}
      </div>
    </footer>
  );
};

import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  isAuthorMode?: boolean;
  multiline?: boolean;
  className?: string;
  inputClassName?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'blockquote' | 'div';
  placeholder?: string;
  ariaLabel?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  isAuthorMode = true,
  multiline = false,
  className = '',
  inputClassName = '',
  tag: Tag = 'span',
  placeholder = 'Click to edit...',
  ariaLabel = 'Edit text',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleCommit = () => {
    setIsEditing(false);
    if (draft.trim() !== value.trim() && draft.trim().length > 0) {
      onSave(draft.trim());
    } else {
      setDraft(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleCommit();
    } else if (e.key === 'Escape') {
      setDraft(value);
      setIsEditing(false);
    }
  };

  if (!isAuthorMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (isEditing) {
    return (
      <div className="relative inline-block w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={handleCommit}
            onKeyDown={handleKeyDown}
            rows={Math.max(2, draft.split('\n').length)}
            className={`w-full bg-[#10172a] text-[#f1f5f9] border border-[#93c5fd] rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#93c5fd] shadow-lg ${inputClassName}`}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={handleCommit}
            onKeyDown={handleKeyDown}
            className={`w-full bg-[#10172a] text-[#f1f5f9] border border-[#93c5fd] rounded px-2.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#93c5fd] shadow-lg ${inputClassName}`}
            placeholder={placeholder}
          />
        )}
        <div className="flex items-center gap-1.5 mt-1 text-[11px] font-mono text-[#94a3b8]">
          <span>Press Enter or click outside to save • Esc to cancel</span>
        </div>
      </div>
    );
  }

  return (
    <Tag
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`group relative inline-flex items-center gap-1.5 cursor-pointer hover:outline-dashed hover:outline-1 hover:outline-[#93c5fd]/60 hover:rounded hover:bg-[#162038]/30 transition-all ${className}`}
      title="Click to edit (Author mode)"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsEditing(true);
        }
      }}
      aria-label={ariaLabel}
    >
      <span>{value || placeholder}</span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#93c5fd] ml-1 shrink-0">
        <svg
          className="size-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
      </span>
    </Tag>
  );
};

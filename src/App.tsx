import React, { useState, useEffect } from 'react';
import { initialPosts, initialSiteMeta, SiteMeta } from './data/initialData';
import { Post } from './utils/blog';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InlineEditBanner } from './components/InlineEditBanner';
import { WritingsFeed } from './components/WritingsFeed';
import { DecryptModal } from './components/DecryptModal';
import { ReaderView } from './components/ReaderView';
import { ComposerModal } from './components/ComposerModal';
import { BioEditorModal } from './components/BioEditorModal';
import { VaultModal } from './components/VaultModal';
import { SubscribeModal } from './components/SubscribeModal';
import { AboutModal } from './components/AboutModal';
import { RssModal } from './components/RssModal';
import { QuickEditModal } from './components/QuickEditModal';
import { Footer } from './components/Footer';
import { InstagramBreakoutModal } from './components/InstagramBreakoutModal';
import { AuthorLoginModal } from './components/AuthorLoginModal';
import { DeletePostModal } from './components/DeletePostModal';
import { AvatarEditorModal } from './components/AvatarEditorModal';

const STORAGE_KEY_META = 'anthems_of_heart_meta_v2';
const STORAGE_KEY_POSTS = 'anthems_of_heart_posts_v2';

export default function App() {
  // State with LocalStorage persistence
  const [siteMeta, setSiteMeta] = useState<SiteMeta>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_META);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure title is Anthems of Heart if previous cache had older title
        if (parsed.title?.includes('Quiet Things') || parsed.title?.includes('[DS]')) {
          parsed.title = 'Anthems of Heart';
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Could not read siteMeta from storage', e);
    }
    return initialSiteMeta;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POSTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read posts from storage', e);
    }
    return initialPosts;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_META, JSON.stringify(siteMeta));
    } catch (e) {
      console.warn('Could not write siteMeta to storage', e);
    }
  }, [siteMeta]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts));
    } catch (e) {
      console.warn('Could not write posts to storage', e);
    }
  }, [posts]);

  const [activeTab, setActiveTab] = useState('all');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [readingPost, setReadingPost] = useState<Post | null>(null);

  // Author & edit states (persisted in localStorage)
  const STORAGE_KEY_AUTH = 'anthems_of_heart_author_active_v2';
  const [isAuthorSessionActive, setIsAuthorSessionActive] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH);
      if (saved !== null) {
        return saved === 'true';
      }
    } catch (e) {
      console.warn('Could not read auth state from storage', e);
    }
    return true; // default active on first launch
  });
  const [isInlineEditMode, setIsInlineEditMode] = useState<boolean>(() => {
    return isAuthorSessionActive;
  });

  // Modals state
  const [isAuthorLoginOpen, setIsAuthorLoginOpen] = useState(false);
  const [sessionNotice, setSessionNotice] = useState<string | null>(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [, setComposerDefaultDraft] = useState<{ title: string; synopsis: string } | null>(null);
  const [isBioEditorOpen, setIsBioEditorOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isRssOpen, setIsRssOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isIabPreviewOpen, setIsIabPreviewOpen] = useState(false);

  // Quick edit modal state
  const [quickEditPost, setQuickEditPost] = useState<{
    id: string;
    title: string;
    synopsis: string;
  } | null>(null);

  // Delete post modal state
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  // Avatar editor modal state
  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthorSessionActive(false);
    setIsInlineEditMode(false);
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, 'false');
    } catch (e) {
      console.warn('Could not write auth state', e);
    }
    setSessionNotice('Switched to Reader View. Author studio & editing affordances are hidden.');
  };

  const handleLoginSuccess = () => {
    setIsAuthorSessionActive(true);
    setIsInlineEditMode(true);
    try {
      localStorage.setItem(STORAGE_KEY_AUTH, 'true');
    } catch (e) {
      console.warn('Could not write auth state', e);
    }
    setSessionNotice('Author Studio unlocked! Welcome back, DivyaShree.');
  };

  // Actions
  const handleOpenPost = (post: Post) => {
    if (post.isRestricted) {
      setSelectedPost(post);
    } else {
      setReadingPost(post);
    }
  };

  const handleDecryptSuccess = (post: Post) => {
    setSelectedPost(null);
    setReadingPost(post);
  };

  const handlePublishPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePostField = (postId: string, field: keyof Post, value: string | boolean) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === postId ? { ...p, [field]: value } : p))
    );
    if (readingPost && readingPost.id === postId) {
      setReadingPost((prev) => (prev ? { ...prev, [field]: value } : null));
    }
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== postId));
    if (readingPost && readingPost.id === postId) {
      setReadingPost(null);
    }
  };

  const handleUpdateFullPost = (updatedPost: Post) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
    setReadingPost(updatedPost);
  };

  const handleQuickEditSave = (postId: string, newTitle: string, newSynopsis: string) => {
    handleUpdatePostField(postId, 'title', newTitle);
    handleUpdatePostField(postId, 'synopsis', newSynopsis);
  };

  const handleSaveAvatar = (newAvatarUrl: string) => {
    setSiteMeta((prev) => ({ ...prev, avatarUrl: newAvatarUrl }));
    setSessionNotice('Author profile picture updated successfully.');
  };

  const handleOpenComposerWithDraft = (title: string, synopsis: string) => {
    setComposerDefaultDraft({ title, synopsis });
    setIsComposerOpen(true);
  };

  const handleNavigateTab = (tab: string) => {
    if (tab === 'about') {
      setIsAboutOpen(true);
    } else {
      setActiveTab(tab);
      if (readingPost) {
        setReadingPost(null);
      }
    }
  };

  const handleResetDefaults = () => {
    localStorage.removeItem(STORAGE_KEY_META);
    localStorage.removeItem(STORAGE_KEY_POSTS);
    setSiteMeta(initialSiteMeta);
    setPosts(initialPosts);
  };

  // If currently reading an article, show the Reader view
  if (readingPost) {
    return (
      <>
        <ReaderView
          post={readingPost}
          authorName={siteMeta.authorName}
          onBack={() => setReadingPost(null)}
          onUpdatePost={handleUpdateFullPost}
          onDeletePost={(post) => setPostToDelete(post)}
          isAuthorMode={isAuthorSessionActive}
          onLogout={handleLogout}
        />
        {postToDelete && (
          <DeletePostModal
            isOpen={!!postToDelete}
            post={postToDelete}
            onClose={() => setPostToDelete(null)}
            onConfirm={(postId) => {
              handleDeletePost(postId);
              setPostToDelete(null);
              setReadingPost(null);
              setSessionNotice('Manuscript permanently deleted.');
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-[#e2e8f0] flex flex-col justify-between selection:bg-[#1e293b] selection:text-white">
      <div>
        {/* Navigation Header */}
        <Header
          siteTitle={siteMeta.title}
          onUpdateSiteTitle={(title) => setSiteMeta((prev) => ({ ...prev, title }))}
          avatarUrl={siteMeta.avatarUrl}
          isAuthorSessionActive={isAuthorSessionActive}
          isInlineEditMode={isInlineEditMode && isAuthorSessionActive}
          onToggleInlineEdit={() => setIsInlineEditMode(!isInlineEditMode)}
          onOpenComposer={() => setIsComposerOpen(true)}
          onOpenBioEditor={() => setIsBioEditorOpen(true)}
          onOpenAvatarEditor={() => setIsAvatarEditorOpen(true)}
          onOpenVault={() => setIsVaultOpen(true)}
          onOpenSubscribe={() => setIsSubscribeOpen(true)}
          onNavigateTab={handleNavigateTab}
          activeTab={activeTab}
          onResetDefaults={handleResetDefaults}
          onPreviewIab={() => setIsIabPreviewOpen(true)}
          onLogout={handleLogout}
          onOpenLogin={() => setIsAuthorLoginOpen(true)}
        />

        {/* Content Container */}
        <div className="layout-content-container max-w-[960px] mx-auto w-full px-4 sm:px-6 md:px-8 py-5">
          {/* Hero Section with Editable Fields */}
          <HeroSection
            meta={siteMeta}
            onUpdateMeta={(updates) => setSiteMeta((prev) => ({ ...prev, ...updates }))}
            isInlineEditMode={isInlineEditMode && isAuthorSessionActive}
            onOpenBioEditor={() => setIsBioEditorOpen(true)}
            onOpenAvatarEditor={() => setIsAvatarEditorOpen(true)}
            onOpenRss={() => setIsRssOpen(true)}
          />

          {/* Active Inline Editing Mode Banner */}
          {isInlineEditMode && isAuthorSessionActive && (
            <InlineEditBanner
              onOpenComposer={() => setIsComposerOpen(true)}
              onExitEditMode={() => setIsInlineEditMode(false)}
              onLogout={handleLogout}
            />
          )}

          {/* Selected Writings Feed */}
          <WritingsFeed
            posts={posts}
            isInlineEditMode={isInlineEditMode && isAuthorSessionActive}
            isAuthorMode={isAuthorSessionActive}
            onOpenPost={handleOpenPost}
            onOpenComposer={() => setIsComposerOpen(true)}
            onQuickEditPost={(id, title, synopsis) =>
              setQuickEditPost({ id, title, synopsis })
            }
            onUpdatePostField={handleUpdatePostField}
            onDeletePost={(postId) => {
              const post = posts.find((p) => p.id === postId);
              if (post) setPostToDelete(post);
              else handleDeletePost(postId);
            }}
            onRequestDeletePost={(post) => setPostToDelete(post)}
            activeFilter={activeTab}
            onSetFilter={(tab) => setActiveTab(tab)}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer
        authorName={siteMeta.authorName}
        onUpdateAuthorName={(name) => setSiteMeta((prev) => ({ ...prev, authorName: name }))}
        isAuthorMode={isInlineEditMode && isAuthorSessionActive}
        isAuthorAuthenticated={isAuthorSessionActive}
        onOpenAuthorLogin={() => setIsAuthorLoginOpen(true)}
        onOpenColophon={() => setIsAboutOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenIndex={() => setIsVaultOpen(true)}
      />

      {/* Decrypt Password Modal (Image 9) */}
      {selectedPost && (
        <DecryptModal
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          onSuccess={handleDecryptSuccess}
        />
      )}

      {/* Composer Modal */}
      <ComposerModal
        isOpen={isComposerOpen}
        onClose={() => {
          setIsComposerOpen(false);
          setComposerDefaultDraft(null);
        }}
        onPublish={handlePublishPost}
      />

      {/* Bio & Colophon Editor Modal */}
      <BioEditorModal
        meta={siteMeta}
        isOpen={isBioEditorOpen}
        onClose={() => setIsBioEditorOpen(false)}
        onSave={(updated) => setSiteMeta((prev) => ({ ...prev, ...updated }))}
        onOpenAvatarEditor={() => setIsAvatarEditorOpen(true)}
      />

      {/* Archive & Draft Vault Modal */}
      <VaultModal
        posts={posts}
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        onOpenInReader={(post) => {
          if (post.isRestricted) {
            setSelectedPost(post);
          } else {
            setReadingPost(post);
          }
        }}
        onOpenComposerWithDraft={handleOpenComposerWithDraft}
        onRequestDeletePost={(post) => {
          setIsVaultOpen(false);
          setPostToDelete(post);
        }}
      />

      {/* Subscribe Newsletter Modal */}
      <SubscribeModal
        siteTitle={siteMeta.title}
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
      />

      {/* About & Colophon Modal */}
      <AboutModal
        meta={siteMeta}
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onUpdateMeta={(updates) => setSiteMeta((prev) => ({ ...prev, ...updates }))}
        onOpenAvatarEditor={() => setIsAvatarEditorOpen(true)}
        isAuthorMode={isInlineEditMode && isAuthorSessionActive}
      />

      {/* RSS XML Syndication Modal */}
      <RssModal
        isOpen={isRssOpen}
        onClose={() => setIsRssOpen(false)}
        siteTitle={siteMeta.title}
        posts={posts}
      />

      {/* Privacy Note Modal */}
      {isPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070b14]/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#0d1527] border border-[#253556] shadow-2xl p-6 rounded-xl text-[#e2e8f0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1e293b] mb-4">
              <h3 className="text-base font-serif-title text-[#f1f5f9]">Privacy Note</h3>
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="text-[#94a3b8] hover:text-[#f1f5f9] cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs font-mono-code text-[#cbd5e1] leading-relaxed mb-4">
              Anthems of Heart operates with zero commercial telemetry. We do not track keystrokes, install ad beacons, or sell reader session tokens. All encryption passes through client-side keyrings.
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsPrivacyOpen(false)}
                className="px-4 py-1.5 bg-[#1e293b] hover:bg-[#253556] text-xs font-mono-code text-[#e2e8f0] rounded cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Edit Post Modal */}
      {quickEditPost && (
        <QuickEditModal
          isOpen={!!quickEditPost}
          onClose={() => setQuickEditPost(null)}
          postId={quickEditPost.id}
          initialTitle={quickEditPost.title}
          initialSynopsis={quickEditPost.synopsis}
          onSave={handleQuickEditSave}
        />
      )}

      {/* Delete Post Confirmation Modal */}
      {postToDelete && (
        <DeletePostModal
          isOpen={!!postToDelete}
          post={postToDelete}
          onClose={() => setPostToDelete(null)}
          onConfirm={(postId) => {
            handleDeletePost(postId);
            setPostToDelete(null);
            setSessionNotice('Manuscript permanently deleted.');
          }}
        />
      )}

      {/* Author Profile Picture Editor Modal */}
      <AvatarEditorModal
        isOpen={isAvatarEditorOpen}
        onClose={() => setIsAvatarEditorOpen(false)}
        currentAvatarUrl={siteMeta.avatarUrl}
        authorName={siteMeta.authorName}
        onSaveAvatar={handleSaveAvatar}
      />

      {/* Instagram In-App Browser Breakout Screen & Detector */}
      <InstagramBreakoutModal
        forceOpen={isIabPreviewOpen}
        onClose={() => setIsIabPreviewOpen(false)}
      />

      {/* Author Master Login Modal */}
      <AuthorLoginModal
        isOpen={isAuthorLoginOpen}
        onClose={() => setIsAuthorLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Session Feedback Toast Notification */}
      {sessionNotice && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0d1527] border border-[#253556] shadow-2xl text-xs font-mono-code text-[#e2e8f0] backdrop-blur-md max-w-md">
          <span className="material-symbols-outlined text-[#93c5fd] text-base shrink-0">
            {isAuthorSessionActive ? 'verified_user' : 'visibility'}
          </span>
          <span className="flex-1 leading-snug">{sessionNotice}</span>
          {!isAuthorSessionActive ? (
            <button
              onClick={() => setIsAuthorLoginOpen(true)}
              className="text-[#93c5fd] hover:text-white font-bold underline cursor-pointer shrink-0"
            >
              Author Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="text-[#ffb4ab] hover:text-white font-semibold underline cursor-pointer shrink-0"
            >
              Reader View
            </button>
          )}
          <button
            onClick={() => setSessionNotice(null)}
            className="text-[#64748b] hover:text-[#f1f5f9] cursor-pointer p-0.5 ml-1"
            aria-label="Close message"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePassword,
  estimateReadingTime,
  filterPosts,
  searchPosts,
  calculateReadingProgress,
} from './blog.ts';
import type { Post } from './blog.ts';

const samplePosts: Post[] = [
  {
    id: 'essay-1',
    title: 'On the Art of Disappearing',
    type: 'Essay',
    readTime: '6 min read',
    date: 'Nov 14',
    synopsis: 'On stepping back from the digital rush and finding clarity in stillness.',
    body: 'There is clarity in absence.',
    isRestricted: false,
    published: true,
  },
  {
    id: 'essay-2',
    title: 'Blue Light & Timestamps',
    type: 'Essay',
    readTime: '8 min read',
    date: 'Oct 29',
    synopsis: 'Late-night communications, sent receipts, and digital ghosts.',
    body: 'The phantom reassurance of an active green dot.',
    isRestricted: false,
    published: true,
  },
  {
    id: 'essay-3',
    title: 'For the ones who stayed in the dark (Archived Drafts)',
    type: 'Vault Draft',
    readTime: '12 min read',
    date: 'Archived',
    synopsis: 'An unredacted personal archive detailing private reflections.',
    body: 'There is a particular taxonomy to rumors.',
    isRestricted: true,
    password: 'nocturne',
    draftNumber: '#19',
    published: true,
  },
  {
    id: 'fragment-1',
    title: 'Echoes in White Paint',
    type: 'Fragment',
    readTime: '2 min read',
    date: 'Oct 12',
    synopsis: 'A fleeting note on unfinished canvas borders.',
    body: 'White paint conceals the hesitation beneath.',
    isRestricted: false,
    published: true,
  },
];

test('validatePassword correctly validates valid password case-insensitively', () => {
  assert.equal(validatePassword('nocturne', 'nocturne'), true);
  assert.equal(validatePassword('  NOCTURNE ', 'nocturne'), true);
  assert.equal(validatePassword('Nocturne', 'nocturne'), true);
  assert.equal(validatePassword('wrongpass', 'nocturne'), false);
  assert.equal(validatePassword('', 'nocturne'), false);
});

test('estimateReadingTime calculates reasonable read time based on word count', () => {
  assert.equal(estimateReadingTime(''), '1 min read');
  assert.equal(estimateReadingTime('one two three'), '1 min read');
  const longText = Array(450).fill('word').join(' ');
  assert.equal(estimateReadingTime(longText), '3 min read');
});

test('filterPosts filters by tab correctly', () => {
  const allPosts = filterPosts(samplePosts, 'all');
  assert.equal(allPosts.length, 4);

  const essays = filterPosts(samplePosts, 'essays');
  assert.equal(essays.length, 2);
  assert.equal(essays.every(p => p.type === 'Essay'), true);

  const fragments = filterPosts(samplePosts, 'fragments');
  assert.equal(fragments.length, 1);
  assert.equal(fragments[0].title, 'Echoes in White Paint');

  const archive = filterPosts(samplePosts, 'archive');
  assert.equal(archive.length, 1);
  assert.equal(archive[0].id, 'essay-3');
});

test('searchPosts returns matching items in title or synopsis', () => {
  const matches = searchPosts(samplePosts, 'timestamps');
  assert.equal(matches.length, 1);
  assert.equal(matches[0].id, 'essay-2');

  const emptySearch = searchPosts(samplePosts, '');
  assert.equal(emptySearch.length, 4);
});

test('calculateReadingProgress handles edge cases and computes percentages', () => {
  assert.equal(calculateReadingProgress(0, 1000, 500), 0);
  assert.equal(calculateReadingProgress(250, 1000, 500), 50);
  assert.equal(calculateReadingProgress(500, 1000, 500), 100);
  assert.equal(calculateReadingProgress(600, 1000, 500), 100);
  assert.equal(calculateReadingProgress(0, 500, 500), 100);
});

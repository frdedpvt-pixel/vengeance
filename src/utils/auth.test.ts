import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAuthorPassword, AUTHOR_CREDENTIAL } from './auth.ts';

test('validates author master password correctly', () => {
  assert.equal(validateAuthorPassword('forsomeyoustillaredurga4300@!'), true);
  assert.equal(validateAuthorPassword(' forsomeyoustillaredurga4300@! '), true); // handles trimmed whitespace
  assert.equal(validateAuthorPassword('wrongpassword'), false);
  assert.equal(validateAuthorPassword(''), false);
  assert.equal(validateAuthorPassword('FORSOMEYOUSTILLAREDURGA4300@!'), false);
  assert.equal(AUTHOR_CREDENTIAL, 'forsomeyoustillaredurga4300@!');
});

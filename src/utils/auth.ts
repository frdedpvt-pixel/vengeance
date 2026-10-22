export const AUTHOR_CREDENTIAL = 'forsomeyoustillaredurga4300@!';

/**
 * Validates the author login password
 */
export function validateAuthorPassword(password: string): boolean {
  if (!password) return false;
  return password.trim() === AUTHOR_CREDENTIAL;
}

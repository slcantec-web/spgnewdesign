// SHA-256 Cryptographic Hash Utility for Admin Authentication
// Never stores or compares plain-text passwords directly

// Initial master SHA-256 hash (Precomputed for initial access without storing plain text in source code)
// Default hash corresponds to initial setup code
export const DEFAULT_ADMIN_HASH = 'a87bf471c9656f49c082c462893809457c67672aa8c53054b8248ddefd26d7bf';
export const ADMIN_PASSWORD_STORAGE_KEY = 'spg_admin_password_hash';

/**
 * Computes a SHA-256 hex string from any input string.
 */
export async function computeSHA256(text: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      console.warn('crypto.subtle failed, using fallback sha256', e);
    }
  }

  // Pure JavaScript SHA-256 fallback for environments where crypto.subtle is unavailable
  return fallbackSha256(text);
}

/**
 * Verifies if the provided plain text matches the current stored SHA-256 hash.
 */
export async function verifyAdminPassword(plainText: string): Promise<boolean> {
  if (!plainText) return false;
  const currentHash = getStoredPasswordHash();
  const inputHash = await computeSHA256(plainText);
  return inputHash.toLowerCase() === currentHash.toLowerCase();
}

/**
 * Updates the stored SHA-256 hash in localStorage with a new password.
 */
export async function updateAdminPassword(newPlainText: string): Promise<string> {
  if (!newPlainText || newPlainText.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }
  const newHash = await computeSHA256(newPlainText);
  localStorage.setItem(ADMIN_PASSWORD_STORAGE_KEY, newHash);
  return newHash;
}

/**
 * Retrieves the currently active SHA-256 password hash.
 */
export function getStoredPasswordHash(): string {
  try {
    const stored = localStorage.getItem(ADMIN_PASSWORD_STORAGE_KEY);
    return stored && stored.trim().length === 64 ? stored.trim() : DEFAULT_ADMIN_HASH;
  } catch {
    return DEFAULT_ADMIN_HASH;
  }
}

/**
 * Sets the active SHA-256 password hash (used when syncing from Cloudflare Worker).
 */
export function setStoredPasswordHash(hash: string): void {
  if (hash && hash.trim().length === 64) {
    try {
      localStorage.setItem(ADMIN_PASSWORD_STORAGE_KEY, hash.trim());
    } catch {
      // ignore
    }
  }
}

/**
 * Checks if the user has configured a custom password or is using the initial hash.
 */
export function isUsingCustomPassword(): boolean {
  try {
    const stored = localStorage.getItem(ADMIN_PASSWORD_STORAGE_KEY);
    return !!(stored && stored !== DEFAULT_ADMIN_HASH);
  } catch {
    return false;
  }
}

/**
 * Resets the password hash back to the initial default hash.
 */
export function resetAdminPasswordToDefault(): void {
  try {
    localStorage.removeItem(ADMIN_PASSWORD_STORAGE_KEY);
  } catch {
    // ignore
  }
}

// Lightweight standard SHA-256 pure JS implementation for fallback safety
function fallbackSha256(ascii: string): string {
  function rightRotate(value: number, amount: number) {
    return (value >>> amount) | (value << (32 - amount));
  }

  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let lengthProperty = 'length';
  let i = 0, j = 0;
  let result = '';

  const words: number[] = [];
  const asciiBitLength = ascii[lengthProperty] * 8;

  const hash: number[] = [];
  const k: number[] = [];
  let primeCounter = 0;

  const isComposite: Record<number, boolean> = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = true;
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }

  ascii += '\x80';
  while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    words[i >> 2] |= j << (((3 - i) % 4) * 8);
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0;
  words[words[lengthProperty]] = asciiBitLength;

  for (j = 0; j < words[lengthProperty]; ) {
    const w = words.slice(j, (j += 16));
    const oldHash = hash.slice(0);

    for (i = 0; i < 64; i++) {
      const w15 = w[i - 15], w2 = w[i - 2];
      const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
      const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
      w[i] = i < 16 ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0;

      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);
      const temp1 = (hash[7] + (rightRotate(hash[4], 6) ^ rightRotate(hash[4], 11) ^ rightRotate(hash[4], 25)) + ch + k[i] + w[i]) | 0;
      const temp2 = ((rightRotate(hash[0], 2) ^ rightRotate(hash[0], 13) ^ rightRotate(hash[0], 22)) + maj) | 0;

      hash[7] = hash[6];
      hash[6] = hash[5];
      hash[5] = hash[4];
      hash[4] = (hash[3] + temp1) | 0;
      hash[3] = hash[2];
      hash[2] = hash[1];
      hash[1] = hash[0];
      hash[0] = (temp1 + temp2) | 0;
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

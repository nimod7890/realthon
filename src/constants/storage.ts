const STORAGE_KEY_PREFIX = "prefix";

const STORAGE_KEYS = {
  USER: `${STORAGE_KEY_PREFIX}-user`,
  TOKEN: `${STORAGE_KEY_PREFIX}-token`,
} as const;

export default STORAGE_KEYS;

export const storage = {
  async get(key, defaults = {}) {
    return chrome.storage.local.get(Object.assign({}, defaults, key ? { [key]: undefined } : {}));
  },
  async set(obj) {
    return chrome.storage.local.set(obj);
  }
};

export async function getToken() {
  const { token } = await chrome.storage.local.get({ token: "demo-token" });
  return token || "demo-token";
}

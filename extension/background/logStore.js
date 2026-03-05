export async function addLocalLog(payload) {
  const { logs } = await chrome.storage.local.get({ logs: [] });
  logs.push({ ...payload, ts: new Date().toISOString() });
  while (logs.length > 200) logs.shift();
  await chrome.storage.local.set({ logs });
}

export async function getLocalLogs() {
  const { logs } = await chrome.storage.local.get({ logs: [] });
  return logs;
}

export async function clearLocalLogs() {
  await chrome.storage.local.set({ logs: [] });
}

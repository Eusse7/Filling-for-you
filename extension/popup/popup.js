const out = document.getElementById("out");
const safe = document.getElementById("safe");
const tokenInput = document.getElementById("token");

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function sendToContent(tabId, msg) {
  return chrome.tabs.sendMessage(tabId, msg);
}

async function init() {
  const { token, safeMode } = await chrome.storage.local.get({ token: "demo-token", safeMode: true });
  tokenInput.value = token || "demo-token";
  safe.checked = !!safeMode;
}

safe.addEventListener("change", async () => {
  await chrome.storage.local.set({ safeMode: safe.checked });
  const tab = await getActiveTab();
  try {
    await sendToContent(tab.id, { type: "SET_SAFE_MODE", safeMode: safe.checked });
  } catch (error) {
    console.debug("No se pudo sincronizar modo seguro en la pestaña activa", error);
  }
});

document.getElementById("saveToken").onclick = async () => {
  const token = tokenInput.value.trim() || "demo-token";
  const resp = await chrome.runtime.sendMessage({ type: "SET_TOKEN", token });
  out.textContent = resp.ok ? `Token guardado: ${resp.token}` : `Error: ${resp.error}`;
};

document.getElementById("scan").onclick = async () => {
  const tab = await getActiveTab();
  try {
    const resp = await sendToContent(tab.id, { type: "SCAN" });
    out.textContent = JSON.stringify(resp, null, 2);
  } catch (e) {
     out.textContent = "No pude escanear. Abre http://localhost:5173 y vuelve a intentar.\n" + String(e);
  }
};

document.getElementById("fill").onclick = async () => {
  const tab = await getActiveTab();
  const { safeMode } = await chrome.storage.local.get({ safeMode: true });
  try {
    const resp = await sendToContent(tab.id, { type: "PREVIEW_AND_FILL", safeMode });
    out.textContent = JSON.stringify(resp, null, 2);
  } catch (e) {
     out.textContent = "No pude llenar. Abre http://localhost:5173 y vuelve a intentar.\n" + String(e);
  }
};

document.getElementById("showLogs").onclick = async () => {
  const resp = await chrome.runtime.sendMessage({ type: "GET_LOCAL_LOGS" });
  out.textContent = JSON.stringify(resp, null, 2);
};

document.getElementById("clearLogs").onclick = async () => {
  await chrome.storage.local.set({ logs: [] });
  out.textContent = "Bitácora borrada.";
};

init();

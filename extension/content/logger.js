globalThis.Autofill  = globalThis.Autofill  || {};
globalThis.Autofill .logger = {
  log(action, payload = {}) {
    chrome.runtime.sendMessage({
      type: "LOG_ACTION",
      payload: { url: location.href, action, ...payload }
    });
  }
};

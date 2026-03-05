globalThis.Autofill = globalThis.Autofill || {};

(function(ns) {
  function installSubmitGuard(getHasPendingPlan, getSafeMode) {
    document.addEventListener("submit", (e) => {
      if (getSafeMode() && getHasPendingPlan()) {
        e.preventDefault();
        alert("Modo seguro: confirma la previsualización antes de enviar.");
        ns.logger?.log("SUBMIT_BLOCKED");
      }
    }, true);
  }

  ns.submitGuard = { installSubmitGuard };
})(globalThis.Autofill);

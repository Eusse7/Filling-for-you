globalThis.Autofill  = globalThis.Autofill  || {};

(function(ns) {
  let pendingPlan = null;
  let safeModeEnabled = true;

  ns.submitGuard.installSubmitGuard(
    () => !!pendingPlan,
    () => safeModeEnabled
  );

  async function fetchProfileAndKnowledge() {
    const [pr, kr] = await Promise.all([
      chrome.runtime.sendMessage({ type: "GET_PROFILE" }),
      chrome.runtime.sendMessage({ type: "GET_KNOWLEDGE" })
    ]);
    if (!pr.ok) throw new Error("No se pudo obtener profile");
    if (!kr.ok) throw new Error("No se pudo obtener knowledge");
    return { profile: pr.data, knowledge: kr.data };
  }

  async function buildPlanFromPage() {
    const fields = ns.scan.scanFormFields();
    const { profile, knowledge } = await fetchProfileAndKnowledge();
    const plan = ns.plan.buildPlan(fields, profile, knowledge, ns.classify.guessKey);
    ns.logger?.log("PLAN_BUILT", { meta: { count: plan.length, safeMode: safeModeEnabled } });
    return plan;
  }

  function previewPlan(plan) {
    pendingPlan = plan;
    ns.overlay.renderPreview(
      plan,
      () => {
        pendingPlan = null;
        ns.logger?.log("PREVIEW_CANCEL");
      },
      () => {
        if (!pendingPlan) return;
        ns.apply.applyPlan(pendingPlan);
        ns.logger?.log("APPLY_CONFIRMED", { meta: { count: pendingPlan.length } });
        pendingPlan = null;
      }
    );
  }

  async function handlePreviewAndFill() {
    const plan = await buildPlanFromPage();
    if (safeModeEnabled) previewPlan(plan);
    else {
      ns.apply.applyPlan(plan);
      ns.logger?.log("APPLY_DIRECT", { meta: { count: plan.length } });
    }
    return { ok: true, mode: safeModeEnabled ? "preview" : "direct", count: plan.length };
  }

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    (async () => {
      try {
        switch (msg.type) {
          case "SCAN": {
            const fields = ns.scan.scanFormFields();
            ns.logger?.log("SCAN", { meta: { fields: fields.length } });
            sendResponse({ ok: true, fields });
            return;
          }
          case "PREVIEW_AND_FILL": {
            safeModeEnabled = !!msg.safeMode;
            sendResponse(await handlePreviewAndFill());
            return;
          }
          case "SET_SAFE_MODE": {
            safeModeEnabled = !!msg.safeMode;
            sendResponse({ ok: true, safeMode: safeModeEnabled });
            return;
          }
          default:
            sendResponse({ ok: false, error: "Unknown message" });
            return;
        }
      } catch (e) {
        sendResponse({ ok: false, error: String(e) });
      }
    })();
    return true;
  });
})(globalThis.Autofill );

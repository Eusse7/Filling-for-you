const API_BASE = "http://localhost:3000";
const TOKEN = "demo-token";

async function request(path, init = {}) {
  const r = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${TOKEN}`
    }
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export const api = {
  get: (path) => request(path),
  put: (path, body) =>
    request(path, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
};

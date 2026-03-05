import { useEffect, useState } from "react";
import { api } from "../../api/client.js";

export function useKnowledge() {
  const [knowledge, setKnowledge] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setStatus("Cargando conocimiento...");
        const k = await api.get("/knowledge");
        setKnowledge(k);
        setStatus("Listo.");
      } catch (e) {
        setStatus(String(e));
      }
    })();
  }, []);

  async function save(next) {
    try {
      setStatus("Guardando conocimiento...");
      const updated = await api.put("/knowledge", next);
      setKnowledge(updated);
      setStatus("Conocimiento guardado.");
      return updated;
    } catch (e) {
      setStatus(String(e));
      throw e;
    }
  }

  return { knowledge, setKnowledge, status, save };
}

import { useEffect, useState } from "react";
import { api } from "../../api/client.js";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setStatus("Cargando perfil...");
        const p = await api.get("/profile");
        setProfile(p);
        setStatus("Listo.");
      } catch (e) {
        setStatus(String(e));
      }
    })();
  }, []);

  async function save(next) {
    try {
      setStatus("Guardando perfil...");
      const updated = await api.put("/profile", next);
      setProfile(updated);
      setStatus("Perfil guardado.");
      return updated;
    } catch (e) {
      setStatus(String(e));
      throw e;
    }
  }

  return { profile, setProfile, status, save };
}

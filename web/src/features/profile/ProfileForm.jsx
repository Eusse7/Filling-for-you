import React from "react";
import Card from "../../components/Card.jsx";
import { useProfile } from "./useProfile.js";

export default function ProfileForm() {
  const { profile, setProfile, status, save } = useProfile();

  if (!profile) {
    return (
      <Card title="Perfil" subtitle="Cargando...">
        <p className="muted">{status || "Cargando..."}</p>
      </Card>
    );
  }

  return (
    <Card
      title="Perfil"
      subtitle="Lo usa la extensión para autocompletar"
      right={<button onClick={() => save(profile)}>Guardar</button>}
    >
      <p className="muted">Estado: {status}</p>

      <div className="row2">
        <label>
          Nombre
          <input value={profile.firstName} onChange={(e) => setProfile({...profile, firstName: e.target.value})} />
        </label>
        <label>
          Apellido
          <input value={profile.lastName} onChange={(e) => setProfile({...profile, lastName: e.target.value})} />
        </label>
      </div>

      <div className="row2">
        <label>
          Email
          <input value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
        </label>
        <label>
          Teléfono
          <input value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
        </label>
      </div>

      <label>
        Dirección
        <input value={profile.addressLine1} onChange={(e) => setProfile({...profile, addressLine1: e.target.value})} />
      </label>

      <div className="row2">
        <label>
          Ciudad
          <input value={profile.city} onChange={(e) => setProfile({...profile, city: e.target.value})} />
        </label>
        <label>
          País
          <input value={profile.country} onChange={(e) => setProfile({...profile, country: e.target.value})} />
        </label>
      </div>

      <div className="row2">
        <label>
          LinkedIn
          <input value={profile.linkedin} onChange={(e) => setProfile({...profile, linkedin: e.target.value})} />
        </label>
        <label>
          GitHub
          <input value={profile.github} onChange={(e) => setProfile({...profile, github: e.target.value})}
          />
        </label>
      </div>
    </Card>
  );
}

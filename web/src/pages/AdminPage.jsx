import React from "react";
import Card from "../components/Card.jsx";
import ProfileForm from "../features/profile/ProfileForm.jsx";
import KnowledgeForm from "../features/knowledge/KnowledgeForm.jsx";

export default function AdminPage() {
  return (
    <div className="grid">
      <ProfileForm />
      <KnowledgeForm />
      <Card title="Nota" subtitle="Demo local (token fijo)">
        <p className="muted">
          Esto está pensado como demo. En producción, reemplaza el token fijo por login real.
        </p>
      </Card>
    </div>
  );
}

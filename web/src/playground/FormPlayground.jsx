import React, { useState } from "react";
import Card from "../components/Card.jsx";

export default function FormPlayground() {
  const [submitted, setSubmitted] = useState(null);

  function onSubmit(e, name) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitted({ name, data: Object.fromEntries(fd.entries()) });
  }

  return (
    <div className="grid">
      <Card title="Formulario A" subtitle="autocomplete correcto (lo más confiable)">
        <form onSubmit={(e) => onSubmit(e, "Formulario A")}>
          <div className="row2">
            <label>Nombre
              <input name="firstName" autoComplete="given-name" placeholder="Juan" />
            </label>
            <label>Apellido
              <input name="lastName" autoComplete="family-name" placeholder="Pérez" />
            </label>
          </div>
          <div className="row2">
            <label>Email
              <input type="email" name="email" autoComplete="email" placeholder="correo@ejemplo.com" />
            </label>
            <label>Teléfono
              <input type="tel" name="phone" autoComplete="tel" placeholder="+57 300..." />
            </label>
          </div>
          <label>Dirección
            <input name="address1" autoComplete="address-line1" placeholder="Calle..." />
          </label>
          <div className="row2">
            <label>Ciudad
              <input name="city" autoComplete="address-level2" placeholder="Medellín" />
            </label>
            <label>País
              <input name="country" autoComplete="country-name" placeholder="CO" />
            </label>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </Card>

      <Card title="Formulario B" subtitle="sin autocomplete (heurísticas)">
        <form onSubmit={(e) => onSubmit(e, "Formulario B")}>
          <div className="row2">
            <label>Full name
              <input id="full_name" name="full_name" placeholder="Nombre completo" />
            </label>
            <label>Mobile
              <input id="mobile_number" name="mobile_number" placeholder="Celular" />
            </label>
          </div>
          <div className="row2">
            <label>E-mail address
              <input id="emailAddress" name="emailAddress" placeholder="Email" />
            </label>
            <label>City of residence
              <input id="cityResidence" name="cityResidence" placeholder="Ciudad" />
            </label>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </Card>

      <Card title="Formulario C" subtitle="preguntas largas (knowledge)">
        <form onSubmit={(e) => onSubmit(e, "Formulario C")}>
          <label>Cuéntanos sobre ti
            <textarea name="about" rows={4} placeholder="Escribe sobre ti..." />
          </label>
          <label>Fortalezas
            <textarea name="strengths" rows={3} placeholder="Tus fortalezas..." />
          </label>
          <label>Expectativa salarial
            <textarea name="salary" rows={2} placeholder="Rango / explicación..." />
          </label>
          <label>Carta / introducción
            <textarea name="coverLetter" rows={4} placeholder="Mensaje..." />
          </label>
          <button type="submit">Enviar</button>
        </form>
      </Card>

      <Card title="Último submit" subtitle="solo para ver resultados (demo)">
        {submitted ? (
          <pre className="pre">{JSON.stringify(submitted, null, 2)}</pre>
        ) : (
          <p className="muted">Aún no has enviado ningún formulario.</p>
        )}
      </Card>
    </div>
  );
}

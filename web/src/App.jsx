import React, { useState } from "react";
import FormsPage from "./pages/FormsPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

export default function App() {
  const [tab, setTab] = useState("forms");

  return (
    <div className="app">
      <header className="header">
        <div className="title">
          <h1>Filling for you</h1>
          <p>Formularios controlados + panel de perfil/conocimiento</p>
        </div>
        <nav className="tabs">
          <button className={tab==="forms" ? "active" : ""} onClick={() => setTab("forms")}>
            Formularios
          </button>
          <button className={tab==="admin" ? "active" : ""} onClick={() => setTab("admin")}>
            Panel (Perfil/Conocimiento)
          </button>
        </nav>
      </header>

      <main className="main">
        {tab === "forms" ? <FormsPage /> : <AdminPage />}
      </main>

      <footer className="footer">
        <span>API: http://localhost:3000</span>
        <span>Web: http://localhost:5173</span>
      </footer>
    </div>
  );
}

# Demo: Extensión de autocompletado (Chrome/Edge) + React + FastAPI


- Extensión:
  - `content/` (scan, classify, plan, overlay, apply, submitGuard)
  - `background/` (apiClient, storage, logStore)
  - `popup/` (UI)
- API FastAPI:
  - `routes/` + `services/` + `repositories/` + `schemas/` + `core/`
- Web React:
  - `features/` (profile, knowledge), `pages/`, `components/`

## 1) Levantar backend (FastAPI)
```bash
cd api
python -m venv venv
# Windows: venv\Scripts\activate
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 3000
```

## 2) Levantar web (React)
```bash
cd web
npm install
npm run dev
```
Abre: http://localhost:5173

## 3) Cargar la extensión (Chrome/Edge)
- Chrome: `chrome://extensions` -> Developer mode -> Load unpacked -> carpeta `extension`
- Edge: `edge://extensions` -> Developer mode -> Load unpacked -> carpeta `extension`

## 4) Probar
- En http://localhost:5173 ve a **Administración** y guarda Perfil + Conocimiento
- En http://localhost:5173 ve a **Formularios**
- Abre el popup de la extensión
- Deja **Modo seguro** activado para ver la previsualización
- Click **Previsualizar/Llenar**
- Revisa **Ver bitácora**

Persistencia backend:
- La información se guarda en `api/data/store.json`.

Token demo: `demo-token`

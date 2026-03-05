from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from pathlib import Path

from .core.config import settings
from .repositories.json_file import (
    JsonFileKnowledgeRepo,
    JsonFileLogRepo,
    JsonFileProfileRepo,
    JsonFileStore,
)
from .services.profile_service import ProfileService
from .services.knowledge_service import KnowledgeService
from .services.log_service import LogService

from .routes import profile as profile_routes
from .routes import knowledge as knowledge_routes
from .routes import logs as logs_routes

def create_app() -> FastAPI:
    app = FastAPI(title="Autofill", version="0.2.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    data_file = Path(__file__).resolve().parents[1] / "data" / "store.json"
    store = JsonFileStore(data_file)
    profile_repo = JsonFileProfileRepo(store)
    knowledge_repo = JsonFileKnowledgeRepo(store)
    log_repo = JsonFileLogRepo(store, max_items=500)

    # Services
    profile_service = ProfileService(profile_repo)
    knowledge_service = KnowledgeService(knowledge_repo)
    log_service = LogService(log_repo)

    # Dependency overrides (DIP: rutas dependen de interfaces, aquí se inyecta impl concreta)
    app.dependency_overrides[profile_routes.get_profile_service] = lambda: profile_service
    app.dependency_overrides[knowledge_routes.get_knowledge_service] = lambda: knowledge_service
    app.dependency_overrides[logs_routes.get_log_service] = lambda: log_service

    # Routes
    app.include_router(profile_routes.router)
    app.include_router(knowledge_routes.router)
    app.include_router(logs_routes.router)

    @app.get("/health")
    def health():
        return {"ok": True, "time": datetime.now(timezone.utc).isoformat()}

    return app

app = create_app()

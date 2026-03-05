from typing import Annotated
from fastapi import APIRouter, Depends
from ..core.security import require_auth
from ..schemas.knowledge import Knowledge
from ..services.knowledge_service import KnowledgeService

router = APIRouter(prefix="/knowledge", tags=["knowledge"])

def get_knowledge_service() -> KnowledgeService:
    raise RuntimeError("KnowledgeService dependency not overridden")

@router.get("", response_model=Knowledge)
def get_knowledge(_: Annotated[str, Depends(require_auth)], svc: Annotated[KnowledgeService, Depends(get_knowledge_service)]):
    return svc.get_knowledge()

@router.put("", response_model=Knowledge)
def put_knowledge(payload: Knowledge, _: Annotated[str, Depends(require_auth)], svc: Annotated[KnowledgeService, Depends(get_knowledge_service)]):
    return svc.update_knowledge(payload)

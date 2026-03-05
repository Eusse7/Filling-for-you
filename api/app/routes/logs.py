from fastapi import APIRouter, Depends
from ..core.security import require_auth
from ..schemas.logs import LogEvent
from ..services.log_service import LogService

router = APIRouter(prefix="/logs", tags=["logs"])

def get_log_service() -> LogService:
    raise RuntimeError("LogService dependency not overridden")

@router.post("")
def post_logs(payload: LogEvent, _: str = Depends(require_auth), svc: LogService = Depends(get_log_service)):
    return svc.add_event(payload)

@router.get("")
def get_logs(_: str = Depends(require_auth), svc: LogService = Depends(get_log_service)):
    return svc.list_events()

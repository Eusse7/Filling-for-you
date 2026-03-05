from typing import Annotated
from fastapi import APIRouter, Depends
from ..core.security import require_auth
from ..schemas.profile import Profile
from ..services.profile_service import ProfileService

router = APIRouter(prefix="/profile", tags=["profile"])

def get_profile_service() -> ProfileService:
    # La instancia real se inyecta desde app.main (override)
    raise RuntimeError("ProfileService dependency not overridden")

@router.get("", response_model=Profile)
def get_profile(_: Annotated[str, Depends(require_auth)], svc: Annotated[ProfileService, Depends(get_profile_service)]):
    return svc.get_profile()

@router.put("", response_model=Profile)
def put_profile(payload: Profile, _: Annotated[str, Depends(require_auth)], svc: Annotated[ProfileService, Depends(get_profile_service)]):
    return svc.update_profile(payload)

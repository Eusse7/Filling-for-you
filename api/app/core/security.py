from fastapi import Header, HTTPException, Depends
from .config import settings

def require_auth(authorization: str | None = Header(default=None)) -> str:
    if authorization != f"Bearer {settings.demo_token}":
        raise HTTPException(status_code=401, detail="Unauthorized")
    return authorization

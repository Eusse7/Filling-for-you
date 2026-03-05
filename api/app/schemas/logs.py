from pydantic import BaseModel, Field
from typing import Any

class LogEvent(BaseModel):
    url: str
    action: str
    field: dict[str, Any] = Field(default_factory=dict)
    meta: dict[str, Any] = Field(default_factory=dict)
    ts: str | None = None

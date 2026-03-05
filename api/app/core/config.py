from pydantic import BaseModel

class Settings(BaseModel):
    demo_token: str = "demo-token"
    allowed_origins: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "chrome-extension://*",
        "edge-extension://*",
    ]

settings = Settings()

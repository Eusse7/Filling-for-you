from __future__ import annotations
from typing import List
from .base import ProfileRepository, KnowledgeRepository, LogRepository
from ..schemas.profile import Profile
from ..schemas.knowledge import Knowledge

class InMemoryProfileRepo(ProfileRepository):
    def __init__(self) -> None:
        self._profile = Profile()

    def get(self) -> Profile:
        return self._profile

    def set(self, profile: Profile) -> Profile:
        self._profile = profile
        return self._profile

class InMemoryKnowledgeRepo(KnowledgeRepository):
    def __init__(self) -> None:
        self._knowledge = Knowledge()

    def get(self) -> Knowledge:
        return self._knowledge

    def set(self, knowledge: Knowledge) -> Knowledge:
        self._knowledge = knowledge
        return self._knowledge

class InMemoryLogRepo(LogRepository):
    def __init__(self, max_items: int = 500) -> None:
        self._max = max_items
        self._items: List[dict] = []

    def add(self, event: dict) -> None:
        self._items.append(event)
        if len(self._items) > self._max:
            self._items.pop(0)

    def list(self) -> List[dict]:
        return list(self._items)

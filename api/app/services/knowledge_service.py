from ..repositories.base import KnowledgeRepository
from ..schemas.knowledge import Knowledge

class KnowledgeService:
    def __init__(self, repo: KnowledgeRepository) -> None:
        self._repo = repo

    def get_knowledge(self) -> Knowledge:
        return self._repo.get()

    def update_knowledge(self, knowledge: Knowledge) -> Knowledge:
        return self._repo.set(knowledge)

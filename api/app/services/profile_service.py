from ..repositories.base import ProfileRepository
from ..schemas.profile import Profile

class ProfileService:
    def __init__(self, repo: ProfileRepository) -> None:
        self._repo = repo

    def get_profile(self) -> Profile:
        return self._repo.get()

    def update_profile(self, profile: Profile) -> Profile:
        return self._repo.set(profile)

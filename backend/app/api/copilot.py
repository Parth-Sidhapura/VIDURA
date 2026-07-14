from fastapi import APIRouter

from pydantic import BaseModel

from app.services.copilot_service import copilot_service

router = APIRouter(
    prefix="/copilot",
    tags=["Investigation Copilot"]
)


class CrimeRequest(BaseModel):
    crime_type: str


@router.post("/")
def copilot(request: CrimeRequest):

    return copilot_service.suggest_next_action(
        request.crime_type
    )
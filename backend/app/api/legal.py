from fastapi import APIRouter
from pydantic import BaseModel

from app.services.legal_service import legal_service

router = APIRouter(
    prefix="/legal",
    tags=["AI Legal Intelligence"]
)


class IncidentRequest(BaseModel):
    incident: str


@router.post("/analyze")
def analyze(request: IncidentRequest):

    return legal_service.analyze_case(request.incident)
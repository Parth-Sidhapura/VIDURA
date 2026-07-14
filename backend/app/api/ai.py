from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ai_service import ai_service
import app.services.document_generator as dg
from app.services.document_generator import document_generator

router = APIRouter(
    prefix="/ai",
    tags=["VIDURA AI"]
)

class InvestigationRequest(BaseModel):
    victim_name: str
    victim_phone: str
    crime_type: str
    incident: str
    location: str
    date: str
    officer_name: str

@router.post("/analyze")
def analyze(request: InvestigationRequest):
    result = ai_service.analyze_case(request.dict())
    dg.LAST_ANALYSIS = result
    return result
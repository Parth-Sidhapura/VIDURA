from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.case import Case

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/")
def dashboard(db: Session = Depends(get_db)):

    total_cases = db.query(Case).count()

    pending_cases = db.query(Case).filter(
        Case.status == "Pending"
    ).count()

    completed_cases = db.query(Case).filter(
        Case.status == "Completed"
    ).count()

    return {
        "total_cases": total_cases,
        "pending_cases": pending_cases,
        "completed_cases": completed_cases,
        "documents_generated": total_cases,
        "alerts": pending_cases
    }
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.case import Case
from app.schemas.case_schema import CaseCreate, CaseResponse

router = APIRouter(
    prefix="/cases",
    tags=["Cases"]
)


@router.post("/", response_model=CaseResponse)
def create_case(case: CaseCreate, db: Session = Depends(get_db)):

    new_case = Case(
        victim_name=case.victim_name,
        accused_name=case.accused_name,
        crime_type=case.crime_type,
        incident=case.incident
    )

    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    return new_case


@router.get("/", response_model=list[CaseResponse])
def get_all_cases(db: Session = Depends(get_db)):

    return db.query(Case).all()


@router.get("/{case_id}", response_model=CaseResponse)
def get_case(case_id: int, db: Session = Depends(get_db)):

    case = db.query(Case).filter(Case.id == case_id).first()

    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    return case
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.case import Case
from app.services.document_service import document_service

router = APIRouter(
    prefix="/documents",
    tags=["Document Generation"]
)


@router.get("/chargesheet/{case_id}")
def generate_chargesheet(case_id: int, db: Session = Depends(get_db)):

    case = db.query(Case).filter(Case.id == case_id).first()

    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    return document_service.generate_chargesheet(case)

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

import app.services.document_generator as dg
from app.services.document_generator import document_generator

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.get("/investigation")
def generate_report():

    if dg.LAST_ANALYSIS is None:

        raise HTTPException(
            status_code=400,
            detail="No analysis available. Analyze a case first."
        )

    path = document_generator.generate_investigation_report(
        dg.LAST_ANALYSIS
    )

    return FileResponse(
        path,
        filename="VIDURA_Investigation_Report.docx",
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
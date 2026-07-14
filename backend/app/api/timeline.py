from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.database.db import Base
from app.models.timeline import Timeline
from app.schemas.timeline_schema import TimelineCreate
from app.services.timeline_service import timeline_service

router = APIRouter(
    prefix="/timeline",
    tags=["Timeline"]
)


@router.post("/")
def add_event(data: TimelineCreate, db: Session = Depends(get_db)):

    event = Timeline(
        case_id=data.case_id,
        event=data.event,
        timestamp=timeline_service.current_time()
    )

    db.add(event)
    db.commit()
    db.refresh(event)

    return event


@router.get("/{case_id}")
def get_timeline(case_id: int, db: Session = Depends(get_db)):

    return db.query(Timeline).filter(
        Timeline.case_id == case_id
    ).all()
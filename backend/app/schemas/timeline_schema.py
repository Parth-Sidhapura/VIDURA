from pydantic import BaseModel

from datetime import datetime


class TimelineService:

    def current_time(self):

        return datetime.now().strftime("%d-%m-%Y %H:%M:%S")


timeline_service = TimelineService()
class TimelineCreate(BaseModel):

    case_id: int

    event: str


class TimelineResponse(TimelineCreate):

    id: int

    timestamp: str

    class Config:

        from_attributes = True
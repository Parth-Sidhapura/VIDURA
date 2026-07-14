from pydantic import BaseModel


class CaseCreate(BaseModel):

    victim_name: str

    accused_name: str

    crime_type: str

    incident: str


class CaseResponse(CaseCreate):

    id: int

    status: str

    class Config:

        from_attributes = True
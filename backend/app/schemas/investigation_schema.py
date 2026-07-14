from pydantic import BaseModel


class InvestigationRequest(BaseModel):

    officer_name: str

    victim_name: str

    victim_phone: str

    victim_address: str

    accused_name: str

    incident: str

    location: str

    date: str

    crime_type: str
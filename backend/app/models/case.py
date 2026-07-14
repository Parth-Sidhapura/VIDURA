from sqlalchemy import Column, Integer, String, Text

from app.database.db import Base


class Case(Base):

    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)

    victim_name = Column(String)

    accused_name = Column(String)

    crime_type = Column(String)

    incident = Column(Text)

    status = Column(String, default="Pending")
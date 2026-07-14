from sqlalchemy import Column, Integer, String

from app.database.db import Base


class Timeline(Base):

    __tablename__ = "timeline"

    id = Column(Integer, primary_key=True, index=True)

    case_id = Column(Integer)

    event = Column(String)

    timestamp = Column(String)
from fastapi import FastAPI
from app.api.copilot import router as copilot_router
from app.database.db import Base, engine
from app.models.case import Case
from app.api.documents import router as document_router
from app.api.case import router as case_router
from app.api.legal import router as legal_router
from app.api.auth import router as auth_router
from app.api.dashboard import router as dashboard_router
from app.models.timeline import Timeline
from app.api.timeline import router as timeline_router
from app.api.ai import router as ai_router
from fastapi.middleware.cors import CORSMiddleware
from app.api.documents import router as documents_router


app = FastAPI(title="VIDURA API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents_router)
app.include_router(document_router)
app.include_router(dashboard_router)
Base.metadata.create_all(bind=engine)
app.include_router(timeline_router)
app.include_router(case_router)
app.include_router(auth_router)
app.include_router(legal_router)
app.include_router(copilot_router)
app.include_router(ai_router)

@app.get("/")
def root():
    return {
        "project": "VIDURA",
        "status": "Backend Running"
    }
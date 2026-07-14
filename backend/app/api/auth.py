from fastapi import APIRouter
from app.schemas.user_schema import UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/login")
def login(user: UserLogin):

    return {
        "message": "Login Successful",
        "user": {
            "name": "Demo Officer",
            "role": "Investigating Officer"
        }
    }
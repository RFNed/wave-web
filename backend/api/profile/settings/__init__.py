from fastapi import APIRouter, Depends, HTTPException, status, Request
from pydantic import BaseModel
from backend.dependency import database
router = APIRouter()

class changeAvatar(BaseModel):
    argument: str

@router.post("/profile/changeAvatar/URL")
async def change_avatar(data: changeAvatar):
    return {"ok": True}
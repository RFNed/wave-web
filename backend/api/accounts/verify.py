from fastapi import APIRouter, Depends
from pydantic import BaseModel
from redis.asyncio import Redis
from passlib.context import CryptContext
from backend.dependecy import database
router = APIRouter()

class VerifyParams(BaseModel):
    token: str

@router.post("/verify")
async def verify(data: VerifyParams):
    pass
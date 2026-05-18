from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"message": "pong"}
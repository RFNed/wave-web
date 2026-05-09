from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel

from config import SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER, WEBSITE_URL

router = APIRouter()

@router.get("/ping")
async def ping():
    return {"message": "pong"}
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from redis.asyncio import Redis
from passlib.context import CryptContext
from backend.dependecy import database
from email.message import EmailMessage
from config import SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER, WEBSITE_URL
import aiosmtplib
import uuid
router = APIRouter()

class AuthModel(BaseModel):
    nickname: str
    password: str

@router.post("/auth")
async def auth(data: AuthModel, mysql = Depends(database.get_mysql)):
    async with mysql.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("select username, password_hash from users where username = %s and isEnabled = 1", (data.nickname,))
            result = await cursor.fetchone()
            if result:
                if CryptContext(schemes=["argon2"], deprecated="auto").verify(data.password, result[1]):
                    return {"result": "granted"}
                else:
                    return {"result": "wrong"}
            else:
                return {"result": "not exist"}
from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from redis.asyncio import Redis
from passlib.context import CryptContext
from backend.dependency import database
from email.message import EmailMessage
from config import SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER, WEBSITE_URL
import aiosmtplib
import uuid
router = APIRouter()

class AuthModel(BaseModel):
    nickname: str
    password: str

@router.post("/auth")
async def auth(data: AuthModel, response: Response, redis = Depends(database.get_redis), mysql = Depends(database.get_mysql)):
    async with mysql.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("select id, username, password_hash from users where username = %s and is_enabled = 1", (data.nickname,))
            result = await cursor.fetchone()
            if result:
                if CryptContext(schemes=["argon2"], deprecated="auto").verify(data.password, result[2]):

                    session_id = str(uuid.uuid4())

                    await redis.set(f"session:{session_id}", result[0])

                    response.set_cookie(key="session_id", value=session_id,httponly=True,samesite="lax",secure=False)

                    return {"result": "granted", "id": result[0]}
                else:
                    return {"result": "wrong"}
            else:
                return {"result": "not exist"}
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from redis.asyncio import Redis
from passlib.context import CryptContext
from backend.dependency import database
from email.message import EmailMessage
from config import SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER, WEBSITE_URL
import aiosmtplib
import uuid
router = APIRouter()

class RegisterModel(BaseModel):
    email: str
    nickname: str
    password: str

@router.post("/reg")
async def register(data: RegisterModel, redis = Depends(database.get_redis), mysql = Depends(database.get_mysql)):
    
    if (data.email == "" or data.nickname == "" or data.password == ""):
        return {"message": "Не все поля введены"}
    

    async with mysql.acquire() as conn:
        async with conn.cursor() as cursor:
            password_hashed = CryptContext(schemes=["argon2"], deprecated="auto").hash(data.password)
            try:
                await cursor.execute("""
INSERT INTO `users` 
(`username`, `email`, `password_hash`, `created_at`, `last_login`, `country`, `avatar_url`, `total_score`, `accuracy`, `play_count`) 
VALUES 
(%s, %s, %s, CURRENT_TIMESTAMP, NULL, NULL, NULL, '0', '0', '0')
                                 """, (data.nickname, data.email, password_hashed))
            except Exception as e:
                raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")



            token = uuid.uuid4().hex
            await redis.setex(
                f"verify:{token}",
                60 * 15,
                str(cursor.lastrowid)
            )
            
            message = EmailMessage()
            message["From"] = SMTP_USER
            message["To"] = data.email
            message["Subject"] = "Подтверждение почты"

            email_content = f"Перейдите по ссылке для подтверждения: {WEBSITE_URL}/verify?token={token}"
            message.set_content(email_content)
            try:
                await aiosmtplib.send(
                    message,
                    hostname=SMTP_HOST,
                    port=465,
                    username=SMTP_USER,
                    password=SMTP_PASS,
                    use_tls=True,
                )
            except Exception as e:
                print(e)
                raise HTTPException(status_code=500, detail="Ошибка при отправке письма. Попробуйте позже.")
            
            return {"message": "Проверьте свою почту"}
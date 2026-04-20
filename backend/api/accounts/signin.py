from fastapi import APIRouter, Depends
from pydantic import BaseModel
from redis.asyncio import Redis
from passlib.context import CryptContext
from backend.dependecy import database
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
            await cursor.execute("select * from users where email = %s or username = %s", (data.email, data.nickname,))
            result = await cursor.fetchone()
            if result:
                return {"status": "failed", "message": "Почта или никнейм уже занят"}
            password_hashed = CryptContext(schemes=["argon2"], deprecated="auto").hash(data.password) 
            await cursor.execute("""
INSERT INTO `users` 
(`username`, `email`, `password_hash`, `created_at`, `last_login`, `country`, `avatar_url`, `total_score`, `accuracy`, `play_count`) 
VALUES 
(%s, %s, %s, CURRENT_TIMESTAMP, NULL, NULL, NULL, '0', '0', '0')
                                 """, (data.nickname, data.email, password_hashed))
            
            token = uuid.uuid4().hex
            redis.setex(
                f"verify:{token}",
                60 * 15,
                {str(cursor.lastrowid)}
            )
    return {"message": "Проверьте свою почту"}
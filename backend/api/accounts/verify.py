from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from redis.asyncio import Redis
from passlib.context import CryptContext
from backend.dependecy import database
from asyncio import sleep
from random import uniform
router = APIRouter()

class VerifyParams(BaseModel):
    token: str



@router.post("/verify")
async def verify(data: VerifyParams, response: Response, redis = Depends(database.get_redis), mysql = Depends(database.get_mysql)):
    value = await redis.get(f"verify:{data.token}")
    if value:
        await sleep(uniform(5.0, 7.0))
        await redis.delete(f"verify:{data.token}")
        async with mysql.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute("UPDATE `users` SET `isEnabled` = '1' WHERE `users`.`id` = %s", (value,))
                return {"status": 200}
    else:
        return {"status": 404}

    # JWT
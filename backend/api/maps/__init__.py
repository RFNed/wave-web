from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from backend.dependency import database
router = APIRouter()

@router.get("/getmaps")
async def maps(search, mysql = Depends(database.get_mysql)):
    async with mysql.acquire() as conn:
        async with conn.cursor() as cursor:
            fetch = f"%{search}%"
            await cursor.execute(f"SELECT * FROM `beatmap_containers` join users on users.id = beatmap_containers.creator_id where title like %s or artist like %s", (fetch, fetch,))
            data = await cursor.fetchall()
            result = [
                {
                    "id": result_data[0],
                    "title": result_data[1],
                    "author": result_data[2],
                    "creator_id": result_data[3],
                    "created_at": result_data[4],
                    "status": result_data[5],
                    "cover_url": result_data[6],
                    "nickname_creator": result_data[8],
                    "author_url": result_data[15]
                }
                for result_data in data
            ]
            return result


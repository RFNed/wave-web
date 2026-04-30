from fastapi import APIRouter, Depends
from backend.dependency import database
router = APIRouter()

@router.get("/leaderboard")
async def get_leaderboard(mysql = Depends(database.get_mysql)):
    async with mysql.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("select id, username, COALESCE(avatar_url, 'assets/avatars/no_avatar.png') as avatar_url, total_score from users where is_enabled = 1 order by total_score desc limit 50;")
            rows = await cursor.fetchall()
            
            result = [
                {
                    "id": row[0],
                    "username": row[1],
                    "avatar": row[2],
                    "score_value": row[3]
                }
                for row in rows
            ]
            return result

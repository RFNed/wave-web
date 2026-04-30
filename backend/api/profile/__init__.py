from fastapi import APIRouter, Depends, HTTPException, status
from backend.dependency import database
router = APIRouter()

@router.get("/profile")
async def profile_get(id: int, mysql = Depends(database.get_mysql)):
    async with mysql.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("select username, COALESCE(description, 'Пользователь ничего не оставил :(') as description, created_at, COALESCE(last_login, 'Никогда') as last_login, total_score, COALESCE(avatar_url, 'assets/avatars/no_avatar.png') as avatar_url, COALESCE(banner_url, 'assets/banners/no_banner.png') as banner_url, play_count, accuracy from users where is_enabled = 1 and id = %s", (id,))
            result = await cursor.fetchone()
            if not result:
                raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Player not found! :(")
            else:
                return {
                    "username": result[0],
                    "description": result[1],
                    "created_at": result[2],
                    "last_login": result[3],
                    "total_score": result[4],
                    "avatar_url": result[5],
                    "banner_url": result[6],
                    "play_count": result[7],
                    "accuracy": result[8]
                }

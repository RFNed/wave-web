from fastapi import APIRouter, Depends, HTTPException, status, Request
from pydantic import BaseModel
from backend.dependency import database
from urllib.parse import urlparse
router = APIRouter()

class changeAvatar(BaseModel):
    argument: str

@router.post("/profile/changeAvatar/URL")
async def change_avatar(data: changeAvatar, request: Request, mysql = Depends(database.get_mysql), redis = Depends(database.get_redis)):
    session_id = request.cookies.get("session_id")
    print(session_id)
    value = await redis.get(f"session:{session_id}")
    
    if not value:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Auth")
    parsed = urlparse(data.argument)
    if parsed.scheme not in ("http", "https"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid URL")
    
    async with mysql.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("UPDATE users SET avatar_url = %s WHERE id = %s", (data.argument, value,))
            
    return {"message": "Avatar updated successfully"}
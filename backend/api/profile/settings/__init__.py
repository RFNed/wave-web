from fastapi import APIRouter, Depends, HTTPException, status, Request, UploadFile, File
from pydantic import BaseModel
from PIL import Image
from io import BytesIO
from backend.dependency import database
from urllib.parse import urlparse
import uuid, os
router = APIRouter()

class changeAvatar(BaseModel):
    argument: str

@router.post("/profile/changeAvatar/URL")
async def change_avatar(data: changeAvatar, request: Request, mysql = Depends(database.get_mysql), redis = Depends(database.get_redis)):
    session_id = request.cookies.get("session_id")
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


@router.post("/profile/changeAvatar/file")
async def change_avatar_file(request: Request, mysql = Depends(database.get_mysql), redis = Depends(database.get_redis), avatar: UploadFile = File(...)):
    session_id = request.cookies.get("session_id")
    value = await redis.get(f"session:{session_id}")
    if not value:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Auth")
    

    if avatar.content_type not in ["image/jpeg"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file type. Only JPEG images are allowed.")
    
    content = await avatar.read()
    if len(content) > 2 * 1024 * 1024:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File size exceeds the limit of 5MB.")
    
    try:
        image = Image.open(BytesIO(content))
        image.verify()
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid image file.")
    
    user_dir = os.path.join("backend", "assets", "avatars", str(value))
    os.makedirs(user_dir, exist_ok=True)

    filename = f"{uuid.uuid4()}.jpg"

    filepath = os.path.join("backend", "assets", "avatars", f"{value}", filename)

    with open(filepath, "wb") as f:
        f.write(content)

    avatar_url = f"assets\\avatars\\{value}\\{filename}"
    
    async with mysql.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("UPDATE users SET avatar_url = %s WHERE id = %s", (avatar_url, value,))

    return {"message": "Avatar updated successfully"}

@router.post("/profile/changeBanner/URL")
async def change_avatar(data: changeAvatar, request: Request, mysql = Depends(database.get_mysql), redis = Depends(database.get_redis)):
    session_id = request.cookies.get("session_id")
    value = await redis.get(f"session:{session_id}")
    
    if not value:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Auth")
    parsed = urlparse(data.argument)
    if parsed.scheme not in ("http", "https"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid URL")
    
    async with mysql.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("UPDATE users SET banner_url = %s WHERE id = %s", (data.argument, value,))
    
    return {"message": "Banner updated successfully"}


@router.post("/profile/changeBanner/file")
async def change_avatar_file(request: Request, mysql = Depends(database.get_mysql), redis = Depends(database.get_redis), avatar: UploadFile = File(...)):
    session_id = request.cookies.get("session_id")
    value = await redis.get(f"session:{session_id}")
    if not value:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not Auth")
    

    if avatar.content_type not in ["image/jpeg"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file type. Only JPEG images are allowed.")
    
    content = await avatar.read()
    if len(content) > 2 * 1024 * 1024:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File size exceeds the limit of 5MB.")
    
    try:
        image = Image.open(BytesIO(content))
        image.verify()
    except:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid image file.")
    
    user_dir = os.path.join("backend", "assets", "banners", str(value))
    os.makedirs(user_dir, exist_ok=True)

    filename = f"{uuid.uuid4()}.jpg"

    filepath = os.path.join("backend", "assets", "banners", f"{value}", filename)

    with open(filepath, "wb") as f:
        f.write(content)

    avatar_url = f"assets\\banners\\{value}\\{filename}"
    
    async with mysql.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("UPDATE users SET banner_url = %s WHERE id = %s", (avatar_url, value,))

    return {"message": "Banner updated successfully"}
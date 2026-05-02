# backend/init.py
from config import *
import fastapi
from backend.api.accounts import signin
from backend.api.accounts import verify
from backend.api.accounts import auth
from backend.api import profile
from backend.api.stats import leaderboard
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from redis.asyncio import Redis
from aiomysql import create_pool
from fastapi.staticfiles import StaticFiles

@asynccontextmanager
async def lifespan(app: fastapi.FastAPI):
    app.state.redis = Redis(host=REDIS_HOST, db=REDIS_DB, password=REDIS_PASS, port=REDIS_PORT, decode_responses=True)
    app.state.mysql = await create_pool(
        minsize=1,
        maxsize=20,
        echo=IS_DEBUG,
        user=MYSQL_USER,
        host=MYSQL_HOST,
        db=MYSQL_DB,
        password=MYSQL_PASS,
        autocommit=True
    )
    yield
    app.state.mysql.close()
    await app.state.redis.close()
app = fastapi.FastAPI(lifespan=lifespan)


app.mount("/assets/avatars", StaticFiles(directory="backend/assets/avatars"), name="avatars")
app.mount("/assets/banners", StaticFiles(directory="backend/assets/banners"), name="banners")
app.add_middleware(CORSMiddleware, allow_origins=REACT_URLS, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(signin.router)
app.include_router(verify.router)
app.include_router(auth.router)
app.include_router(leaderboard.router)
app.include_router(profile.router)
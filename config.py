from os import getenv
from dotenv import load_dotenv

load_dotenv()

## for dev
 
IS_DEBUG = True

##

WEBSITE_URL = getenv("VITE_WEBSITE_URL")
BACKEND_URL = getenv("VITE_API_URL")

REACT_URLS = [WEBSITE_URL]

SMTP_HOST = getenv("SMTP_HOST")
SMTP_PORT = getenv("SMTP_PORT")
SMTP_USER = getenv("SMTP_USER")
SMTP_PASS = getenv("SMTP_PASS")

REDIS_HOST = getenv("REDIS_HOST")
REDIS_PASS = getenv("REDIS_PASS")
REDIS_DB = getenv("REDIS_DB")
REDIS_PORT = getenv("REDIS_PORT")

MYSQL_HOST = getenv("MYSQL_HOST")
MYSQL_USER  = getenv("MYSQL_USER")
MYSQL_PASS = getenv("MYSQL_PASS")
MYSQL_DB = getenv("MYSQL_DB")
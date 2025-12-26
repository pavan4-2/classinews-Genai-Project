from google.oauth2 import id_token
from google.auth.transport import requests
from fastapi import HTTPException, status
import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

def verify_google_token(token: str):
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        return idinfo
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google Token",
            headers={"WWW-Authenticate": "Bearer"},
        )

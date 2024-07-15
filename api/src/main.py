#!/usr/bin/env python3
"""FastAPI app"""
import os
from typing import Literal
from fastapi import FastAPI, APIRouter

app: FastAPI
if os.getenv('DEPLOY_TARGET') != 'prod':
    app = FastAPI()
else:
    app = FastAPI(
        docs_url=None,
        redoc_url=None,
        openapi_url=None,
    )
api = APIRouter(prefix='/api')


@api.get('/')
async def index() -> dict[Literal['message']: str]:
    """index."""
    return {'message': 'whats up?'}


app.include_router(api)

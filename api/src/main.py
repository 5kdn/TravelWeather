#!/usr/bin/env python3
"""FastAPI app"""
import os
from fastapi import FastAPI

from .routers import coordinate


app: FastAPI
if os.getenv('DEPLOY_TARGET') != 'dev':
    # devじゃなければ全てprodとみなす
    app = FastAPI(root_path='/api', docs_url=None, redoc_url=None, openapi_url=None)
else:
    app = FastAPI(root_path='/api')


@app.get('/')
async def index():
    """index."""
    return {'message': 'whats up?'}


app.include_router(coordinate.router)

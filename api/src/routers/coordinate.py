#!/usr/bin/env python3
"""sub module of Fastapi /coordinate/"""
from fastapi import APIRouter

from ..map import get_coordinate_from_address


router = APIRouter()


@router.get('/coordinate/')
def coordinate(address: str|None=None):
    """get coordinates from address"""
    if address is None:
        return {
            'status': 'error',
            'error': 'address not found. you must be request as `coodinate/?address={address you want to lookup}`',
        }
    try:
        result = get_coordinate_from_address(address)
        return {
            'status': 'ok',
            'result': result,
        }
    except ValueError as err:
        return {
            'status': 'error',
            'error': err.args,
        }
  # pylint: disable-next=W0718
    except Exception as err:
        return {
            'status': 'error',
            'error': err.args,
        }

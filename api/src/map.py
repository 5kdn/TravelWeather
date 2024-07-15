#!/usr/bin/env python3
"""library for googlemaps."""
import os
from typing import Literal

import googlemaps

MAPS_API_KEY: str = key if (key := os.getenv('SERVERSIDE_MAPS_API_KEY')) else ''


def get_coordinate_from_address(
        address: str, lang: str = 'ja'
        ) -> list[dict[Literal['lat','lng']: float]]|None:
    """get coordinates from address

    Obtains the coordinates of the specified `address`
    from the GoogleMap Geocode API and returns them.

    Args:
        address (str): Name of the point from which to obtain coordinates
    Returns:
        list[dict[Literal['lat', 'lng']]: float]: Candidate coordinates obtained
        None: Failed to get
    Examples:
        >>> get_coordinates_from_address('東京タワー')
        [{
            'name': '日本、〒105-0011 東京都港区芝公園４丁目２−８',
            'lat': 35.6585805,
            'lng': 139.7454329
        }]
        >>> get_coordinates_from_address('undefined place name')
        None
    """
    try:
        maps = googlemaps.Client(key=MAPS_API_KEY)
        results: dict = maps.geocode(address=address, language=lang)
        if len(results) == 0:
            return []

        candidate: list[dict[Literal['name','lat','lng']: float|str|None]] = []
        for result in results:
            name = result['formatted_address'] if 'formatted_address' in result.keys() else None

            if 'geometry' not in result.keys() or \
                'location' not in result['geometry'].keys():
                continue

            loc: dict = result['geometry']['location']
            if 'lat' not in loc.keys() or 'lng' not in loc.keys():
                continue
            candidate.append({
                'name': name,
                'lat': loc['lat'],
                'lng': loc['lng'],
            })
        return candidate
    # pylint: disable-next=W0718
    except Exception as err:
        raise err

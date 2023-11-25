from pprint import pprint

import requests


def get_coordinates(address: str) -> tuple[float, float]:
    """
    Get coordinates from address using geocoder.
    """

    response = requests.get("https://geocode-maps.yandex.ru/1.x", params={
        "apikey": "40d1649f-0493-4b70-98ba-98533de7710b",
        "geocode": address,
        "format": "json",
    })

    coords = response.json()["response"]["GeoObjectCollection"]["featureMember"][0]["GeoObject"]["Point"]["pos"].split()

    return {"latitude": float(coords[1]), "longitude": float(coords[0])}

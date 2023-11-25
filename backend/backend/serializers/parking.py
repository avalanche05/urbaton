from backend.models import parking as db_model_parking
from backend import schemas


def get_parking(db_parking: db_model_parking.Parking, favourite_parking_ids: list[int] = []) -> schemas.Parking:
    parking = schemas.Parking(
        id=db_parking.id,
        address=db_parking.address,
        center=schemas.PolygonPoint(longitude=db_parking.center["longitude"], latitude=db_parking.center["latitude"]),
        polygon=[schemas.PolygonPoint(longitude=center["longitude"], latitude=center["latitude"]) for center in
                 db_parking.polygon],
        contacts=db_parking.contacts,
        base_spaces=db_parking.base_spaces,
        busy_base_spaces=db_parking.busy_base_spaces,
        disabled_spaces=db_parking.disabled_spaces,
        busy_disabled_spaces=db_parking.busy_disabled_spaces,
        electro_spaces=db_parking.electro_spaces,
        busy_electro_spaces=db_parking.busy_electro_spaces,
        schedule=db_parking.schedule,
        number=db_parking.number,
        price=db_parking.price,
        is_camera=db_parking.is_camera,
        is_protected=db_parking.is_protected,
        tags=db_parking.tags,
        rating=db_parking.rating,
        is_favorite=db_parking.id in favourite_parking_ids,

    )

    return parking


def get_parkings(db_parkings: list[db_model_parking.Parking], favourite_parking_ids: list[int] = []) -> list[
    schemas.Parking]:
    return [get_parking(db_parking, favourite_parking_ids) for db_parking in db_parkings]

class PlaceUnavailable(Exception):
    def __init__(self):
        self.message = 'Place reserved'
        self.status_code = 404

class ParkingNotFound(Exception):
    def __init__(self):
        self.message = 'Parking not found'
        self.status_code = 404

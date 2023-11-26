import requests
import random

def fill_reviews():
    session = requests.Session()

    for i in range(1, 373):
        session.post("http://localhost:8889/review/create", headers={"Authorization": "bearer R6UfwXPmSY"}, json={
            "text": "Хорошая парковка",
            "rating": random.randint(1, 5),
            "tags": [
                "Есть места"
            ],
            "parking_id": i
        })


fill_reviews()

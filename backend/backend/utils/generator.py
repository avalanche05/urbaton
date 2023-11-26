import pymorphy2
import random


def get_random_alias():
    adjectives = ["неопознанный", "великолепный", "забытый", "тайный", "блестящий", "умный", "смешной", "летающий",
                  "шумный"]
    animals = ["капибара", "медведь", "тигр", "пингвин", "динозавр", "пантера", "кот", "кролик", "хомяк"]

    return f"{random.choice(adjectives)} {random.choice(animals)}".capitalize()

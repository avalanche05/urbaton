import pymorphy2
import random


def get_random_alias():
    adjectives = ["неопознанный", "великолепный", "забытый", "тайный", "блестящий", "умный", "смешной", "летающий",
                  "шумный"]
    animals = ["капибара", "медведь", "тигр", "пингвин", "динозавр", "пантера", "кот", "кролик", "хомяк"]

    return f"{random.choice(adjectives)} {random.choice(animals)}".capitalize()

    # Выбор случайного прилагательного и животного
    adjective = random.choice(adjectives)
    animal = random.choice(animals)

    # Используем pymorphy2 для определения рода существительного и склонения прилагательного
    morph = pymorphy2.MorphAnalyzer()
    gender = morph.parse(animal)[0].tag.gender
    adjective_form = morph.parse(adjective)[0].inflect({gender}).word

    # Сборка и возврат сгенерированного имени
    generated_name = f"{adjective_form} {animal}"
    return generated_name

# Решение команды Эйч Ю Ай (happy ui) на хакатоне Урбанон.

## Обзор

Приветствуем в репозитории проекта команды Happy UI, разработанного для хакатона Урбанон! Мы разработали инновационный сервис для удобного поиска, бронирования и отслеживания информации о парковочных местах в городе Екатеринбург. Приложение решает проблемы доступности парковочных мест, предоставляя пользователям удобный инструмент для поиска, бронирования и оплаты парковочных мест.

## Основной функционал

1. **Отображение доступных парковочных мест**
2. **Информация о парковочном месте**
3. **Бронирование парковочного места**
4. **Оплата парковочного места**
5. **Обратная связь о парковочном месте**
  
![image](https://github.com/avalanche05/urbaton/assets/21103882/b7684827-4582-4838-bf74-dc567131ad41)
![image](https://github.com/avalanche05/urbaton/assets/21103882/4c43a624-716a-4bf9-a482-835b7a694302)

## Особенности решения

- **Прогноз спроса на парковочные места**
  - Использует аналитику для прогнозирования спроса на парковочные места в различных районах.

- **Гибкие фильтры**
  - Пользователи могут настраивать фильтры для поиска парковочных мест по различным параметрам.

- **Поиск лучшей парковки**
  - Возможность ввести адрес и найти лучшее парковочное место для поездки.
 
- **Навигация**
  - Прямо в нашем приложении можно построить маршрут до любой парковки.

- **Уведомления**
  - Мы реализовали отправку СМС уведомлений с оповещениями о бронировании.

- **Аналитика**
  - Собрали аналитику по загруженности парковочных мест и теперь можем предсказывать спрос в любой день года с точностью до 2 машин.
 
## Структура системы

<img width="663" alt="image" src="https://github.com/avalanche05/urbaton/assets/21103882/d6140779-a283-434a-92b4-4283b1002f3a">

## Инструкция по запуску

### Работа с сервисом

Фронтенд нашего сервиса доступен по ссылке:  [happy-ui.ru](http://happy-ui.ru)

Swagger документация для бэкенда доступна по ссылке: [api.happy-ui/docs](http://api.happy-ui/docs/)

Вы можете использовать его для тестирования. Однако, если вы хотите запустить сервис локально, то вам необходимо выполнить следующие действия:

### Локальный запуск

Перед тем, как развернуть у себя сервис необходимо установить [Docker](https://docs.docker.com/get-docker/) и [Docker Compose](https://docs.docker.com/compose/install) на вашу машину.

После этого необходимо скачать репозиторий и выполнить следующие команды:

```bash
docker-compose up --build
```

После этого сервис будет доступен по адресу: [localhost:3000](http://localhost:3000)

## Технологии

### Backend

- [**FastApi**](https://fastapi.tiangolo.com/) - фреймворк для создания веб-приложений на языке Python
- [**PostgreSQL**](https://www.postgresql.org/) - реляционная база данных
- [**SQLAlchemy**](https://www.sqlalchemy.org/) - ORM для работы с базой данных
- [**Docker**](https://www.docker.com/) - платформа для разработки, доставки и запуска приложений
- [**Docker Compose**](https://docs.docker.com/compose/) - инструмент для определения и запуска многоконтейнерных приложений с помощью Docker

### Frontend

- [**React**](https://reactjs.org/) - JavaScript-библиотека для создания пользовательских интерфейсов
- [**Mobx**](https://mobx.js.org/) - библиотека для управления состоянием приложения
- [**Ant Design**](https://ant.design/) - UI библиотека

## Команда

- [Лиза, Product designer](https://t.me/dvij_designer)

- [Ваня, Backend](https://t.me/maj0rio)

- [Женя, Frontend](https://t.me/shmate)

- [Максим, ML](https://t.me/mrapplexz)

- [Ваня, Backend](https://t.me/avalanche05)


## Контакты

В случае возникновения каких-либо ошибок или вопросов не стесняйтесь создавать Issue в репозитории. 

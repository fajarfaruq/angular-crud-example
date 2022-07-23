# ucars-technical-test backend
This repository using for backend UCARS technical test 

- Copy .example.env to .env 
- build
docker-compose build
- migrate
docker-compose run web alembic upgrade head
- now lets run it
docker-compose up
- open your browser and go to uvicorn running address . example : http://localhost:8000
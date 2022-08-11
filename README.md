
# angular-crud-example

This repository using for Angular CRUD Example


To install the Angular Crud Example, you can follow these steps:

### 1. Backend

## Installation

Install backend Angular Crud Example

```bash
  cd backend
  cp .env.example .env  --> (.env can modify as needed)
```

## Deployment

To deploy this project run

```bash
  docker-compose build --force-rm --no-cache 

  docker-compose run web alembic upgrade head

  docker-compose up -d

  (Backend is running according to .env settings)

```

### 2. Back to root folder


```bash
  cd ..
```

### 3. Frontend
## Installation

Install frontend UCARS

```bash
  cd frontend
  cd src
  cp app.config.json.example app.config.json  --> (app.config.json can modify as needed)
  cd ..
```

## Deployment

To deploy this project run

```bash
  docker build -t frontend .

  docker run -p 8000:80 -d frontend

  (If you have followed each step, 
  you should have your docker container running on Port 8000 
  and your application running on http://localhost:8000 )

```
## Feedback

If you have any feedback, please reach out to me at fajarfaruqmaulana@gmail.com


## FAQ

If an error occurs, you can do the following steps:

#### 1. Docker: Is the server running on host "localhost" (::1) and accepting TCP/IP connections on port 5432?

Answer : Restart postgre service on your container



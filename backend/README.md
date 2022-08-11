
# angular-crud-example backend

This repository using for backend Angular CRUD Example


## Installation

Install backend Angular Crud Example

```bash
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


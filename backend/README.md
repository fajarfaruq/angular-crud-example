
# ucars-technical-test backend

This repository using for backend UCARS technical test 


## Installation

Install backend UCARS

```bash
  cp .env.example .env  --> (.env can modify as needed)
```

## Deployment

To deploy this project run

```bash
  docker-compose build --no-cache

  docker-compose run web alembic upgrade head

  docker-compose up -d

  (Backend is running according to .env settings)

```


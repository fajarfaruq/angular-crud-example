
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
  docker-compose build

  docker-compose run web alembic upgrade head

  docker-compose up

  (Backend is running according to .env settings)

```


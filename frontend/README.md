
# angular-crud-example frontend

This repository using for frontend Angular CRUD Example


## Installation

Install frontend Angular CRUD Example

```bash
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


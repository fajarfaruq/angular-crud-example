
# ucars-technical-test frontend

This repository using for frontend UCARS technical test 


## Installation

Install frontend UCARS

```bash
  cd src
  cp app.config.json.example config.json.example  --> (config.json.example can modify as needed)
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


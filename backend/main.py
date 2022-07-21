from imp import reload
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routes.api import router as api_router

app = FastAPI()

# This part using for allowed origins 
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

if __name__ == '__main__':
    # This part using for define host and port where the api will be launch
    uvicorn.run("main:app", host='127.0.0.1', port=8005, log_level="info", reload=True)
    print("running")
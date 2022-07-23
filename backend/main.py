from imp import reload
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from routes.api import router as api_router
import os  
from dotenv import load_dotenv

# Define base dir route for this project 
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load .env file path 
ENV_FILE = BASE_DIR, '.env'
load_dotenv(os.path.join(BASE_DIR, '.env'))

# This part is used for setting server variable
HOST = str(os.getenv('SERVER_HOST'))
PORT = int(os.getenv('SERVER_PORT'))

# This part is used for define app as FASTAPI()
app = FastAPI()

# This part is used for allowed origins access to API 
origins = ["*"]

# This part is used for CORS API setting
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This part is used to include the router already prepared before
app.include_router(api_router)

if __name__ == '__main__':
    # This part is used for define host and port where the API will be launch
    uvicorn.run("main:app", host=HOST, port=PORT, log_level="info", reload=True)
    print("running")
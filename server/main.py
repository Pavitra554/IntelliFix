from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import user

app = FastAPI()

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # This allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # This allows all headers
)


@app.get("/")
async def read_root():
    return {"message": "Hello, this is Intellifix"}

app.include_router(user.router)


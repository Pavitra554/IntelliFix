from fastapi import FastAPI
import post

app = FastAPI()


@app.get("/")
async def read_root():
    return {"message": "Hello user this is Intellifix"}

app.include_router(post.router)
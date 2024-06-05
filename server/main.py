from fastapi import FastAPI
import user


app = FastAPI()


@app.get("/")
async def read_root():
    return {"message": "Hello, this is Intellifix"}

app.include_router(user.router)


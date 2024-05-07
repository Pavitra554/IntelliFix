from fastapi import APIRouter

router = APIRouter()


@router.post("api/v1/intellifix/upload")
async def read_root(file):

    return{
        "status":"success",
        "file" : file,
        "message" : "thanks"
    }

    
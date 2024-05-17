from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from . import post
import json
from .model.model import llm_invoke
from .utils.utils import feature

upload_file_path = "server\\app\\database\\uploaded_files.json"

def get_dict(upload_file_path:str):
    try:
        with open(upload_file_path) as j_file:
            return json.load(j_file)
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    


router = APIRouter()

router.include_router(post.router)

@router.get("/api/v1/Intellifix/code_optimizer")
async def code_optimizer(filename:str):
    d = get_dict(upload_file_path)

    prog_prompt = await post.get_file_details(filename ,d)
    feature_prompt = feature("optimize")
    helping_prompt=""

    result = llm_invoke(prog_prompt=prog_prompt, feature_prompt=feature_prompt, helping_prompt=helping_prompt)
    return {
            "status" : "success",
            "result" : result,
            "message": "Operation executed succesfully"
            }

@router.get("/api/v1/Intellifix/debugger")
async def code_debugger(filename:str):
    d = get_dict(upload_file_path)

    prog_prompt = await post.get_file_details(filename ,d)
    feature_prompt = feature("debug")
    helping_prompt=""

    result = llm_invoke(prog_prompt=prog_prompt, feature_prompt=feature_prompt, helping_prompt=helping_prompt)
    return {
            "status" : "success",
            "result" : result,
            "message": "Operation executed succesfully"
            }

@router.get("/api/v1/Intellifix/translator")
async def translator():
    pass



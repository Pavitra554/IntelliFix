from fastapi import APIRouter, File, UploadFile, Depends, HTTPException,status, Form
from model.model import llm_invoke, followup_invoke
from utils.utils import feature, code_block, process_result, prompt_retriever
from typing import Optional
from fastapi.security import APIKeyHeader
from dotenv import load_dotenv
import os

# Define the static token
load_dotenv()
protected_api_key = os.getenv('PROTECTED_API_KEY')

API_TOKEN = protected_api_key

router = APIRouter()

# Dependency to get the API key
api_key_header = APIKeyHeader(name="X-API-KEY")

router = APIRouter()

async def verify_token(api_key: str = Depends(api_key_header)):
    if api_key != API_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API Key",
            headers={"WWW-Authenticate": "Bearer"},
        )


# optimizer
@router.get("/api/v1/Intellifix/code_optimizer", dependencies=[Depends(verify_token)] )
async def code_optimizer(prompt_as_str: Optional[str] = None, prompt_as_file: Optional[UploadFile] = File(None), follow_up:str = None):
    try:
        if follow_up is not None:
            result = followup_invoke(follow_up=follow_up)
            return await process_result(result)

        else:
            prog_prompt = await prompt_retriever(prompt_as_str, prompt_as_file)
            if prog_prompt is None:
                raise ValueError("No valid prompt provided")


            feature_prompt = feature("optimize")

            result = llm_invoke(prog_prompt=prog_prompt, feature_prompt=feature_prompt)

            return await process_result(result)
    except Exception as e:
        return {"error": str(e)}


# debugger
@router.get("/api/v1/Intellifix/debugger", dependencies=[Depends(verify_token)])
async def code_debugger(prompt_as_str: Optional[str] = None, prompt_as_file: Optional[UploadFile] = File(None), follow_up:str = None):

    try:
        if follow_up is not None:
            result = followup_invoke(follow_up=follow_up)
            return await process_result(result)
        
        else:
            prog_prompt = await prompt_retriever(prompt_as_str, prompt_as_file)
            if prog_prompt is None:
                raise ValueError("No valid prompt provided")

            
            feature_prompt = feature("debug")

            result = llm_invoke(prog_prompt=prog_prompt, feature_prompt=feature_prompt)

            return await process_result(result)
        
    except Exception as e:
        return {"error": str(e)}
    

# translator
@router.get("/api/v1/Intellifix/translator", dependencies=[Depends(verify_token)])
async def translator(required_language:str, prompt_as_str: Optional[str] = None, prompt_as_file: Optional[UploadFile] = File(None), follow_up:str = None):
    try:
        if follow_up is not None:
            result = followup_invoke(follow_up=follow_up)
            return await process_result(result)
        
        else:
            prog_prompt = await prompt_retriever(prompt_as_str, prompt_as_file)
            if prog_prompt is None:
                raise ValueError("No valid prompt provided")

            
            feature_prompt = feature("translate")
            helping_prompt = required_language

            result = llm_invoke(prog_prompt=prog_prompt, feature_prompt=feature_prompt,helping_prompt=helping_prompt)

            return await process_result(result)
        
    except Exception as e:
        return {"error": str(e)}
    

# docs
@router.get("/api/v1/Intellifix/docs", dependencies=[Depends(verify_token)])
async def docs( prompt_as_str: Optional[str] = None, prompt_as_file: Optional[UploadFile] = File(None), follow_up:str = None):
    try:
        if follow_up is not None:
            result = followup_invoke(follow_up=follow_up)
            return await process_result(result)
        
        else:
            prog_prompt = await prompt_retriever(prompt_as_str, prompt_as_file)
            if prog_prompt is None:
                raise ValueError("No valid prompt provided")

            feature_prompt = feature("docs")
            
            result = llm_invoke(prog_prompt=prog_prompt, feature_prompt=feature_prompt)
           

            return await process_result(result)
        
    except Exception as e:
        return {"error": str(e)}
    

# requirements    
@router.get("/api/v1/Intellifix/reqs", dependencies=[Depends(verify_token)])
async def reqs( prompt_as_str: Optional[str] = None, prompt_as_file: Optional[UploadFile] = File(None), follow_up:str = None):
    try:
        if follow_up is not None:
            result = followup_invoke(follow_up=follow_up)
            return await process_result(result)
        
        else:
            prog_prompt = await prompt_retriever(prompt_as_str, prompt_as_file)
            if prog_prompt is None:
                raise ValueError("No valid prompt provided")

            feature_prompt = feature("reqs")
            
            result = llm_invoke(prog_prompt=prog_prompt, feature_prompt=feature_prompt)
           

            return await process_result(result)
        
    except Exception as e:
        return {"error": str(e)}







from typing import Optional
from fastapi import UploadFile,File
import json

def prog_reader(file_paths:list)->str:
    """Program file reader

    Args:
        file_paths (list): _description_

    Returns:
        str: _description_
    """
    code = ""
    for file_path in file_paths:
        try:
            with open(file_path, 'r') as file:
                code += file.read() + "\n"  # Add a newline separator between files
        except FileNotFoundError:
            return f"File not found: {file_path}"
        except Exception as e:
            return f"Error reading file: {file_path} - {e}"
    return code


def load_json(file_path:str)->dict:
    """json file reader

    Args:
        file_path (str): _description_

    Returns:
        dict: _description_
    """
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        print("File not found")
    except json.JSONDecodeError:
        print("Invalid JSON format")
    except Exception as e:
        print(f"Error loading JSON file: {e}")


feature_prompts = load_json("prompts.json")["feature_prompts"]

def feature(choice:str)->str:
    """Returns predefined prompts for your given prompt choice

    Args:
        option (str): _description_

    Returns:
        str: _description_
    """
    return feature_prompts[choice]


# output sanitizer
def code_block(text: str):
    '''Divides response into message and code block'''

    try:
        parts = text.split("```")
        if len(parts) < 2:
            return None
         
        message = parts[0].strip()
        code = parts[1].split("```")[0].strip()
        return message, code
    
    except:
        return None

# prompt retriever
async def prompt_retriever(prompt_as_str:Optional[str] = None, prompt_as_file: Optional[UploadFile] = File(None)):
    """Retrieve prompt content from string or file."""

    if prompt_as_str is not None:
        return prompt_as_str

    if prompt_as_file is not None:
        contents = await prompt_as_file.read()
        return contents.decode()

    return None
    


# result
async def process_result(result):
    """filters result if it has a code block or not"""

    result_parts = code_block(result)

    if result_parts is None:
        return {
            "status": "success",
            "response": result,
            "message": "Operation executed successfully"
        }

    message_response, code_response = result_parts
    return {
        "status": "success",
        "message_response": message_response,
        "code_response": code_response,
        "message": "Operation executed successfully"
    }

    
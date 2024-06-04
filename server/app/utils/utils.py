
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


feature_prompts = load_json("server\\app\\prompts\prompts.json")["feature_prompts"]

def feature(choice:str)->str:
    """Returns predefined prompts for your given prompt choice

    Args:
        option (str): _description_

    Returns:
        str: _description_
    """
    return feature_prompts[choice]


# output sanitizer
def code_block(text:str):
    '''modifies the string converted response into executable code string'''
    
    list = text.split("```")
    message = list[0]
    code = list[1].split("```")[0]

    return message if message else "",code if code else ""



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
    """_summary_

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

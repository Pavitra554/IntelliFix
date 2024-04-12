from utils import load_json

feature_prompts = load_json("feature_prompts.json")

def feature(choice:str)->str:
    """Returns predefined prompts for your given prompt choice

    Args:
        option (str): _description_

    Returns:
        str: _description_
    """
    return feature_prompts[choice]
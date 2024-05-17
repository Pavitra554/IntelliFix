from langchain_openai import ChatOpenAI
import os
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from ..utils import utils


# Load environment variables from the .env file where our api key is stored
load_dotenv()

llm = ChatOpenAI()

#system prompt
sys_prompts = utils.load_json("server\\app\\database\\prompts.json")["system_prompts"]
sys_prompt = sys_prompts["general"]


# program/code as prompt (which we want to debug)
prog_paths = ["merge_sort.py"]
prog_prompt = utils.prog_reader(prog_paths)

# choice of feature
# choice = input("Enter your choice ")
feature_prompt = utils.feature("optimize")


chat_template = ChatPromptTemplate.from_messages(
    [
        ("system", sys_prompt),
        ("human", "{prog_prompt}"),
        ("human", "{feature_prompt}"),
        ("human", "{helping_prompt}")
    ]
)

# chain
chain = chat_template | llm 



def llm_invoke(prog_prompt:str, feature_prompt:str, helping_prompt:str)->str:
    """_summary_

    Args:
        prog_promt (str): _description_
        feature_prompt (str): _description_

    Returns:
        str: _description_
    """
    return str(chain.invoke({"prog_prompt" : prog_prompt, "feature_prompt":feature_prompt, "helping_prompt":helping_prompt }).content)

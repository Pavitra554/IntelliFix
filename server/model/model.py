from langchain_openai import ChatOpenAI
import os
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from features import feature
from utils import load_json,prog_reader

# Load environment variables from the .env file where our api key is stored
load_dotenv()

llm = ChatOpenAI()

#system prompt
sys_prompts = load_json("IntelliFix\server\model\prompts.json")["system_prompts"]
sys_prompt = sys_prompts["general"]


# program/code as prompt (which we want to debug)
prog_paths = ["test_files/merge_sort.py"]
prog_prompt = prog_reader(prog_paths)

# choice of feature
choice = input("Enter your choice ")
feature = feature(choice=choice)


chat_template = ChatPromptTemplate.from_messages(
    [
        ("system", sys_prompt),
        ("human", prog_prompt),
        ("human", "{feature}")
    ]
)

# chain
chain = chat_template | llm 

# print(chain.invoke({"fr"}).content)

def llm_invoke(feature:str)->str:
    return str(chain.invoke({"feature":feature}).content)

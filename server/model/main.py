from langchain_openai import ChatOpenAI
import os
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from features import feature
from utils import load_json,prog_reader

# Load environment variables from the .env file where our api key is stored
load_dotenv()

# fetching the api key from the .env file
api_k = os.getenv('OPENAI_API_KEY')

# llm
llm = ChatOpenAI(api_key = api_k)

#system prompt
sys_prompts = load_json("IntelliFix\server\model\prompts.json")["system_prompts"]
sys_prompt = sys_prompts["general"]


# program/code as prompt (which we want to debug)
prog_paths = ["test_files/fibonnaci.py"]
prog_prompt = prog_reader(prog_paths)

# choice of feature
# choice = eval(input("Enter your choice "))
feature = feature(choice="debug")


chat_template = ChatPromptTemplate.from_messages(
    [
        ("system", sys_prompt),
        ("human", prog_prompt),
        ("human", feature)
    ]
)

chain = chat_template | llm 

print(chain.invoke({}).content)

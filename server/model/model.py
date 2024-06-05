from langchain_openai import ChatOpenAI
import os
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from dotenv import load_dotenv
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from utils import utils
import os


# Load environment variables from the .env file where our api key is stored
load_dotenv()
api_k = os.getenv('OPENAI_API_KEY')

llm = ChatOpenAI(api_key=api_k)

#system prompt
sys_prompts = utils.load_json("prompts\\prompts.json")["system_prompts"] #cahnge
sys_prompt_general = sys_prompts["general"]
sys_prompt_support = sys_prompts["support"]

chat_history_for_chain = ChatMessageHistory()


# program/code as prompt (which we want to debug)
prog_paths = ["merge_sort.py"]
prog_prompt = utils.prog_reader(prog_paths)
feature_prompt = utils.feature("optimize")


prompt_general = ChatPromptTemplate.from_messages(
    [
        ("system",sys_prompt_general),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input_prompt}")
    ]
)

prompt_support = ChatPromptTemplate.from_messages(
    [
        ("system",sys_prompt_support),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input_prompt}")
    ]
)

# chain
chain_general = prompt_general | llm 
chain_support = prompt_support | llm 

chain_with_message_history_general = RunnableWithMessageHistory(
    chain_general,
    lambda session_id: chat_history_for_chain,
    input_messages_key="input_prompt",

    history_messages_key="chat_history",
)

chain_with_message_history_support = RunnableWithMessageHistory(
    chain_support,
    lambda session_id: chat_history_for_chain,
    input_messages_key="input_prompt",

    history_messages_key="chat_history",
)


def llm_invoke(prog_prompt:str, feature_prompt:str, helping_prompt:str = "")->str:
    """_summary_

    Args:
        prog_promt (str): _description_
        feature_prompt (str): _description_

    Returns:
        str: _description_
    """

    input_template = ChatPromptTemplate.from_messages(
    [
        ("human", prog_prompt),
        ("human", feature_prompt),
        ("human", helping_prompt)
    ]
    )
    input_prompt = input_prompt = "\n".join([prog_prompt,feature_prompt,helping_prompt])

    return str(chain_with_message_history_general.invoke({"input_prompt" : input_prompt},
                                                  {"configurable": {"session_id": "unused"}}).content)

def llm_invoke(prog_prompt:str, feature_prompt:str, helping_prompt:str = "")->str:
    """_summary_

    Args:
        prog_promt (str): _description_
        feature_prompt (str): _description_

    Returns:
        str: _description_
    """

    input_template = ChatPromptTemplate.from_messages(
    [
        ("human", prog_prompt),
        ("human", feature_prompt),
        ("human", helping_prompt)
    ]
    )
    input_prompt = input_prompt = "\n".join([prog_prompt,feature_prompt,helping_prompt])

    return str(chain_with_message_history_support.invoke({"input_prompt" : input_prompt},
                                                  {"configurable": {"session_id": "unused"}}).content)

def followup_invoke(follow_up : str)-> str:
    return str(chain_with_message_history_support.invoke({"input_prompt" : follow_up},
                                                  {"configurable": {"session_id": "unused"}}).content)

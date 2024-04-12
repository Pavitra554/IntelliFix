from langchain_openai import ChatOpenAI
import os
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from features import feature

# Load environment variables from the .env file where our api key is stored
load_dotenv()

# fetching the api key from the .env file
api_k = os.getenv('OPENAI_API_KEY')

llm = ChatOpenAI(api_key = api_k)

chain = llm #pending

import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

# Read API Key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Validate API Key
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY not found in .env file")

# Create Groq Client
client = Groq(
    api_key=GROQ_API_KEY
)
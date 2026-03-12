from openai import OpenAI
import os
from dotenv import load_dotenv
import json

load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

class PublisherAgent:
    def generate_article(self, message: dict) -> str:
        data_str = json.dumps(message, indent=2)
        prompt = f"Generate a daily news brief using this data:\n{data_str}\nFormat as a readable article with sections for Weather, Finance, News, and Media."
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful news publisher."},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
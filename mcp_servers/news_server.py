import os
from fastapi import FastAPI
from dotenv import load_dotenv
import requests
from pydantic import BaseModel
from utils.schemas import NewsArticle
from typing import List

load_dotenv()

app = FastAPI()

class NewsInput(BaseModel):
    query: str = "top headlines"

@app.post("/news", response_model=List[NewsArticle])
def get_news(input: NewsInput):
    url = f"https://newsapi.org/v2/everything?q={input.query}&sortBy=publishedAt&apiKey={os.getenv('NEWS_API_KEY')}"
    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError("Error fetching news")
    data = response.json()
    articles = []
    for art in data['articles'][:5]:  # Limit to top 5
        articles.append(NewsArticle(title=art['title'], description=art['description'] or "", url=art['url']))
    return articles

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
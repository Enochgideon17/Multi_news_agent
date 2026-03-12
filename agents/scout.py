import requests
from utils.schemas import NewsArticle, MediaData
from typing import List

class ScoutAgent:
    def aggregate_signals(self, message: dict) -> dict:
        query = message.get('query', 'technology')
        media_query = message.get('media_query', 'AI')
        news_response = requests.post("http://localhost:8002/news", json={"query": query})
        news = [NewsArticle(**art).dict() for art in news_response.json()]
        media_response = requests.post("http://localhost:8004/media", json={"query": media_query})
        media = MediaData(**media_response.json())
        return {"news": news, "media": media.dict()}
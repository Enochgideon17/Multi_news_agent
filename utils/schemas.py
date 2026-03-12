from pydantic import BaseModel
from typing import List

class WeatherData(BaseModel):
    city: str
    temperature: float
    description: str

class NewsArticle(BaseModel):
    title: str
    description: str
    url: str

class FinanceData(BaseModel):
    symbol: str
    price: float

class MediaData(BaseModel):
    title: str
    overview: str
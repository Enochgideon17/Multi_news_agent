import os
from fastapi import FastAPI
from dotenv import load_dotenv
import requests
from pydantic import BaseModel
from utils.schemas import MediaData

load_dotenv()

app = FastAPI()

class MediaInput(BaseModel):
    query: str = "news"

@app.post("/media", response_model=MediaData)
def get_media(input: MediaInput):
    url = f"https://api.themoviedb.org/3/search/movie?api_key={os.getenv('TMDB_API_KEY')}&query={input.query}"
    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError("Error fetching media data")
    data = response.json()
    if data['results']:
        movie = data['results'][0]
        return MediaData(title=movie['title'], overview=movie['overview'])
    return MediaData(title="No results", overview="")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8004)
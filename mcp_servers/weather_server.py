import os
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
import requests
from pydantic import BaseModel
from utils.schemas import WeatherData

load_dotenv()

app = FastAPI()

class WeatherInput(BaseModel):
    city: str = "Bengaluru"

# ... existing imports ...

@app.post("/weather", response_model=WeatherData)
def get_weather(input: WeatherInput):
    api_key = os.getenv('WEATHER_API_KEY')
    if not api_key:
        raise HTTPException(status_code=500, detail="Missing WEATHER_API_KEY in .env")

    url = f"http://api.openweathermap.org/data/2.5/weather?q={input.city}&appid={api_key}"
    response = requests.get(url)
    
    if response.status_code != 200:
        try:
            error_data = response.json()  # OpenWeather often returns JSON errors
            detail = error_data.get('message', 'Unknown error')
        except:
            detail = response.text or f"HTTP {response.status_code}"
        
        raise HTTPException(status_code=response.status_code, detail=f"Weather API error: {detail}")
    
    data = response.json()
    
    if 'main' not in data or 'temp' not in data['main']:
        raise HTTPException(status_code=500, detail="Invalid weather data format from API")
    
    temp_c = data['main']['temp'] - 273.15
    desc = data['weather'][0]['description'] if data.get('weather') else "unknown"
    
    return WeatherData(city=input.city, temperature=round(temp_c, 2), description=desc)
import requests
from utils.schemas import WeatherData, FinanceData

class ContextualistAgent:
    def fetch_contextual_data(self, message: dict) -> dict:
        city = message.get('city', 'Bengaluru')
        symbol = message.get('symbol', 'IBM')
        weather_response = requests.post("http://localhost:8001/weather", json={"city": city})
        weather = WeatherData(**weather_response.json())
        finance_response = requests.post("http://localhost:8003/finance", json={"symbol": symbol})
        finance = FinanceData(**finance_response.json())
        return {"weather": weather.dict(), "finance": finance.dict()}
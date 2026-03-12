import os
from fastapi import FastAPI
from dotenv import load_dotenv
import requests
from pydantic import BaseModel
from utils.schemas import FinanceData

load_dotenv()

app = FastAPI()

class FinanceInput(BaseModel):
    symbol: str = "IBM"

@app.post("/finance", response_model=FinanceData)
def get_finance(input: FinanceInput):
    url = f"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={input.symbol}&apikey={os.getenv('ALPHA_VANTAGE_KEY')}"
    response = requests.get(url)
    if response.status_code != 200:
        raise ValueError("Error fetching finance data")
    data = response.json()
    if 'Global Quote' not in data or not data['Global Quote']:
        raise ValueError("No data returned")
    price = float(data['Global Quote']['05. price'])
    return FinanceData(symbol=input.symbol, price=price)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)
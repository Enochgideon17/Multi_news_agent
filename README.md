# 📰 Multi-Agent News Intelligence System

A modular AI-powered multi-agent system that gathers real-time contextual information from multiple data sources (News, Weather, Finance, and Media), enriches it using specialized agents, and generates an intelligent daily news brief using a Large Language Model (LLM).

The project demonstrates a production-inspired architecture using FastAPI, Streamlit, and Agent-to-Agent (A2A) orchestration with modular MCP service components.

---

# 📌 Overview

This project follows a clean, modular architecture where:

- **MCP Servers** expose domain-specific tools.
- **AI Agents** collaborate to process and enrich information.
- **OpenAI LLM** generates a natural-language report.
- **Streamlit** provides a simple interface for interacting with the system.

Each component has a single responsibility, making the project scalable, maintainable, and easy to extend.

---

# 🏗️ Architecture

```
                 User
                  │
                  ▼
        Streamlit Web Interface
                  │
                  ▼
             Scout Agent
                  │
      ┌───────────┼────────────┐
      ▼           ▼            ▼
 Weather MCP   News MCP   Finance MCP
                  │
                  ▼
            Media MCP Server
                  │
                  ▼
        Contextualist Agent
                  │
                  ▼
         Publisher Agent (LLM)
                  │
                  ▼
      AI Generated Daily Brief
```

---

# 📂 Project Structure

```
multi_agent_news/
│
├── agents/
│   ├── __init__.py
│   ├── scout.py
│   ├── contextualist.py
│   └── publisher.py
│
├── mcp_servers/
│   ├── __init__.py
│   ├── weather_server.py
│   ├── finance_server.py
│   ├── news_server.py
│   └── media_server.py
│
├── ui/
│   ├── __init__.py
│   └── app.py
│
├── utils/
│   ├── __init__.py
│   └── schemas.py
│
├── .env
├── requirements.txt
├── main.py
└── README.md
```

---

# 🤖 Agents

## Scout Agent

Responsible for collecting information from all MCP services.

**Responsibilities**

- Calls Weather MCP
- Calls News MCP
- Calls Finance MCP
- Calls Media MCP
- Aggregates responses

---

## Contextualist Agent

Processes the collected information.

**Responsibilities**

- Adds contextual insights
- Generates recommendations
- Enriches raw data

---

## Publisher Agent

Generates a readable article using an LLM.

**Responsibilities**

- Creates prompts
- Sends data to OpenAI
- Produces the final daily report

---

# 🔌 MCP Services

Each FastAPI server exposes a single domain-specific capability.

### Weather MCP

Provides live weather information.

### News MCP

Retrieves recent news headlines.

### Finance MCP

Returns stock market information.

### Media MCP

Supplies trending media topics and signals.

---

# 🔄 Request Flow

```
User

↓

Streamlit Interface

↓

Scout Agent

↓

Weather MCP
News MCP
Finance MCP
Media MCP

↓

Contextualist Agent

↓

Publisher Agent

↓

OpenAI API

↓

Generated Daily Brief

↓

User
```

---

# 🚀 Features

- Multi-Agent System
- Agent-to-Agent Communication
- Modular MCP Architecture
- FastAPI Microservices
- OpenAI Integration
- Real-time API Integration
- Streamlit Dashboard
- Environment Variable Configuration
- Clean Project Structure
- Easily Extensible Design

---

# 🛠️ Technologies Used

- Python 3
- FastAPI
- Streamlit
- OpenAI API
- Requests
- Pydantic
- Python Dotenv
- WeatherAPI
- NewsAPI
- Alpha Vantage API

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Enochgideon17/Multi_news_agent.git
cd Multi_news_agent
```

---

## Create Virtual Environment

Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🔑 Configure Environment Variables

Create a `.env` file in the project root.

```env
OPENAI_API_KEY=your_openai_key

WEATHER_API_KEY=your_weather_api_key

NEWS_API_KEY=your_news_api_key

FINANCE_API_KEY=your_finance_api_key
```

---

# ▶️ Run MCP Servers

Weather

```bash
uvicorn mcp_servers.weather_server:app --reload --port 8001
```

Finance

```bash
uvicorn mcp_servers.finance_server:app --reload --port 8002
```

News

```bash
uvicorn mcp_servers.news_server:app --reload --port 8003
```

Media

```bash
uvicorn mcp_servers.media_server:app --reload --port 8004
```

---

# ▶️ Run the Main Pipeline

```bash
python main.py
```

---

# ▶️ Launch the Streamlit Interface

```bash
streamlit run ui/app.py
```

---

# 📊 Example Output

```
Daily Intelligence Brief

🌦 Weather
London is currently 23°C with light clouds.

📈 Finance
Apple (AAPL) is trading at $198.41.

📰 Headlines
• Global AI regulations advance.
• Markets remain stable.
• NASA announces a new mission.

📺 Media Trend
Artificial Intelligence continues to dominate technology discussions.

💡 Recommendation
Carry an umbrella today and monitor technology stocks.
```

---

# 📈 Future Improvements

- Asynchronous API requests
- Parallel agent execution
- Agent memory
- Model Context Protocol (MCP) over HTTP
- Docker support
- Kubernetes deployment
- Vector database integration
- Retrieval-Augmented Generation (RAG)
- Authentication and user accounts
- PDF report export
- Email scheduling
- MongoDB/PostgreSQL logging

---

# 🎓 Learning Outcomes

This project demonstrates:

- Multi-Agent Systems
- Agent-to-Agent Communication
- FastAPI Development
- REST API Integration
- OpenAI API Usage
- Prompt Engineering
- Streamlit Application Development
- Environment Variable Management
- Modular Software Architecture
- Production-Ready Python Project Structure

---

# 👨‍💻 Author

**Enoch Gideon**

AI & Full-Stack Developer

Cambridge Institute of Technology

Interested in Artificial Intelligence, Intelligent Systems, Full-Stack Development, and Real-Time AI Applications.

---

# 📄 License

This project is intended for educational, research, and portfolio purposes.

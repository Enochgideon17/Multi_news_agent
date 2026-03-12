# Multi-Agent News Intelligence System

## 📌 Overview

This project is a modular multi-agent system designed to analyze news content using domain-specific intelligence services.
It follows a clean architecture approach where AI agents handle reasoning, backend service modules provide contextual data, and a lightweight frontend enables user interaction.

The goal of the system is to process news inputs, enrich them with contextual signals (finance, weather, media etc.), and return structured insights.

---

## 🧠 Architecture

The project is structured using **separation of concerns** and **modular design principles**.

### Agents Layer (`/agents`)

This layer contains intelligent processing units responsible for analysis and decision making.

* **Scout Agent** – collects or preprocesses news input
* **Contextualist Agent** – analyzes semantic context and relevance
* **Publisher Agent** – formats and prepares the final response

Each agent performs a single responsibility which improves scalability and maintainability.

---

### Service Layer (`/mcp_servers`)

These modules act as domain intelligence providers.

* **News Server** – handles news related processing
* **Finance Server** – provides financial contextual data
* **Weather Server** – enriches analysis with environmental context
* **Media Server** – processes media-related signals

This design allows the system to integrate multiple contextual data sources without tightly coupling logic.

---

### Frontend (`/frontend`)

Simple client interface built using:

* HTML
* CSS
* JavaScript

It sends user requests to the backend and renders structured responses.

---

### Utilities (`/utils`)

Shared components such as:

* **Schemas** for request / response validation
* Reusable helpers to maintain consistency across modules

---

### Root Components

* `main.py` → Application entry point and request orchestration
* `.env` → Environment configuration (API keys / secrets)
* `requirements.txt` → Python dependencies

---

## 🔄 Request Flow

1. User submits news input from the frontend
2. Backend receives the request via main application
3. Request is routed to relevant AI agents
4. Agents communicate with MCP service modules for contextual data
5. Insights are aggregated and returned to the frontend

This pipeline enables flexible scaling by allowing new agents or services to be added independently.

---

## 🚀 Features

* Modular multi-agent architecture
* Domain-aware contextual enrichment
* Service-oriented backend design
* Lightweight frontend interface
* Easily extensible intelligence pipeline

---

## ⚙️ Setup & Run

### 1. Clone Repository

```bash
git clone https://github.com/Enochgideon17/Multi_news_agent.git
cd multi-agent-news
```

### 2. Create Virtual Environment

```bash
python -m venv .venv
.venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment

Create `.env` file and add required API keys.

### 5. Run Application

```bash
python main.py
```

---

## 📈 Future Improvements

* Add database logging (MongoDB / PostgreSQL)
* Implement async agent execution
* Introduce message queue / streaming pipeline
* Deploy as containerized microservices
* Improve frontend UX with modern frameworks

---

## 👨‍💻 Author

Enoch Gideon
AI & Full-Stack Developer
Interested in intelligent systems, security, and real-time AI applications.

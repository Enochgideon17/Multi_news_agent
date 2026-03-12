import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import streamlit as st
from agents.contextualist import ContextualistAgent
from agents.scout import ScoutAgent
from agents.publisher import PublisherAgent

st.title("Multi-Agent News Brief Generator")

city = st.text_input("City for Weather", "Bengaluru")
stock = st.text_input("Stock Symbol for Finance", "IBM")
news_query = st.text_input("News Query", "world news")
media_query = st.text_input("Media Query", "news")

if st.button("Generate Daily Brief"):
    with st.spinner("Agents working..."):
        initial_message = {"city": city, "symbol": stock, "query": news_query, "media_query": media_query}
        
        contextualist = ContextualistAgent()
        context_data = contextualist.fetch_contextual_data(initial_message)
        
        scout_message = {**initial_message, **context_data}
        scout = ScoutAgent()
        signals = scout.aggregate_signals(scout_message)
        
        full_data = {**scout_message, **signals}
        publisher = PublisherAgent()
        article = publisher.generate_article(full_data)
        
        st.markdown(article)
    
    # Save option (Task 12-ish)
    st.download_button("Download Brief", article, file_name="daily_brief.md")
from agents.contextualist import ContextualistAgent
from agents.scout import ScoutAgent
from agents.publisher import PublisherAgent

if __name__ == "__main__":
    # Start with initial message
    initial_message = {"city": "Bengaluru", "symbol": "IBM", "query": "world news", "media_query": "news"}
    
    contextualist = ContextualistAgent()
    context_data = contextualist.fetch_contextual_data(initial_message)
    
    # Pass message to scout
    scout_message = {**initial_message, **context_data}
    scout = ScoutAgent()
    signals = scout.aggregate_signals(scout_message)
    
    # Pass combined message to publisher
    full_data = {**scout_message, **signals}
    publisher = PublisherAgent()
    article = publisher.generate_article(full_data)
    
    print(article)
from app.repositories.preference_repo import save_preferences, get_preferences

def update_preferences(user_id, categories):
    save_preferences(user_id, categories)

def fetch_preferences(user_id):
    return get_preferences(user_id)

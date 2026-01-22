from app.utils.json_store import read_json, write_json

USERS_FILE = "data/users.json"


def save_preferences(user_id, categories):
    users = read_json(USERS_FILE)
    users[user_id] = {"categories": categories}
    write_json(USERS_FILE, users)


def get_preferences(user_id):
    users = read_json(USERS_FILE)
    return users.get(user_id, {}).get("categories", [])

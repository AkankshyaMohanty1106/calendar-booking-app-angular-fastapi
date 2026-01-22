import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
FILE_PATH = BASE_DIR / "data" / "app_state.json"

DEFAULT_STATE = {
    "currentUser": "me@example.com",
    "preferences": { "categories": [] },
    "events": []
}

def read_state():
    if not FILE_PATH.exists():
        FILE_PATH.parent.mkdir(parents=True, exist_ok=True)
        write_state(DEFAULT_STATE)

    with open(FILE_PATH, "r") as f:
        return json.load(f)

def write_state(state):
    with open(FILE_PATH, "w") as f:
        json.dump(state, f, indent=2)

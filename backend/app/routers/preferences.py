from fastapi import APIRouter, HTTPException
from app.utils.app_state_store import read_state, write_state

router = APIRouter(prefix="/api/preferences", tags=["Preferences"])

@router.get("")
def get_state():
    return read_state()

@router.post("")
def save_preferences(payload: dict):
    print("Received payload:", payload)

    if "categories" not in payload or len(payload["categories"]) == 0:
        raise HTTPException(status_code=400, detail="Select at least one category")

    state = read_state()

    state["preferences"]["categories"] = payload["categories"]

    write_state(state)

    print("Updated state:", state)

    return state  # ✅ ALWAYS RETURN FULL JSON

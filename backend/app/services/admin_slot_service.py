from app.repositories.slot_repo import create_slot


def create_time_slot(payload: dict):
    id = payload.get("id")
    category = payload.get("category")
    date = payload.get("date")
    start_time = payload.get("startTime")
    end_time = payload.get("endTime")

    if not all([id, category, date, start_time, end_time]):
        raise ValueError("All fields are required")
    print("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    updated_state = create_slot(
        id,
        category,
        date,
        start_time,
        end_time
    )

    return {
        "message": "Slot created successfully",
        "appState": updated_state
    }
from app.repositories.slot_repo import get_all_slots


def get_all_slots_for_admin():
    """
    Read-only service for admin to view all slots
    """
    return {
        "slots": get_all_slots()
    }
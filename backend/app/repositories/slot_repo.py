from app.utils.app_state_store import read_state, write_state


def get_all_slots():
    state = read_state()
    return state.get("events", [])


def book_slot(slot_id: str, user_id: str):
    state = read_state()
    events = state.get("events", [])

    for slot in events:
        if slot["id"] == slot_id:
            if slot["bookedBy"] is not None:
                raise ValueError("Slot already booked")

            slot["bookedBy"] = user_id
            write_state(state)
            return

    raise ValueError("Slot not found")


def unsubscribe_slot(slot_id: str, user_id: str):
    state = read_state()
    events = state.get("events", [])

    for slot in events:
        if slot["id"] == slot_id:
            if slot["bookedBy"] != user_id:
                raise ValueError("You are not allowed to unsubscribe")

            slot["bookedBy"] = None
            write_state(state)
            return

    raise ValueError("Slot not found")


def create_slot(id: str, category: str, date: str, start_time: str, end_time: str):
    state = read_state()
    events = state.get("events", [])

    new_slot = {
        "id": id,
        "category": category,
        "date": date,
        "startTime": start_time,
        "endTime": end_time,
        "bookedBy": None
    }

    events.append(new_slot)
    state["events"] = events
    print("************************************************************")
    write_state(state)

    return state  # return full updated app_state.json

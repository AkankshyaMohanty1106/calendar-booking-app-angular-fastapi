from fastapi import APIRouter, HTTPException
from app.utils.app_state_store import read_state, write_state

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])

# Load full state
@router.get("")
def get_state():
    return read_state()

# Book slot
@router.post("/signup/{slot_id}")
def signup(slot_id: str):
    state = read_state()

    slot = next((s for s in state["events"] if s["id"] == slot_id), None)
    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")

    if slot["bookedBy"]:
        raise HTTPException(status_code=400, detail="Already booked")

    slot["bookedBy"] = state["currentUser"]

    write_state(state)
    return state


# Cancel slot
@router.post("/cancel/{slot_id}")
def cancel(slot_id: str):
    state = read_state()

    slot = next((s for s in state["events"] if s["id"] == slot_id), None)
    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")

    slot["bookedBy"] = None

    write_state(state)
    return state

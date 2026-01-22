from app.repositories.slot_repo import book_slot, unsubscribe_slot


def book_time_slot(user_id: str, slot_id: str):
    book_slot(slot_id, user_id)
    return {"message": "Slot booked successfully"}


def unsubscribe_time_slot(user_id: str, slot_id: str):
    unsubscribe_slot(slot_id, user_id)
    return {"message": "Slot unsubscribed successfully"}

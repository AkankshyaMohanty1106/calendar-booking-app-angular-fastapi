from fastapi import APIRouter, HTTPException
from app.services.admin_slot_service import (
    create_time_slot,
    get_all_slots_for_admin
)

router = APIRouter(prefix="/api/admin/slots", tags=["Admin Slots"])


@router.post("")
def create_slot(payload: dict):
    try:
        return create_time_slot(payload)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("")
def get_slots():
    return get_all_slots_for_admin()

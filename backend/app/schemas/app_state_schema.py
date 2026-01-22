from pydantic import BaseModel
from typing import List, Optional

class Slot(BaseModel):
    id: str
    category: str
    date: str
    startTime: str
    endTime: str
    bookedBy: Optional[str]

class Preferences(BaseModel):
    categories: List[str]

class AppStateResponse(BaseModel):
    currentUser: str
    preferences: Preferences
    events: List[Slot]

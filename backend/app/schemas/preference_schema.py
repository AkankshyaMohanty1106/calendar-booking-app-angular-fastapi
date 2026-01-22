from pydantic import BaseModel
from typing import List

class PreferenceRequest(BaseModel):
    user: str
    categories: List[str]

class PreferenceResponse(BaseModel):
    message: str
    user: str
    categories: List[str]

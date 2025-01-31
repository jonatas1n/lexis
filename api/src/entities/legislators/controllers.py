from typing import Optional
from fastapi import HTTPException
from .services import LegislatorServices

NOT_FOUND_MESSAGE = "Legislator not found"


class LegislatorController:
    @staticmethod
    def get_all_legislators(name: Optional[str] = None):
        return LegislatorServices.get_all(name)

    @staticmethod
    def get_legislator(legislator_id: str):
        legislator = LegislatorServices.get_by_id(legislator_id)
        if not legislator:
            raise HTTPException(status_code=404, detail=NOT_FOUND_MESSAGE)
        return legislator
    
    def get_votes(legislator_id: str):
        legislator_votes = LegislatorServices.get_votes(legislator_id)
        return legislator_votes

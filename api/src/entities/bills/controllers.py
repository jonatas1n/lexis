from typing import Optional
from fastapi import HTTPException
from .services import BillServices

NOT_FOUND_MESSAGE = "Bill not found"


class BillController:
    @staticmethod
    def get_all_bills(
        title: Optional[str] = None,
    ):
        return BillServices.get_all(title)

    @staticmethod
    def get_bill(bill_id: str):
        bill = BillServices.get_by_id(bill_id)
        if not bill:
            raise HTTPException(status_code=404, detail=NOT_FOUND_MESSAGE)
        return bill

    @staticmethod
    def get_votes(bill_id: str):
        bill_votes = BillServices.get_votes(bill_id)
        return bill_votes

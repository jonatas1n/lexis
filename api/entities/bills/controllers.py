from fastapi import HTTPException
from .services import BillServices


class BillController:
    @staticmethod
    def get_all_bills():
        return BillServices.get_all()

    @staticmethod
    def get_bill(bill_id):
        bill = BillServices.get_by_id(bill_id)
        if not bill:
            raise HTTPException(status_code=404, detail="User not found")
        return bill

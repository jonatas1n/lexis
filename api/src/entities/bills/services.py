from typing import Optional

from ..votes.repositories import VoteRepository
from .repositories import BillRepository


class BillServices:
    @staticmethod
    def get_all(
        title: Optional[str] = None,
    ):
        bills = BillRepository.read_csv()
        votes = VoteRepository.read_csv()

        def filter_bill(bill: dict):
            if title and title.lower() not in bill["title"].lower():
                return False
            return True

        def increment_bill(bill: dict):
            count_votes = len([vote for vote in votes if vote["bill_id"] == bill["id"]])
            bill["votes"] = count_votes
            return bill

        bills = [increment_bill(bill) for bill in bills if filter_bill(bill)]
        return bills

    @staticmethod
    def get_by_id(bill_id):
        bill_id = int(bill_id)
        bills = BillRepository.read_csv()
        return next((bill for bill in bills if bill["id"] == bill_id), None)

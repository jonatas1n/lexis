from typing import Optional

from ..votes.repositories import VoteRepository
from ..votes_results.repositories import VotesResultRepository
from .repositories import BillRepository


def process_bill(bill: dict, votes: list[dict], votes_results: list[dict]):
    bill = {**bill, "opposed_votes": 0, "support_votes": 0}
    bill_votes = [vote["id"] for vote in votes if vote["bill_id"] == bill["id"]]
    if not bill_votes:
        return bill

    bill_votes_results = [
        vote_result
        for vote_result in votes_results
        if vote_result["vote_id"] in bill_votes
    ]
    if not bill_votes_results:
        return bill

    for vote in bill_votes_results:
        vote_type = "support_votes" if vote["vote_type"] == 1 else "opposed_votes"
        bill[vote_type] += 1
    return bill


class BillServices:
    @staticmethod
    def get_all(
        title: Optional[str] = None,
    ):
        bills = BillRepository.read_csv()
        votes = VoteRepository.read_csv()
        votes_results = VotesResultRepository.read_csv()

        for index, bill in enumerate(bills):
            bills[index] = process_bill(bill, votes, votes_results)

        def filter_bill(bill: dict):
            if title and title.lower() not in bill["title"].lower():
                return False
            return True

        bills = [bill for bill in bills if filter_bill(bill)]
        return bills

    @staticmethod
    def get_by_id(bill_id: str):
        bill_id = int(bill_id)
        bills = BillRepository.read_csv()
        votes = VoteRepository.read_csv()
        votes_results = VotesResultRepository.read_csv()
        bill = next((bill for bill in bills if bill["id"] == bill_id), None)
        bill = process_bill(bill, votes, votes_results)
        return bill

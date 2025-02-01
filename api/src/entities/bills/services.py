from typing import Optional

from ..legislators.services import LegislatorServices

from ..votes.repositories import VoteRepository
from ..votes_results.repositories import VotesResultRepository
from .repositories import BillRepository


def process_bill(bill: dict, votes: list[dict], votes_results: list[dict]):
    if not bill:
        return bill
    bill = {**bill, "no_votes": 0, "yes_votes": 0}
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
        vote_type = "yes_votes" if vote["vote_type"] == 1 else "no_votes"
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
        try:
            sponsor = LegislatorServices.get_by_id(bill["sponsor_id"])
            bill = {**bill, "sponsor_name": sponsor["name"]}
        except:
            pass
        return bill

    @staticmethod
    def get_votes(bill_id: str):
        bill_id = int(bill_id)
        votes = VoteRepository.read_csv()
        votes = [vote["id"] for vote in votes if vote["bill_id"] == bill_id]
        votes_results = VotesResultRepository.read_csv()
        bill_votes = {"yes_votes": [], "no_votes": []}
        votes_results = [
            vote_result
            for vote_result in votes_results
            if vote_result["vote_id"] in votes
        ]
        for vote_result in votes_results:
            if vote_result["vote_id"] not in votes:
                continue
            vote_type_key = "yes_votes" if vote_result["vote_type"] == 1 else "no_votes"
            legislator = LegislatorServices.get_by_id(vote_result["legislator_id"])
            bill_votes[vote_type_key].append(legislator)
        return bill_votes

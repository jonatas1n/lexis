from typing import Optional

from ..bills.services import BillServices
from ..votes_results.repositories import VotesResultRepository
from ..votes.services import VoteServices
from .repositories import LegislatorRepository


def process_legislator(legislator: dict, votes_results: list[dict]):
    legislator = {**legislator, "supported_bills": 0, "opposed_bills": 0}
    for vote_result in votes_results:
        if vote_result["legislator_id"] != legislator["id"]:
            continue

        vote_type_key = (
            "supported_bills" if vote_result["vote_type"] == 1 else "opposed_bills"
        )
        legislator[vote_type_key] += 1
    return legislator


class LegislatorServices:
    @staticmethod
    def get_all(name: Optional[str] = None):
        legislators = LegislatorRepository.read_csv()
        votes_results = VotesResultRepository.read_csv()

        def filter_legislator(legislator: dict):
            if name and name.lower() not in legislator["name"].lower():
                return False
            return True

        return [
            process_legislator(legislator, votes_results)
            for legislator in legislators
            if filter_legislator(legislator)
        ]

    @staticmethod
    def get_by_id(legislator_id: str):
        legislator_id = int(legislator_id)
        legislators = LegislatorRepository.read_csv()
        legislator = next(
            (
                legislator
                for legislator in legislators
                if legislator["id"] == legislator_id
            ),
            None,
        )
        votes_results = VotesResultRepository.read_csv()
        return process_legislator(legislator, votes_results)

    @staticmethod
    def get_votes(legislator_id: str):
        legislator_id = int(legislator_id)
        votes_results = VotesResultRepository.read_csv()
        legislator_votes_results = {"supported_votes": [], "opposed_votes": []}
        for vote_result in votes_results:
            if vote_result["legislator_id"] != legislator_id:
                continue
            vote = VoteServices.get_by_id(vote_result["vote_id"])
            bill = BillServices.get_by_id(vote["bill_id"])
            vote_result = {**vote_result, "bill_title": bill["title"], "bill_id": bill["id"]}
            vote_type_key = (
                "supported_votes" if vote_result["vote_type"] == 1 else "opposed_votes"
            )
            legislator_votes_results[vote_type_key].append(vote_result)
        return legislator_votes_results

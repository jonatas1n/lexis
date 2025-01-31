from typing import Optional
from ..votes_results.repositories import VotesResultRepository
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
    def get_by_id(legislator_id):
        legislator_id = int(legislator_id)
        legislators = LegislatorRepository.read_csv()
        votes_results = VotesResultRepository.read_csv()
        legislator = next(
            (
                legislator
                for legislator in legislators
                if legislator["id"] == legislator_id
            ),
            None,
        )
        return process_legislator(legislator, votes_results)

from typing import Optional
from ..votes_results.repositories import VotesResultRepository
from .repositories import LegislatorRepository


class LegislatorServices:
    @staticmethod
    def get_all(name: Optional[str] = None):
        legislators = LegislatorRepository.read_csv()
        votes_results = VotesResultRepository.read_csv()
        votes_counts = {}
        base_votes_counts = {"supported_bills": 0, "opposed_bills": 0}
        for vote in votes_results:
            legislator_id = vote["legislator_id"]
            vote_type_key = (
                "supported_bills" if vote["vote_type"] == 1 else "opposed_bills"
            )
            if not legislator_id in votes_counts:
                votes_counts[legislator_id] = base_votes_counts
            votes_counts[legislator_id][vote_type_key] += 1

        def increment_legislator(legislator: dict):
            if legislator["id"] not in votes_counts:
                votes_counts[legislator["id"]] = base_votes_counts
            legislator = {**legislator, **(votes_counts[legislator["id"]])}
            return legislator

        def filter_legislator(legislator: dict):
            if name and name.lower() not in legislator["name"].lower:
                return False
            return True

        return [
            increment_legislator(legislator)
            for legislator in legislators
            if filter_legislator(legislator)
        ]

    @staticmethod
    def get_by_id(legislator_id):
        legislator_id = int(legislator_id)
        legislators = LegislatorRepository.read_csv()
        return next(
            (
                legislator
                for legislator in legislators
                if legislator["id"] == legislator_id
            ),
            None,
        )

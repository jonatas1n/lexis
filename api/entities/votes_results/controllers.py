from fastapi import HTTPException
from .services import VotesResultServices

NOT_FOUND_MESSAGE = "VotesResult not found"


class VotesResultController:
    @staticmethod
    def get_all_votes_results():
        return VotesResultServices.get_all()

    @staticmethod
    def get_votes_result(vote_result_id):
        vote_result = VotesResultServices.get_by_id(vote_result_id)
        if not vote_result:
            raise HTTPException(status_code=404, detail=NOT_FOUND_MESSAGE)
        return vote_result

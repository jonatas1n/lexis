from fastapi import HTTPException
from .services import VoteServices

NOT_FOUND_MESSAGE = "Vote not found"


class VoteController:
    @staticmethod
    def get_all_votes():
        return VoteServices.get_all()

    @staticmethod
    def get_vote(vote_id):
        vote_id = int(vote_id)
        vote = VoteServices.get_by_id(vote_id)
        if not vote:
            raise HTTPException(status_code=404, detail=NOT_FOUND_MESSAGE)
        return vote

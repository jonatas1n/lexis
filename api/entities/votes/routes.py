from fastapi import APIRouter
from .controllers import VoteController

router = APIRouter()

router.get("/", response_model=list)(VoteController.get_all_votes)
router.get("/{vote_id}", response_model=dict)(VoteController.get_vote)

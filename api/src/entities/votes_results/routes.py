from fastapi import APIRouter
from .controllers import VotesResultController

router = APIRouter(prefix="/votes_results")

router.get("/", response_model=list)(VotesResultController.get_all_votes_results)
router.get("/{vote_result_id}", response_model=dict)(
    VotesResultController.get_votes_result
)

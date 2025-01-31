from fastapi import APIRouter
from .controllers import LegislatorController

router = APIRouter(prefix="/legislators")

router.get("/", response_model=list)(LegislatorController.get_all_legislators)
router.get("/{legislator_id}", response_model=dict)(LegislatorController.get_legislator)
router.get("/{legislator_id}/votes", response_model=dict)(LegislatorController.get_votes)

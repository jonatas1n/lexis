from fastapi import APIRouter
from .controllers import LegislatorController

router = APIRouter()

router.get("/", response_model=list)(LegislatorController.get_all_legislators)
router.get("/{legislator_id}", response_model=dict)(LegislatorController.get_legislator)

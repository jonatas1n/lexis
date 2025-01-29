from fastapi import APIRouter
from .controllers import BillController

router = APIRouter()

router.get("/", response_model=list)(BillController.get_all_bills)
router.get("/{bill_id}", response_model=dict)(BillController.get_bill)

from pydantic import BaseModel


class BillSchema(BaseModel):
    id: str
    title: str
    primary_sponsor: int
